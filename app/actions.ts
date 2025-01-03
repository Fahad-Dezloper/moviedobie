'use server'

import { searchMovies, getVideosByCategory } from '@/lib/youtube'
import { YouTubeApiResponse } from '@/types/youtube'
import { YouTubeVideo } from '@/types/youtube'; // Import the missing type
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3'; // Add the API URL

export async function fetchMovies(query?: string): Promise<YouTubeApiResponse> {
  try {
    return await searchMovies(query);
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw new Error('Failed to fetch movies');
  }
}

export async function fetchMoviesByCategory(category: string): Promise<YouTubeApiResponse> {
  try {
    return await getVideosByCategory(category);
  } catch (error) {
    console.error('Error fetching movies by category:', error);
    throw new Error('Failed to fetch movies by category');
  }
}

export async function fetchVideoDetails(videoId: string): Promise<YouTubeVideo> {
  try {
    const params = new URLSearchParams({
      part: 'snippet',
      id: videoId,
      key: process.env.YOUTUBE_API_KEY!,
    });

    const response = await fetch(`${YOUTUBE_API_URL}/videos?${params}`);

    if (!response.ok) {
      throw new Error('Failed to fetch video details');
    }

    const data = await response.json();
    return data.items[0];
  } catch (error) {
    console.error('Error fetching video details:', error);
    throw new Error('Failed to fetch video details');
  }
}

