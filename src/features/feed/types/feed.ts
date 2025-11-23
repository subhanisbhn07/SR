export interface FeedPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  goalCategory: string;
  content: string;
  stepNumber: number;
  reactions: {
    [emoji: string]: number;
  };
  createdAt: Date;
}

export type ReactionEmoji = '🎉' | '❤️' | '🔥' | '✨' | '🙏';
