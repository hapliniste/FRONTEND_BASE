// Google Analytics Event Types
export type GAEventCategory = 
  | 'engagement'
  | 'contact'
  | 'navigation'
  | 'download'
  | 'outbound';

interface GAEvent {
  action: string;
  category: GAEventCategory;
  label?: string;
  value?: number;
}

// Send event to Google Analytics
export const sendGAEvent = ({ action, category, label, value }: GAEvent) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

// Predefined events
export const trackFormSubmission = (formName: string) => {
  sendGAEvent({
    action: 'form_submit',
    category: 'contact',
    label: formName
  });
};

export const trackOutboundLink = (url: string) => {
  sendGAEvent({
    action: 'click',
    category: 'outbound',
    label: url
  });
};

export const trackDownload = (fileName: string) => {
  sendGAEvent({
    action: 'download',
    category: 'download',
    label: fileName
  });
};

export const trackScroll = (depth: number) => {
  sendGAEvent({
    action: 'scroll',
    category: 'engagement',
    value: depth
  });
};

// Scroll tracking setup
export const initScrollTracking = () => {
  if (typeof window === 'undefined') return;

  let scrollDepths = new Set<number>();
  
  const handleScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    [25, 50, 75, 90].forEach(depth => {
      if (scrollPercent >= depth && !scrollDepths.has(depth)) {
        scrollDepths.add(depth);
        trackScroll(depth);
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}; 