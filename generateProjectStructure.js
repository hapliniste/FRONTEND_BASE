const fs = require("fs");
const path = require("path");

const PROJECT_DIRECTORY = process.cwd();
const OUTPUT_DIRECTORY = path.join(PROJECT_DIRECTORY, 'projectStructure');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIRECTORY)) {
  fs.mkdirSync(OUTPUT_DIRECTORY);
}

// Function to generate tree structure as text
function generateTreeStructure(directory, level = 0, parentIndent = '') {
  let files = fs.readdirSync(directory);
  let result = '';

  files.forEach((file, index) => {
    if (file.startsWith('.') || file === 'node_modules') {
      return;
    }

    const fullPath = path.join(directory, file);
    const stats = fs.statSync(fullPath);

    const isLast = index === files.length - 1;

    let indent = parentIndent;
    indent += isLast ? '└── ' : '├── ';

    result += indent + file + '\n';

    if (stats.isDirectory()) {
      const nextParentIndent = parentIndent + (isLast ? '    ' : '|   ');
      const nested = generateTreeStructure(fullPath, level + 1, nextParentIndent);
      result += nested;
    }
  });

  return result;
}

// Function to generate tree structure as JSON
const generateTreeStructureJSON = (directory) => {
  const files = fs.readdirSync(directory);
  const result = [];

  files.forEach((file) => {
    if (file.startsWith('.') || file === 'node_modules') {
      return;
    }

    const fullPath = path.join(directory, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      const nested = generateTreeStructureJSON(fullPath);
      result.push({ [file]: nested });
    } else {
      result.push(file);
    }
  });

  return result;
};

// Generate both text and JSON and write them to files
const treeStructure = generateTreeStructure(PROJECT_DIRECTORY);
fs.writeFileSync(path.join(OUTPUT_DIRECTORY, 'projectStructure.txt'), treeStructure);
console.log('Project structure has been written to projectStructure.txt');

const treeStructureJSON = generateTreeStructureJSON(PROJECT_DIRECTORY);
fs.writeFileSync(path.join(OUTPUT_DIRECTORY, 'projectStructure.json'), JSON.stringify(treeStructureJSON, null, 2));
console.log('Project structure has been written to projectStructure.json');
