import { useEffect } from 'react';
import { useContent } from '../context/ContentContext';

export default function SiteMetadata() {
  const { siteConfig } = useContent();

  // Update document title
  useEffect(() => {
    if (siteConfig.pageTitle) {
      document.title = siteConfig.pageTitle;
    }
  }, [siteConfig.pageTitle]);

  // Update favicon dynamically
  useEffect(() => {
    // Remove existing favicon links
    const existingLinks = document.querySelectorAll('link[rel="icon"]');
    existingLinks.forEach((link) => link.remove());

    // Create new favicon
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';

    if (siteConfig.logoType === 'image' && siteConfig.logo) {
      // Use image URL as favicon
      link.type = 'image/png';
      link.href = siteConfig.logo;
    } else {
      // Generate SVG favicon
      const iconText = siteConfig.logoIcon || siteConfig.siteName.charAt(0);
      const color = siteConfig.logoColor || '#000000';
      
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="50" fill="${color}"/>
          <text x="50" y="50" font-family="Arial, sans-serif" font-size="50" font-weight="300" 
                fill="white" text-anchor="middle" dominant-baseline="central">
            ${iconText}
          </text>
        </svg>
      `.trim();

      link.href = 'data:image/svg+xml,' + encodeURIComponent(svg);
    }

    document.head.appendChild(link);
  }, [siteConfig.logoType, siteConfig.logo, siteConfig.logoIcon, siteConfig.logoColor, siteConfig.siteName]);

  return null;
}
