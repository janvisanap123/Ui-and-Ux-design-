export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  description: string;
  genre: string;
  rating?: number;
  pages?: number;
  publishedYear?: string;
  publisher?: string;
}

export interface MerchItem {
  id: string;
  name: string;
  price: number;
  iconName: string;
  description: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  subtitle: string;
  episodeNumber: number;
  duration: string;
  colorClass: string;
  iconName: 'play_circle' | 'mic' | 'volume_up';
}

export interface CartItem {
  id: string;
  type: 'book' | 'merch';
  name: string;
  price: number;
  quantity: number;
  imageOrIcon: string;
  authorOrDetail: string;
}

export interface AISuggestion {
  coverColor: string;
  textColor: string;
  fontStyle: string;
  suggestedTitle: string;
  blurb: string;
  chapterTitles: string[];
  coverStyle: string;
  layoutGuidelines: string;
}

export interface Manuscript {
  id: string;
  title: string;
  genre: string;
  synopsis: string;
  authorName: string;
  uploadedAt: string;
  status: 'uploaded' | 'refined' | 'distributed';
  progress: number;
  aiSuggestion?: AISuggestion;
}
