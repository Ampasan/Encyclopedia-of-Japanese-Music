import { Review } from "../types";

export const reviews: Review[] = [
  {
    id: "review-1",
    userId: "user-1",
    userName: "MusicLover123",
    rating: 4.8,
    comment:
      "Amazing artist! Their music has been a huge part of my life. The energy and emotion in every song is incredible.",
    date: "2024-11-15",
    targetType: "artist",
    targetId: "sumika",
  },
  {
    id: "review-2",
    userId: "user-2",
    userName: "Alex",
    rating: 5,
    comment:
      "His songwriting, production, and storytelling blend into deeply emotional works that stay with you long after listening",
    date: "2024-11-10",
    targetType: "artist",
    targetId: "kenshi-yonezu",
  },
  {
    id: "review-3",
    userId: "user-3",
    userName: "AnimeMusic",
    rating: 5,
    comment:
      "One of my favorite Japanese artists. Their songs are always on repeat!",
    date: "2024-11-05",
    targetType: "artist",
    targetId: "yoasobi",
  },
  {
    id: "review-4",
    userId: "user-4",
    userName: "RockEnthusiast",
    rating: 4.5,
    comment:
      "Solid performance and great discography. Looking forward to more releases!",
    date: "2024-10-28",
    targetType: "artist",
    targetId: "radwimps",
  },
  {
    id: "review-5",
    userId: "user-5",
    userName: "Hana W",
    rating: 5,
    comment:
      "Ado's voice is incredibly dynamic, raw, emotional, and powerful.",
    date: "2024-10-28",
    targetType: "artist",
    targetId: "ado",
  },
];
