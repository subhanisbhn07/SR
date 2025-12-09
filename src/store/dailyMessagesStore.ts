import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// PRD: Daily Messages - 60 Barnum templates with variable substitution
// Barnum statements are universally applicable statements that feel personal

export interface DailyMessage {
  id: string;
  template: string;
  category: 'motivation' | 'insight' | 'affirmation' | 'guidance' | 'reflection';
  variables: string[];
}

export interface PersonalizedMessage {
  id: string;
  message: string;
  category: string;
  deliveredAt: string;
  isRead: boolean;
}

// Variable substitutions
const VARIABLES = {
  '{time_of_day}': () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  },
  '{day_of_week}': () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  },
  '{season}': () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
  },
  '{moon_phase}': () => {
    const phases = ['new moon', 'waxing crescent', 'first quarter', 'waxing gibbous', 'full moon', 'waning gibbous', 'last quarter', 'waning crescent'];
    return phases[Math.floor(Math.random() * phases.length)];
  },
  '{element}': () => {
    const elements = ['fire', 'water', 'earth', 'air'];
    return elements[Math.floor(Math.random() * elements.length)];
  },
  '{color}': () => {
    const colors = ['golden', 'silver', 'emerald', 'sapphire', 'ruby', 'amethyst'];
    return colors[Math.floor(Math.random() * colors.length)];
  },
  '{number}': () => {
    const numbers = ['three', 'seven', 'nine', 'eleven', 'twelve'];
    return numbers[Math.floor(Math.random() * numbers.length)];
  },
};

