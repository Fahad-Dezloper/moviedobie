export interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    title: string;
    description: string;
    thumbnails: {
      default: YouTubeThumbnail;
      medium: YouTubeThumbnail;
      high: YouTubeThumbnail;
    };
    channelTitle: string;
  };
}

interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YouTubeApiResponse {
  items: YouTubeVideo[];
  nextPageToken?: string;
  prevPageToken?: string;
}

