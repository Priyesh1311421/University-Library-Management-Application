"use client";
import React, { useState, useEffect } from "react";
import { IKVideo, ImageKitProvider } from "imagekitio-next";
import config from "@/lib/config";

const BookVideo = ({ videoUrl }: { videoUrl: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  // Reset loading state whenever videoUrl changes and handle video loading
  useEffect(() => {
    // Reset states
    setIsLoading(true);
    setHasError(false);
    
    // Set a timeout to hide loader after a reasonable time
    // in case events don't fire correctly
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 8000); // 8 seconds timeout
    
    return () => clearTimeout(timeout);
  }, [videoUrl]);

  return (
    <div className="relative w-full">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-700/60 backdrop-blur-sm rounded-xl z-10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 mb-4 relative">
              {/* Animated gradient ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-spin blur-sm opacity-70"></div>
              <div className="absolute inset-1 rounded-full bg-dark-800"></div>
              <svg className="absolute inset-0 w-full h-full text-blue-500 animate-pulse" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M8 5v14l11-7z"
                />
              </svg>
            </div>
            <p className="text-light-200 font-ibm-plex-sans text-sm">Loading video...</p>
          </div>
        </div>
      )}
      
      {/* Error state */}
      {hasError && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-700/80 backdrop-blur-sm rounded-xl z-10">
          <div className="flex flex-col items-center p-6 text-center">
            <svg className="w-12 h-12 text-red-500 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            <p className="text-light-200 font-ibm-plex-sans text-lg mb-2">Failed to load video</p>
            <p className="text-light-400 text-sm">Please try again later</p>
          </div>
        </div>
      )}

      <ImageKitProvider
        publicKey={config.env.imagekit.publicKey}
        urlEndpoint={config.env.imagekit.urlEndpoint}
      >        <div className="w-full rounded-xl overflow-hidden">
          <IKVideo 
            path={videoUrl} 
            controls={true} 
            className="w-full" 
            onLoadedData={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        </div>
      </ImageKitProvider>
    </div>
  );
};
export default BookVideo;