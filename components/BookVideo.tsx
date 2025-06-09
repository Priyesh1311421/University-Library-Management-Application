"use client";
import { IKVideo, ImageKitProvider } from "imagekitio-next";
import config from "@/lib/config";

const BookVideo = ({ videoUrl }: { videoUrl: string }) => {

  return (
    <div className="relative w-full">
      <ImageKitProvider
        publicKey={config.env.imagekit.publicKey}
        urlEndpoint={config.env.imagekit.urlEndpoint}
      >        <div className="w-full rounded-xl overflow-hidden">
          <IKVideo 
            path={videoUrl} 
            controls={true} 
            className="w-full" 
          />
        </div>
      </ImageKitProvider>
    </div>
  );
};
export default BookVideo;