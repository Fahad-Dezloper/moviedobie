const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

export async function searchMovies(query: string = '', pageToken?: string) {
  const params = new URLSearchParams({
    part: 'snippet',
    maxResults: '20',
    q: query ? `${query} movie trailer` : 'new movie trailer 2024',
    type: 'video',
    videoCategoryId: '1', 
    key: process.env.YOUTUBE_API_KEY!,
    ...(pageToken && { pageToken }),
  });

  const response = await fetch(`${YOUTUBE_API_URL}/search?${params}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch videos');
  }

  return response.json();
}

export async function getVideosByCategory(category: string, pageToken?: string) {
  return searchMovies(`${category} movies`, pageToken);
}

