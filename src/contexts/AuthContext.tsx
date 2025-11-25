import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  signup: (username: string, email: string, password: string) => void;
  addFavoriteArtist: (artistId: string) => void;
  removeFavoriteArtist: (artistId: string) => void;
  addSavedAlbum: (albumId: string) => void;
  removeSavedAlbum: (albumId: string) => void;
  addConcertAttending: (concertId: string) => void;
  removeConcertAttending: (concertId: string) => void;
  updateUser: (updates: Partial<User>) => void;
  rateAlbum: (albumId: string, rating: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, _password: string) => {
    const mockUser: User = {
      id: "1",
      username: "MusicFan",
      email,
      bio: "Japanese music enthusiast",
      favoriteGenres: ["J-Pop", "J-Rock"],
      favoriteArtists: [],
      savedAlbums: [],
      concertsAttending: [],
      albumRatings: {},
    };
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
  };

  const signup = (username: string, email: string, _password: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      bio: "",
      favoriteGenres: [],
      favoriteArtists: [],
      savedAlbums: [],
      concertsAttending: [],
      albumRatings: {},
    };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const addFavoriteArtist = (artistId: string) => {
    if (user && !user.favoriteArtists?.includes(artistId)) {
      updateUser({
        favoriteArtists: [...(user.favoriteArtists || []), artistId],
      });
    }
  };

  const removeFavoriteArtist = (artistId: string) => {
    if (user) {
      updateUser({
        favoriteArtists:
          user.favoriteArtists?.filter((id) => id !== artistId) || [],
      });
    }
  };

  const addSavedAlbum = (albumId: string) => {
    if (user && !user.savedAlbums?.includes(albumId)) {
      updateUser({
        savedAlbums: [...(user.savedAlbums || []), albumId],
      });
    }
  };

  const removeSavedAlbum = (albumId: string) => {
    if (user) {
      updateUser({
        savedAlbums: user.savedAlbums?.filter((id) => id !== albumId) || [],
      });
    }
  };

  const addConcertAttending = (concertId: string) => {
    if (user && !user.concertsAttending?.includes(concertId)) {
      updateUser({
        concertsAttending: [...(user.concertsAttending || []), concertId],
      });
    }
  };

  const removeConcertAttending = (concertId: string) => {
    if (user) {
      updateUser({
        concertsAttending:
          user.concertsAttending?.filter((id) => id !== concertId) || [],
      });
    }
  };

  const rateAlbum = (albumId: string, rating: number) => {
    if (user) {
      updateUser({
        albumRatings: {
          ...(user.albumRatings || {}),
          [albumId]: rating,
        },
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        signup,
        addFavoriteArtist,
        removeFavoriteArtist,
        addSavedAlbum,
        removeSavedAlbum,
        addConcertAttending,
        removeConcertAttending,
        updateUser,
        rateAlbum,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
