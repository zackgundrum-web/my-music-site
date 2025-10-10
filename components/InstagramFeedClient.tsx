'use client';

import { useEffect } from 'react';

export default function InstagramFeedClient() {
  useEffect(() => {
    // Check if script already exists
    if (document.getElementById('EmbedSocialHashtagScript')) {
      return;
    }

    // Create and append the script
    const script = document.createElement('script');
    script.id = 'EmbedSocialHashtagScript';
    script.src = 'https://embedsocial.com/cdn/ht.js';
    script.async = true;
    
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const existingScript = document.getElementById('EmbedSocialHashtagScript');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="embedsocial-hashtag" data-ref="32e3c566bac12ae3d4fb7615188270fcdfe75d94">
      <a 
        className="feed-powered-by-es feed-powered-by-es-feed-img es-widget-branding" 
        href="https://embedsocial.com/social-media-aggregator/" 
        target="_blank" 
        rel="noopener noreferrer"
        title="Instagram widget"
      >
        <img 
          src="https://embedsocial.com/cdn/icon/embedsocial-logo.webp" 
          alt="EmbedSocial"
        />
        <div className="es-widget-branding-text">Instagram widget</div>
      </a>
    </div>
  );
}