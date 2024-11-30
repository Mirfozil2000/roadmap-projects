import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Post {
  id: string;
  title: string;
  subreddit: string;
  url: string;
}

interface RedditStore {
  favSubreddits: string[];
  favPosts: Post[];
  recentSubreddits: string[];
  addFavSubreddit: (subreddit: string) => void;
  addRecentSubreddit: (subreddit: string) => void;
  addFavPost: (post: Post) => void;
  reset: () => void;
}

export const useRedditStore = create<RedditStore>()(
  persist(
    (set) => ({
      favSubreddits: [],
      favPosts: [],
      recentSubreddits: [],
      addFavSubreddit: (subreddit) =>
        set((state) => {
          const isFav = state.favSubreddits.includes(subreddit);
          if (isFav) {
            return {
              favSubreddits: state.favSubreddits.filter(
                (fav) => fav !== subreddit
              ),
            };
          } else {
            return {
              favSubreddits: [...state.favSubreddits, subreddit],
            };
          }
        }),
      addRecentSubreddit: async (subreddit) => {
        set((state) => {
          const updatedRecentSubreddits = [
            subreddit,
            ...state.recentSubreddits.filter((sr) => sr !== subreddit),
          ];
          if (updatedRecentSubreddits.length > 10) {
            updatedRecentSubreddits.pop();
          }
          return {
            ...state,
            recentSubreddits: updatedRecentSubreddits,
          };
        });
      },
      addFavPost: async (post) => {
        set((state) => {
          const isFav = state.favPosts.some(
            (favPost) => favPost.id === post.id
          );
          if (isFav) {
            return {
              favPosts: state.favPosts.filter((fav) => fav.id !== post.id),
            };
          } else {
            return {
              ...state,
              favPosts: [...state.favPosts, post],
            };
          }
        });
      },
      reset: () =>
        set(() => ({
          favSubreddits: [],
          favPosts: [],
          recentSubreddits: [],
        })),
    }),
    {
      name: "redditStore",
    }
  )
);
