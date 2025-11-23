import { create } from 'zustand';
import { FeedPost, ReactionEmoji } from '../types/feed';

interface FeedState {
  posts: FeedPost[];
  addPost: (content: string, stepNumber: number) => void;
  addReaction: (postId: string, emoji: ReactionEmoji) => void;
  removeReaction: (postId: string, emoji: ReactionEmoji) => void;
}

const generateMockPosts = (): FeedPost[] => {
  const mockPosts: FeedPost[] = [
    {
      id: 'post-1',
      userId: 'user-1',
      userName: 'Sarah Chen',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      goalCategory: 'Career & Success',
      content: 'Just completed Day 7 and I found my sign! Saw someone wearing red at the coffee shop and we smiled at each other. The universe is listening! 🙏',
      stepNumber: 7,
      reactions: { '🎉': 12, '❤️': 8, '✨': 5 },
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: 'post-2',
      userId: 'user-2',
      userName: 'Marcus Johnson',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
      goalCategory: 'Love & Relationships',
      content: 'The meditation on Day 12 brought me to tears. I finally understand what it means to be connected to everything. Thank you SignRoad 💫',
      stepNumber: 12,
      reactions: { '❤️': 24, '🙏': 15, '✨': 10 },
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
    {
      id: 'post-3',
      userId: 'user-3',
      userName: 'Emma Rodriguez',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      goalCategory: 'Personal Growth',
      content: 'Found my white feather on Day 1! It was on my car windshield this morning. I\'m ready for this journey! 🪶',
      stepNumber: 1,
      reactions: { '🎉': 18, '🔥': 7, '✨': 12 },
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    },
    {
      id: 'post-4',
      userId: 'user-4',
      userName: 'David Kim',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      goalCategory: 'Health & Wellness',
      content: 'Completed the Wanderer\'s Fortnight! My lantern is burning bright and I feel more aligned than ever. Becoming a Seeker today! 🔥',
      stepNumber: 14,
      reactions: { '🔥': 30, '🎉': 22, '✨': 18 },
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    },
    {
      id: 'post-5',
      userId: 'user-5',
      userName: 'Aisha Patel',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha',
      goalCategory: 'Wealth & Abundance',
      content: 'The synchronicity is real! After Day 5\'s meditation, I saw 11:11 three times today. The universe is speaking! 🌟',
      stepNumber: 5,
      reactions: { '✨': 16, '🎉': 9, '❤️': 11 },
      createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
    },
  ];

  return mockPosts;
};

export const useFeedStore = create<FeedState>((set) => ({
  posts: generateMockPosts(),

  addPost: (content, stepNumber) => {
    const newPost: FeedPost = {
      id: `post-${Date.now()}`,
      userId: 'current-user',
      userName: 'You',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
      goalCategory: 'Personal Growth',
      content,
      stepNumber,
      reactions: {},
      createdAt: new Date(),
    };

    set((state) => ({
      posts: [newPost, ...state.posts],
    }));
  },

  addReaction: (postId, emoji) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              reactions: {
                ...post.reactions,
                [emoji]: (post.reactions[emoji] || 0) + 1,
              },
            }
          : post
      ),
    }));
  },

  removeReaction: (postId, emoji) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId && post.reactions[emoji]
          ? {
              ...post,
              reactions: {
                ...post.reactions,
                [emoji]: Math.max(0, post.reactions[emoji] - 1),
              },
            }
          : post
      ),
    }));
  },
}));
