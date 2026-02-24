import { YouTubeEmbed } from "@next/third-parties/google";
import { type PortableTextBlock } from "@portabletext/types";

export interface YouTubeVideoProps {
  title?: string;
  url: string;
  description?: string;
}

export function YouTubeVideoBlock({ video }: { video: YouTubeVideoProps | null }) {
  if (!video || !video.url) return null;

  // Extract the YouTube Video ID from the URL
  // Matches: 
  // - youtube.com/watch?v=ID
  // - youtu.be/ID
  // - youtube.com/embed/ID
  // - youtube.com/shorts/ID
  const getYouTubeId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(video.url);

  if (!videoId) return null;

  return (
    <div className="my-10 w-full overflow-hidden rounded-xl border border-border/50 bg-card/50 shadow-sm">
      <div className="aspect-video w-full overflow-hidden">
        {/* Usamos el componente oficial de Next.js Third Parties para máxima velocidad LCP */}
        <YouTubeEmbed videoid={videoId} params="rel=0" style="width: 100%; height: 100%;" />
      </div>
      
      {video.description && (
        <div className="p-4 bg-muted/30 border-t border-border/50">
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {video.description}
          </p>
        </div>
      )}
    </div>
  );
}