// PRD: 60 Barnum templates across 5 categories
const DAILY_MESSAGE_TEMPLATES: DailyMessage[] = [
  // MOTIVATION (12)
  { id: 'msg-1', template: 'This {time_of_day}, the universe is aligning in your favor. Trust the process.', category: 'motivation', variables: ['{time_of_day}'] },
  { id: 'msg-2', template: 'You have untapped potential waiting to emerge. Today is the day to let it shine.', category: 'motivation', variables: [] },
  { id: 'msg-3', template: 'The energy of {day_of_week} supports new beginnings. What will you start?', category: 'motivation', variables: ['{day_of_week}'] },
  { id: 'msg-4', template: 'Your inner strength is greater than any obstacle you face. Remember this.', category: 'motivation', variables: [] },
  { id: 'msg-5', template: 'Something wonderful is on its way to you. Stay open to receiving it.', category: 'motivation', variables: [] },
  { id: 'msg-6', template: 'The {element} within you is ready to transform challenges into opportunities.', category: 'motivation', variables: ['{element}'] },
  { id: 'msg-7', template: 'You are closer to your goals than you realize. Keep moving forward.', category: 'motivation', variables: [] },
  { id: 'msg-8', template: 'This {season} brings powerful energy for manifestation. Use it wisely.', category: 'motivation', variables: ['{season}'] },
  { id: 'msg-9', template: 'Your dedication is creating ripples in the universe. They will return to you.', category: 'motivation', variables: [] },
  { id: 'msg-10', template: 'The path ahead may be unclear, but your next step is always illuminated.', category: 'motivation', variables: [] },
  { id: 'msg-11', template: 'You possess a unique gift that the world needs. Share it boldly.', category: 'motivation', variables: [] },
  { id: 'msg-12', template: 'Every {time_of_day} meditation brings you closer to your highest self.', category: 'motivation', variables: ['{time_of_day}'] },
  
  // INSIGHT (12)
  { id: 'msg-13', template: 'Pay attention to recurring thoughts today. They carry important messages.', category: 'insight', variables: [] },
  { id: 'msg-14', template: 'Someone from your past may cross your mind. There is a reason for this.', category: 'insight', variables: [] },
  { id: 'msg-15', template: 'The number {number} may appear to you today. Notice when it does.', category: 'insight', variables: ['{number}'] },
  { id: 'msg-16', template: 'Your intuition is particularly strong during this {moon_phase}. Trust it.', category: 'insight', variables: ['{moon_phase}'] },
  { id: 'msg-17', template: 'A decision you have been postponing is ready to be made. You know the answer.', category: 'insight', variables: [] },
  { id: 'msg-18', template: 'Watch for {color} objects today. They may carry significance for you.', category: 'insight', variables: ['{color}'] },
  { id: 'msg-19', template: 'Your dreams have been trying to tell you something. Reflect on them.', category: 'insight', variables: [] },
  { id: 'msg-20', template: 'A conversation today may reveal exactly what you need to hear.', category: 'insight', variables: [] },
  { id: 'msg-21', template: 'The universe communicates through synchronicities. Stay alert to patterns.', category: 'insight', variables: [] },
  { id: 'msg-22', template: 'Something you lost may return to you in an unexpected way.', category: 'insight', variables: [] },
  { id: 'msg-23', template: 'Your body holds wisdom. Listen to what it is telling you today.', category: 'insight', variables: [] },
  { id: 'msg-24', template: 'A {time_of_day} walk may bring clarity to a question you have been holding.', category: 'insight', variables: ['{time_of_day}'] },
  
  // AFFIRMATION (12)
  { id: 'msg-25', template: 'You are worthy of all the good things coming your way.', category: 'affirmation', variables: [] },
  { id: 'msg-26', template: 'Your presence makes a difference in the lives of those around you.', category: 'affirmation', variables: [] },
  { id: 'msg-27', template: 'You are exactly where you need to be on your journey.', category: 'affirmation', variables: [] },
  { id: 'msg-28', template: 'Your heart knows the way. Trust its guidance.', category: 'affirmation', variables: [] },
  { id: 'msg-29', template: 'You have overcome challenges before. You will overcome this one too.', category: 'affirmation', variables: [] },
  { id: 'msg-30', template: 'The universe supports your highest good. Always.', category: 'affirmation', variables: [] },
  { id: 'msg-31', template: 'You are a powerful creator of your own reality.', category: 'affirmation', variables: [] },
  { id: 'msg-32', template: 'Your energy attracts what is meant for you. Trust the process.', category: 'affirmation', variables: [] },
  { id: 'msg-33', template: 'You are loved more than you know, by forces seen and unseen.', category: 'affirmation', variables: [] },
  { id: 'msg-34', template: 'Your light shines brighter than you realize. Let it guide others.', category: 'affirmation', variables: [] },
  { id: 'msg-35', template: 'You are resilient, capable, and infinitely worthy.', category: 'affirmation', variables: [] },
  { id: 'msg-36', template: 'Every breath you take is a gift. Honor it with presence.', category: 'affirmation', variables: [] },
  
  // GUIDANCE (12)
  { id: 'msg-37', template: 'Take a moment this {time_of_day} to express gratitude. It multiplies blessings.', category: 'guidance', variables: ['{time_of_day}'] },
  { id: 'msg-38', template: 'Release what no longer serves you. Make space for what is coming.', category: 'guidance', variables: [] },
  { id: 'msg-39', template: 'Speak your desires aloud today. The universe is listening.', category: 'guidance', variables: [] },
  { id: 'msg-40', template: 'Connect with nature today. It has messages for you.', category: 'guidance', variables: [] },
  { id: 'msg-41', template: 'Practice patience. What you seek is also seeking you.', category: 'guidance', variables: [] },
  { id: 'msg-42', template: 'Write down your intentions. Written words carry power.', category: 'guidance', variables: [] },
  { id: 'msg-43', template: 'Forgive someone today, even if only in your heart. It frees you.', category: 'guidance', variables: [] },
  { id: 'msg-44', template: 'Drink water mindfully. Let it cleanse and renew your energy.', category: 'guidance', variables: [] },
  { id: 'msg-45', template: 'Reach out to someone you have been thinking about. The timing is right.', category: 'guidance', variables: [] },
  { id: 'msg-46', template: 'Create something today, no matter how small. Creation is sacred.', category: 'guidance', variables: [] },
  { id: 'msg-47', template: 'Rest is not laziness. Honor your need for restoration.', category: 'guidance', variables: [] },
  { id: 'msg-48', template: 'Set a boundary today. It is an act of self-love.', category: 'guidance', variables: [] },
  
  // REFLECTION (12)
  { id: 'msg-49', template: 'What would your future self thank you for doing today?', category: 'reflection', variables: [] },
  { id: 'msg-50', template: 'Consider: What are you holding onto that is ready to be released?', category: 'reflection', variables: [] },
  { id: 'msg-51', template: 'Reflect on a recent challenge. What gift did it bring you?', category: 'reflection', variables: [] },
  { id: 'msg-52', template: 'Who in your life deserves more of your appreciation?', category: 'reflection', variables: [] },
  { id: 'msg-53', template: 'What fear is holding you back from your next level?', category: 'reflection', variables: [] },
  { id: 'msg-54', template: 'If you knew you could not fail, what would you attempt?', category: 'reflection', variables: [] },
  { id: 'msg-55', template: 'What part of yourself have you been neglecting lately?', category: 'reflection', variables: [] },
  { id: 'msg-56', template: 'Consider the last time you felt truly alive. What were you doing?', category: 'reflection', variables: [] },
  { id: 'msg-57', template: 'What would you do differently if you loved yourself completely?', category: 'reflection', variables: [] },
  { id: 'msg-58', template: 'Reflect: What is your soul trying to tell you through your emotions?', category: 'reflection', variables: [] },
  { id: 'msg-59', template: 'What legacy do you want to leave? Are your actions aligned with it?', category: 'reflection', variables: [] },
  { id: 'msg-60', template: 'Consider: What would bring you peace right now? Can you give yourself that?', category: 'reflection', variables: [] },
];

