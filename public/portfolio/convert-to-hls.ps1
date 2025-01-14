# Check if ffmpeg is installed
function Test-FFmpeg {
    try {
        ffmpeg -version | Out-Null
        return $true
    }
    catch {
        Write-Host "FFmpeg is not installed or not in PATH. Please install FFmpeg first." -ForegroundColor Red
        Write-Host "You can download it from: https://ffmpeg.org/download.html" -ForegroundColor Yellow
        return $false
    }
}

# Function to convert video to HLS
function Convert-ToHLS {
    param (
        [string]$inputFile,
        [string]$codec = "h264",
        [bool]$includeAudio = $false,
        [int]$segmentDuration = 4,
        [bool]$createMP4 = $false,
        [int]$targetFps = 0  # 0 means keep original FPS
    )
    
    # Get file info
    $fileName = [System.IO.Path]::GetFileNameWithoutExtension($inputFile)
    $outputDir = Join-Path (Split-Path $inputFile -Parent) $fileName
    
    # Create output directory if it doesn't exist
    if (-not (Test-Path $outputDir)) {
        New-Item -ItemType Directory -Path $outputDir | Out-Null
    }
    
    # Set output paths
    $segmentPath = Join-Path $outputDir "${fileName}_%03d.ts"
    $playlistPath = Join-Path $outputDir "${fileName}.m3u8"
    $mp4Path = Join-Path $outputDir "${fileName}_converted.mp4"
    
    Write-Host "Converting $inputFile to HLS format..." -ForegroundColor Cyan
    
    # Base FFmpeg command
    $ffmpegCmd = "ffmpeg -i `"$inputFile`""
    
    # Add FPS control if specified
    if ($targetFps -gt 0) {
        $ffmpegCmd += " -r $targetFps"
    }
    
    # Audio handling
    if (-not $includeAudio) {
        $ffmpegCmd += " -an"  # No audio
    } elseif ($includeAudio) {
        $ffmpegCmd += " -c:a aac -b:a 128k"
    }
    
    # Add codec-specific parameters
    switch ($codec.ToLower()) {
        "av1" {
            Write-Host "Using AV1 codec (best compression, limited device support)" -ForegroundColor Yellow
            $codecParams = "-c:v libaom-av1 -crf 30 -b:v 0 -strict experimental -cpu-used 4"
        }
        "vp9" {
            Write-Host "Using VP9 codec (good compression, good device support)" -ForegroundColor Yellow
            $codecParams = "-c:v libvpx-vp9 -crf 30 -b:v 0 -deadline good -cpu-used 2"
        }
        "h265" {
            Write-Host "Using H.265/HEVC codec (good compression, mixed device support)" -ForegroundColor Yellow
            $codecParams = "-c:v libx265 -crf 26 -preset medium -tag:v hvc1"
        }
        default {
            Write-Host "Using H.264 codec (maximum device compatibility)" -ForegroundColor Yellow
            $codecParams = "-c:v libx264 -crf 26 -preset slow"
        }
    }
    
    # Create MP4 if requested
    if ($createMP4) {
        $mp4Cmd = "$ffmpegCmd $codecParams `"$mp4Path`""
        Write-Host "`nCreating MP4 file for testing..." -ForegroundColor Cyan
        Invoke-Expression $mp4Cmd
    }
    
    # Add codec parameters and HLS settings
    $ffmpegCmd += " $codecParams"
    $ffmpegCmd += " -f hls -hls_time $segmentDuration -hls_playlist_type vod -hls_list_size 0 -hls_segment_type mpegts"
    $ffmpegCmd += " -hls_segment_filename `"$segmentPath`" `"$playlistPath`""
    
    Write-Host "FFmpeg command:" -ForegroundColor Yellow
    Write-Host $ffmpegCmd -ForegroundColor Gray
    
    try {
        # Get original FPS before conversion
        $fpsCmd = "ffprobe -v error -select_streams v -of default=noprint_wrappers=1:nokey=1 -show_entries stream=r_frame_rate `"$inputFile`""
        $originalFps = Invoke-Expression $fpsCmd
        $originalFpsNum = [math]::Round(($originalFps -split '/')[0] / ($originalFps -split '/')[1])
        
        Write-Host "`nOriginal video FPS: $originalFpsNum" -ForegroundColor Yellow
        if ($targetFps -gt 0) {
            Write-Host "Target FPS: $targetFps" -ForegroundColor Yellow
        } else {
            Write-Host "Keeping original FPS" -ForegroundColor Yellow
        }
        
        Write-Host "`nStarting conversion..." -ForegroundColor Cyan
        
        Invoke-Expression $ffmpegCmd
        Write-Host "`nConversion completed successfully!" -ForegroundColor Green
        Write-Host "Output directory: $outputDir" -ForegroundColor Yellow
        
        # Get file sizes for comparison
        $inputSize = (Get-Item $inputFile).Length
        $outputSize = (Get-ChildItem $outputDir -Recurse | Measure-Object -Property Length -Sum).Sum
        $segmentCount = (Get-ChildItem $outputDir -Filter "*.ts" | Measure-Object).Count
        
        Write-Host "`nFile size comparison:" -ForegroundColor Cyan
        Write-Host "Original: $([math]::Round($inputSize/1MB, 2)) MB" -ForegroundColor Yellow
        Write-Host "Converted: $([math]::Round($outputSize/1MB, 2)) MB" -ForegroundColor Yellow
        Write-Host "Number of segments: $segmentCount" -ForegroundColor Yellow
        $savings = (1 - ($outputSize / $inputSize)) * 100
        Write-Host "Space saved: $([math]::Round($savings, 1))%" -ForegroundColor Green
        
        Write-Host "`nNote: HLS files (.m3u8) are primarily for web playback." -ForegroundColor Yellow
        if ($createMP4) {
            Write-Host "An MP4 file was also created for testing in media players." -ForegroundColor Yellow
        }
    }
    catch {
        Write-Host "Error during conversion: $_" -ForegroundColor Red
    }
}

