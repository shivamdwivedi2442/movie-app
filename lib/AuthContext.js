"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const USER_KEY = "reelhouse_user";
const FAVORITES_KEY = "reelhouse_favorites";
const HISTORY_KEY = "reelhouse_history";
const MAX_HISTORY = 30;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [ready, setReady] = useState(false);

  // Restore everything from localStorage on first mount so a reload
  // never logs the user out or wipes favorites/history.
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_KEY);
      if (storedUser) setUser(JSON.parse(storedUser));

      const storedFavs = localStorage.getItem(FAVORITES_KEY);
      if (storedFavs) setFavorites(JSON.parse(storedFavs));

      const storedHistory = localStorage.getItem(HISTORY_KEY);
      if (storedHistory) setHistory(JSON.parse(storedHistory));
    } catch {
      // ignore corrupted storage
    }
    setReady(true);
  }, []);

  function login(userData) {
    // userData example: { name: "Rahul", email: "rahul@example.com" }
    setUser(userData);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(USER_KEY);
    // Favorites/history stay in localStorage on purpose — if the same
    // person logs back in they see their saved list again. Remove the
    // two lines below if you'd rather wipe them on logout instead.
  }

  function updateProfile(updates) {
    setUser((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem(USER_KEY, JSON.stringify(next));
      return next;
    });
  }

  // NOTE: this is a client-only demo implementation with no real backend
  // verification of the current password. Wire this up to your actual
  // /api/login or a dedicated /api/change-password route for real auth.
  function changePassword(currentPassword, newPassword) {
    return new Promise((resolve, reject) => {
      if (!user) return reject(new Error("Not logged in"));
      if (user.password && user.password !== currentPassword) {
        return reject(new Error("Current password is incorrect"));
      }
      updateProfile({ password: newPassword });
      resolve();
    });
  }

  function toggleFavorite(movie) {
    setFavorites((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      const next = exists
        ? prev.filter((m) => m.id !== movie.id)
        : [
            {
              id: movie.id,
              title: movie.title,
              poster_path: movie.poster_path,
              release_date: movie.release_date,
              vote_average: movie.vote_average,
              media_type: movie.media_type || "movie",
            },
            ...prev,
          ];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      return next;
    });
  }

  function isFavorite(id) {
    return favorites.some((m) => m.id === id);
  }

  function addHistory(movie) {
    setHistory((prev) => {
      const withoutDupe = prev.filter((m) => m.id !== movie.id);
      const next = [
        {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          media_type: movie.media_type || "movie",
          viewedAt: new Date().toISOString(),
        },
        ...withoutDupe,
      ].slice(0, MAX_HISTORY);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      return next;
    });
  }

  function clearHistory() {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        ready,
        login,
        logout,
        updateProfile,
        changePassword,
        favorites,
        toggleFavorite,
        isFavorite,
        history,
        addHistory,
        clearHistory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}