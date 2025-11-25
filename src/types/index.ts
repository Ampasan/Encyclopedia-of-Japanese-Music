export type Genre = "J-Pop" | "J-Rock" | "Pop Rock" | "Electronic" | "Anisong";

export type Status = "Aktif" | "Inactive";

export interface Member {
  name: string;
  nameKanji?: string;
  role: string;
}

export interface Artist {
  id: string;
  name: string;
  nameKanji?: string;
  about: string;
  label: string;
  status: Status;
  genre: Genre[];
  members: Member[];
  imageUrl?: string;
  rating?: number;
  debutYear?: number;
}

export interface Track {
  id: string;
  title: string;
  duration: string;
  trackNumber: number;
}

export interface Album {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  releaseDate: string;
  genre: Genre[];
  label: string;
  coverUrl?: string;
  tracks: Track[];
  rating?: number;
  spotifyUrl?: string;
  youtubeUrl?: string;
}

export interface Concert {
  id: string;
  name: string;
  artistId: string;
  artistName: string;
  venue: string;
  city: string;
  date: string;
  time: string;
  price?: string;
  posterUrl?: string;
  description?: string;
  ticketUrl?: string;
}

export interface News {
  id: string;
  title: string;
  content: string;
  author: string;
  publishDate: string;
  category: Genre;
  thumbnailUrl?: string;
  imageUrl?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  targetType: "artist" | "album";
  targetId: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  favoriteGenres?: Genre[];
  favoriteArtists?: string[];
  savedAlbums?: string[];
  concertsAttending?: string[];
  albumRatings?: Record<string, number>;
}
