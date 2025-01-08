'use client';

import { useState } from 'react';

export default function ShareButtons() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-[#1a1c21] rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-[#2a3438] to-[#1a1c21] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8">
          <div className="absolute inset-0 bg-white/5 rotate-45"></div>
        </div>
        <h2 className="text-lg font-bold text-white relative z-10 flex items-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          Share
        </h2>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`, '_blank')}
            className="flex items-center justify-center gap-2 bg-[#1da1f2] text-white py-2.5 px-4 rounded-lg hover:bg-[#1a91da] transition-all transform hover:scale-105 focus:ring-2 focus:ring-[#1da1f2]/50 focus:ring-offset-2 focus:ring-offset-[#1a1c21]"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
            <span className="font-medium">Twitter</span>
          </button>
          <button 
            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
            className="flex items-center justify-center gap-2 bg-[#4267b2] text-white py-2.5 px-4 rounded-lg hover:bg-[#365899] transition-all transform hover:scale-105 focus:ring-2 focus:ring-[#4267b2]/50 focus:ring-offset-2 focus:ring-offset-[#1a1c21]"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="font-medium">Facebook</span>
          </button>
        </div>
        <div className="mt-3">
          <button 
            className="w-full flex items-center justify-center gap-2 bg-[#2a3438] text-gray-300 py-2.5 px-4 rounded-lg hover:bg-[#343d42] transition-all transform hover:scale-105 focus:ring-2 focus:ring-gray-500/50 focus:ring-offset-2 focus:ring-offset-[#1a1c21]"
            onClick={handleCopyLink}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
              />
            </svg>
            <span className="font-medium">{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
} 