# Main script
if (-not (Test-FFmpeg)) {
    pause
    exit
}

# Interactive mode
Write-Host "Video to HLS Converter" -ForegroundColor Cyan
Write-Host "=====================`n" -ForegroundColor Cyan

# Get all video files in current directory
$videoFiles = Get-ChildItem -Path . -File | Where-Object { 
    $_.Extension -match '\.(mp4|webm|mov|avi|mkv)$'
}

if ($videoFiles.Count -eq 0) {
    Write-Host "No video files found in current directory." -ForegroundColor Yellow
    pause
    exit
}

# Display numbered list of videos
Write-Host "Available videos:" -ForegroundColor Yellow
for ($i = 0; $i -lt $videoFiles.Count; $i++) {
    Write-Host "$($i + 1): $($videoFiles[$i].Name)"
}

# Get user selection for video file
do {
    Write-Host "`nEnter the number of the video to convert (1-$($videoFiles.Count)):" -ForegroundColor Yellow
    $selection = Read-Host
} while (-not ($selection -match '^\d+$' -and [int]$selection -ge 1 -and [int]$selection -le $videoFiles.Count))

# Select codec
Write-Host "`nSelect codec:" -ForegroundColor Yellow
Write-Host "1: H.264 (maximum compatibility)" -ForegroundColor Gray
Write-Host "2: AV1 (best compression, limited support)" -ForegroundColor Gray
Write-Host "3: VP9 (good compression, good support)" -ForegroundColor Gray
Write-Host "4: H.265 (good compression, mixed support)" -ForegroundColor Gray

do {
    Write-Host "`nEnter codec number (1-4, default: 1):" -ForegroundColor Yellow
    $codecSelection = Read-Host
    if ([string]::IsNullOrWhiteSpace($codecSelection)) { $codecSelection = "1" }
} while (-not ($codecSelection -match '^[1-4]$'))

$codec = switch ($codecSelection) {
    "2" { "av1" }
    "3" { "vp9" }
    "4" { "h265" }
    default { "h264" }
}

# Ask about audio
Write-Host "`nInclude audio? (y/N):" -ForegroundColor Yellow
$includeAudio = (Read-Host) -eq 'y'

# Ask about segment duration
Write-Host "`nEnter segment duration in seconds (2-10, default: 4):" -ForegroundColor Yellow
$segmentDuration = Read-Host
if ([string]::IsNullOrWhiteSpace($segmentDuration) -or -not ($segmentDuration -match '^\d+$')) {
    $segmentDuration = 4
}
$segmentDuration = [Math]::Max(2, [Math]::Min(10, [int]$segmentDuration))

# Ask about MP4 creation
Write-Host "`nCreate MP4 file for testing? (y/N):" -ForegroundColor Yellow
$createMP4 = (Read-Host) -eq 'y'

# Ask about FPS
Write-Host "`nTarget FPS (Enter to keep original, or enter number like 30):" -ForegroundColor Yellow
$fpsInput = Read-Host
$targetFps = 0  # Default to keep original
if (-not [string]::IsNullOrWhiteSpace($fpsInput) -and $fpsInput -match '^\d+$') {
    $targetFps = [int]$fpsInput
}

# Convert selected video
$selectedFile = $videoFiles[[int]$selection - 1].FullName
Convert-ToHLS $selectedFile $codec $includeAudio $segmentDuration $createMP4 $targetFps

Write-Host "`nPress any key to exit..."
pause 