interface DailyMessagesState {
  messages: DailyMessage[];
  deliveredMessages: PersonalizedMessage[];
  todayMessage: PersonalizedMessage | null;
  lastDeliveryDate: string | null;
  
  // Actions
  getTodayMessage: () => PersonalizedMessage;
  markAsRead: (messageId: string) => void;
  getMessageHistory: () => PersonalizedMessage[];
  refreshTodayMessage: () => void;
  
  // Helpers
  personalizeMessage: (template: DailyMessage) => string;
  getRandomTemplate: () => DailyMessage;
}

const getToday = () => new Date().toISOString().split('T')[0];

export const useDailyMessagesStore = create<DailyMessagesState>()(
  persist(
    (set, get) => ({
      messages: DAILY_MESSAGE_TEMPLATES,
      deliveredMessages: [],
      todayMessage: null,
      lastDeliveryDate: null,
      
      personalizeMessage: (template: DailyMessage) => {
        let message = template.template;
        
        // Replace all variables
        Object.entries(VARIABLES).forEach(([variable, getValue]) => {
          if (message.includes(variable)) {
            message = message.replace(new RegExp(variable.replace(/[{}]/g, '\\$&'), 'g'), getValue());
          }
        });
        
        return message;
      },
      
      getRandomTemplate: () => {
        const { messages, deliveredMessages } = get();
        
        // Try to avoid recently delivered messages
        const recentIds = deliveredMessages.slice(0, 10).map(m => m.id.split('-delivered')[0]);
        const available = messages.filter(m => !recentIds.includes(m.id));
        
        const pool = available.length > 0 ? available : messages;
        return pool[Math.floor(Math.random() * pool.length)];
      },
      
      getTodayMessage: () => {
        const today = getToday();
        const { todayMessage, lastDeliveryDate } = get();
        
        // Return existing message if already delivered today
        if (todayMessage && lastDeliveryDate === today) {
          return todayMessage;
        }
        
        // Generate new message for today
        const template = get().getRandomTemplate();
        const personalizedText = get().personalizeMessage(template);
        
        const newMessage: PersonalizedMessage = {
          id: `${template.id}-delivered-${Date.now()}`,
          message: personalizedText,
          category: template.category,
          deliveredAt: new Date().toISOString(),
          isRead: false,
        };
        
        set(state => ({
          todayMessage: newMessage,
          lastDeliveryDate: today,
          deliveredMessages: [newMessage, ...state.deliveredMessages].slice(0, 30), // Keep last 30
        }));
        
        return newMessage;
      },
      
      markAsRead: (messageId: string) => {
        set(state => ({
          todayMessage: state.todayMessage?.id === messageId
            ? { ...state.todayMessage, isRead: true }
            : state.todayMessage,
          deliveredMessages: state.deliveredMessages.map(m =>
            m.id === messageId ? { ...m, isRead: true } : m
          ),
        }));
      },
      
      getMessageHistory: () => {
        return get().deliveredMessages;
      },
      
      refreshTodayMessage: () => {
        const template = get().getRandomTemplate();
        const personalizedText = get().personalizeMessage(template);
        
        const newMessage: PersonalizedMessage = {
          id: `${template.id}-delivered-${Date.now()}`,
          message: personalizedText,
          category: template.category,
          deliveredAt: new Date().toISOString(),
          isRead: false,
        };
        
        set(state => ({
          todayMessage: newMessage,
          deliveredMessages: [newMessage, ...state.deliveredMessages].slice(0, 30),
        }));
      },
    }),
    {
      name: 'signroad-daily-messages',
      partialize: (state) => ({
        deliveredMessages: state.deliveredMessages,
        todayMessage: state.todayMessage,
        lastDeliveryDate: state.lastDeliveryDate,
      }),
    }
  )
);

export { DAILY_MESSAGE_TEMPLATES, VARIABLES };
