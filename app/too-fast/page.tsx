
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Page = () => {
  const [timeLeft, setTimeLeft] = useState(30);
  
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft]);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl bg-gradient-to-br from-[#232839]/80 to-[#12141D] rounded-3xl p-8 shadow-2xl border border-gray-700/50">
        <div className="flex flex-col items-center text-center">
          {/* Warning Icon with Pulse Animation */}
          <div className="relative mb-6">
            <div className="animate-ping absolute h-20 w-20 rounded-full bg-amber-500/20"></div>
            <div className="relative flex items-center justify-center rounded-full bg-amber-500/20 p-5">
              <Image 
                src="/icons/warning.svg" 
                alt="Warning" 
                width={48} 
                height={48} 
                className="text-amber-500"
              />
            </div>
          </div>
          
          <h1 className="font-bebas-neue text-6xl font-bold text-light-100 mb-4">
            Whoa, Slow Down There, Speedy!
          </h1>
          
          <p className="text-xl text-light-400 mb-8 max-w-xl">
            Looks like you&apos;ve been a little too eager. We&apos;ve put a
            temporary pause on your excitement. 🚦 Chill for a bit, and try again
            shortly.
          </p>
          
          {/* Clock Animation */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Image 
              src="/icons/clock.svg" 
              alt="Clock" 
              width={32} 
              height={32} 
              className={`text-light-100 ${timeLeft > 0 ? 'animate-pulse' : ''}`}
            />
            <div className="bg-[#1E2230] px-6 py-3 rounded-full">
              <span className="font-ibm-plex-sans font-semibold text-2xl text-light-100">
                {timeLeft > 0 ? `${timeLeft}s` : "You can try again now"}
              </span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button asChild className="font-ibm-plex-sans bg-light-400/10 hover:bg-light-400/20 text-light-100">
              <Link href="/">Go to Homepage</Link>
            </Button>
            <Button asChild className="font-ibm-plex-sans bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white">
              <Link href={timeLeft <= 0 ? "/my-profile" : "#"}>
                {timeLeft <= 0 ? "Continue" : "Please Wait"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;