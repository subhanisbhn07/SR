# SignRoad: Product Requirements Document

## Executive Summary

SignRoad is transforming from a generic wellness meditation platform into a journey-based manifestation application that blends meditation, gamification, and synchronicity tracking. The product guides users through a mystical 1000-step journey where they set intentions, complete daily meditation steps, look for signs in the real world, and track their progress toward manifesting their goals. The experience balances scientific wellness practices with mystical elements (7/10 on the mysticism scale), creating an engaging daily ritual that feels both grounded and magical.

## Product Vision

SignRoad is not just another meditation app. It is a digital companion for life transformation that treats manifestation as a tangible journey. Users walk "The Road" - a visual path through 1000 steps where each day brings a new meditation, a specific sign to look for in the real world, and progress toward their stated goal. The app creates a sense of destiny and synchronicity by encouraging users to notice meaningful patterns in their daily lives, while maintaining psychological grounding through proven meditation techniques.

The core insight is that people want to believe their actions matter and that the universe responds to their intentions. SignRoad provides a framework for this belief through structured daily practices, gamified progress tracking, and social accountability, all wrapped in an aesthetic that feels mystical without being purely esoteric.

## Target Users

**Primary: The Conscious Seeker** (Ages 22-35, 70% female)
- Interested in personal development and manifestation concepts
- Familiar with meditation but struggles with consistency
- Active on social media and values aesthetic experiences
- Willing to pay for premium content that delivers results
- Believes in both psychology and "universe energy"

**Secondary: The Wellness Wanderer** (Ages 18-25, 65% female)
- New to meditation and manifestation practices
- Drawn to gamification and visual progress tracking
- Seeks community and accountability
- Budget-conscious but willing to pay for proven value
- Highly influenced by social proof and viral trends

## Core User Journey

The fundamental daily loop that drives engagement and retention:

**Morning Ritual**
1. User opens app and sees their current position on The Road (a vertical scrolling mystical path)
2. They tap today's glowing node to access the day's content
3. They read the "Sign of the Day" challenge (e.g., "Look for a White Feather")
4. They select their preferred background ambience from 12 options (premium feature after Day 14)
5. They listen to the AI-generated guided meditation (2-25 minutes depending on their choice)
6. Their Lantern brightens and they earn Sparks (in-app currency)

**Throughout the Day**
7. User remains aware of their sign challenge, creating mindful attention to their environment
8. When they spot their sign, they feel a moment of synchronicity and connection

**Evening Reflection**
9. User returns to app and taps the floating "Sign Log" button
10. They confirm they found the sign and optionally add a journal entry about the experience
11. They see their Tribe members' progress (who else meditated today)
12. They receive XP, their streak continues, and tomorrow's node unlocks

This loop creates multiple dopamine moments (meditation completion, sign discovery, logging, tribal connection) while maintaining the calming essence of meditation practice.

## Key Product Systems

### 1. The Manifestation Engine

**Goal Setting**
Users begin their journey by defining a specific intention or goal. The onboarding flow guides them from vague wishes ("I want to be happy") to concrete visualizations ("I am confidently presenting to my team and receiving positive feedback"). This goal becomes their North Star throughout the journey and is referenced in meditation scripts.

**The Sign Mechanic**
Each day presents a specific sign for users to find in the real world. Signs are carefully chosen to be common enough to be findable but specific enough to feel meaningful. Examples include: a white feather, a key, running water, a coin, 11:11 on a clock, a butterfly, or an open door. The sign system creates a treasure hunt mentality and trains users to be more present and observant in their daily lives.

Signs are logged through a simple trust-based system. Users tap "I found the Sign" and optionally add notes or photos. There is no complex validation in the MVP - we trust users and focus on the psychological benefit of the practice rather than enforcement.

### 2. The Road (Content System)

**Structure**
The Road is a vertical scrolling visual path that represents the user's journey from Day 1 to Day 1000. It resembles a mystical constellation map or an enchanted forest path, with each day represented as a node. The current day glows with a pulsing animation, completed days show a soft glow, and future days appear dimmed or locked (with padlock icons for premium content).

**Content Phases**
- Phase 1: Days 1-14 (Free "Wanderer's Fortnight") - The onboarding funnel
- Phase 2: Days 15-31 (First Month) - Building the habit
- Phase 3: Days 32-90 (First Quarter) - Deepening the practice
- Phase 4: Days 91-180 (Half Year) - Transformation period
- Phase 5: Days 181-365 (Full Year) - Mastery level
- Phase 6: Days 366-1000 (Extended Journey) - Hall of Fame territory

**Content Structure per Day**
Each step includes:
- Step number and title (e.g., "Day 1: The Spark")
- Theme description (e.g., "Awakening to intention")
- AI-generated meditation script (2-25 minutes, multiple length options)
- Sign of the Day with symbolic meaning
- XP reward amount
- Spark currency reward

### 3. Audio System

**Voice Generation**
All meditation scripts use AI-generated voices to enable scalability and cost-effectiveness. The voice is warm, slightly echoed, with slow pacing to create a mystical yet calming tone. Scripts are written specifically to sound natural when synthesized, avoiding robotic phrasing.

**Dynamic Audio Mixing**
Users can select from 12 ambient background tracks to play behind the guided voice:
- Theta Waves
- Forest Rain
- Ocean Waves
- Binaural Beats (Focus)
- Binaural Beats (Sleep)
- Tibetan Singing Bowls
- Crackling Fire
- Night Crickets
- Wind Chimes
- Soft Piano
- Space Ambience
- Pure Silence

The audio mixer is unlocked after Day 14 as a premium feature, incentivizing subscription. Free users get a preset mix optimized for each day.

**Length Options**
Each day's meditation offers multiple duration options:
- Micro-dose: 2-5 minutes (for busy mornings)
- Standard: 10-15 minutes (recommended)
- Deep dive: 20-25 minutes (for dedicated practice)

The core content is the same, but longer versions include extended breathing exercises, deeper visualizations, and longer pauses for reflection.

### 4. Gamification System

**The Lantern**
The Lantern is the user's visual representation of their practice consistency. It appears in the top bar and on their avatar. The Lantern has a health value from 0-100:
- 100: Bright, glowing, full flame
- 50-99: Steady flame, normal brightness
- 25-49: Dimming, flickering slightly
- 1-24: Very dim, barely lit
- 0: Extinguished, needs rekindling

The Lantern dims gradually when users miss days (loses 15 points per missed day) but never goes out completely unless they miss 7+ consecutive days. This creates gentle pressure without harsh punishment. Users can rekindle their Lantern by completing a meditation, and it returns to 50 health immediately, then builds back to 100 over subsequent days.

**Sparks Currency**
Sparks are earned through:
- Completing daily meditations (+10 Sparks)
- Logging signs (+5 Sparks)
- Maintaining streaks (bonus +20 every 7 days)
- Tribe challenges (variable rewards)
- Special achievements (+50-100 Sparks)

Sparks are spent on:
- Cosmetic items for Lumi (the fox avatar)
- Special meditation backgrounds
- Custom Lantern designs
- Profile badges and frames

Importantly, Sparks cannot be purchased with real money. They are earned-only, which maintains the authenticity of the wellness journey and prevents pay-to-win dynamics.

**Streaks**
The streak counter shows consecutive days of meditation practice. Unlike harsh streak systems that reset to zero, SignRoad's streak "freezes" when missed rather than resetting. If a user has a 30-day streak and misses a day, their streak stays at 30 but doesn't grow. They can resume growing it by completing another meditation. This reduces anxiety while still encouraging consistency.

**Achievements**
Milestone-based achievements unlock at key moments:
- First Steps: Complete Day 1
- Week Warrior: Complete 7 consecutive days
- Sign Seeker: Log 10 signs
- Tribe Leader: Nudge tribe members 5 times
- Manifestation Master: Complete 365 days

Achievements display in the user's profile and can be shared to social media.

### 5. Social System

**Tribes**
Tribes are groups of 5 users who are automatically matched based on their start date and primary goal category (e.g., "Wealth," "Love," "Health," "Career"). Tribes provide gentle accountability without competitive pressure.

**The Tribe Campfire Widget**
A semi-transparent overlay at the bottom of the main screen shows 5 small avatar icons sitting around a campfire. When a tribe member completes their meditation for the day, their icon glows. Grey icons indicate members who haven't meditated yet. This creates subtle social pressure and celebration.

Users can tap the "Nudge Tribe" button to send a gentle notification to members who haven't meditated yet. Nudges are limited to once per day per user to prevent spam.

**Traveler's Log**
The Traveler's Log is each user's private journal where they record their sign sightings, reflections, and manifestation wins. By default, all entries are private. Users can choose to make specific entries public, which posts them to the Global Feed.

**Global Feed**
The Global Feed displays public manifestation wins and sign discoveries from the community. It's designed to inspire and create social proof without being overwhelming. Posts are simple: user avatar, their goal category, and their win (e.g., "Sarah just manifested her dream job! 🎉"). Users can react with supportive emojis but cannot comment, keeping the feed positive and low-maintenance.

### 6. Viral Mechanics (Phase 3)

**The Universe Receipt**
When users log a sign, the app generates a beautiful, shareable image that looks like a mystical receipt from the universe. The receipt includes:
- The sign they found (e.g., "Blue Butterfly")
- Time of day (e.g., "11:11 AM")
- Location (city only, for privacy)
- Calculated "Probability of Synchronicity" (e.g., "0.004% - Rare Event")
- Status: "UNIVERSE CONFIRMED"
- Aesthetic glitch/holographic design

This gives users social currency - something interesting to share on Instagram Stories that makes them look spiritually connected and "chosen." The probability calculation adds a gamified element and conversation starter.

**Day 3: The Glitch**
On Day 3, the audio player intentionally "glitches" and plays a cryptic soundbite: "They are looking for you." The app then prompts users to share their "Signal Strength" (a generated image showing "98% Signal Strength") to unlock the clear audio. This creates mystery and viral curiosity as friends ask "What is looking for you?"

**Day 7: Be The Sign**
On Day 7, the mechanic flips. Instead of looking for a sign, users ARE the sign. The app instructs them to wear something red and smile at anyone else wearing red, activating a real-world synchronicity. Users post selfies with the caption "If you see me today, I am your sign. #SignRoad" which floods social media and creates real-world awareness.

**Day 12: Twin Flame**
Users receive a "Half-Code" - a visually torn card with a unique pattern. They post it to social media with #SignRoadTwinFlame. When they find another user with the matching half (managed through hashtag matching), both users receive 500 Sparks. This forces massive community interaction and hashtag trending.

## Monetization Strategy

**Freemium Model**
- Days 1-14: Completely free (The Wanderer's Fortnight)
- Days 15+: Requires subscription (The Seeker tier)

**Subscription Tiers**
- Wanderer (Free): Access to Days 1-14, basic features, preset audio mix, limited Tribe features
- Seeker ($9.99/month or $79.99/year): Full access to all 1000 days, audio mixer, full Tribe features, priority support
- Master ($19.99/month or $159.99/year): Everything in Seeker plus exclusive Master-only content, early access to new features, special cosmetics, Hall of Fame recognition

**Cosmetic Purchases**
All cosmetics are purchased with Sparks (earned currency), not real money. This maintains authenticity and prevents the app from feeling like a cash grab.

**No Ads**
The app will never display advertisements. The experience must feel sacred and uninterrupted.

## Technical Architecture

### Current State
The existing SignRoad codebase is a React 18 + TypeScript + Vite frontend application with:
- Zustand for state management (authStore, wellnessStore)
- Tailwind CSS for styling with custom design system
- Framer Motion for animations
- React Hook Form for form handling
- No backend API (currently using mock data in stores)
- No database (all data is client-side)

### Target Architecture

**Frontend**
Continue using the existing React/TypeScript/Vite stack, which is well-suited for the product. Reuse existing components where possible:
- Auth system and user store
- Session player components (adapt for "step" playback)
- UI primitives (buttons, cards, badges)
- State management patterns

**Backend (New)**
A backend API will be required to support:
- User authentication and profile management
- Progress persistence across devices
- Tribe matching and management
- Global feed content
- Subscription status and payment processing
- Analytics and usage tracking

Recommended stack: Node.js/Express or FastAPI with PostgreSQL database, deployed on a platform like Railway, Render, or Fly.io.

**Data Model**
The conceptual schema includes five core tables:

1. **users**: Stores traveler profiles, subscription status, current step, lantern health, streak, Sparks balance, tribe assignment
2. **road_steps**: Stores the 1000 steps with titles, descriptions, free/premium status, audio URLs, sign challenges, XP rewards
3. **audio_ambience**: Stores the 12 background track options with names, file URLs, premium status
4. **tribes**: Stores tribe information including name, current focus, combined score
5. **manifestations**: Stores user journal entries, sign logs, and public wins with privacy flags

**Audio Storage**
AI-generated meditation audio files will be stored in cloud storage (AWS S3, Cloudflare R2, or similar) and referenced by URL in the database. Audio generation can be done offline using services like ElevenLabs, Murf.ai, or similar, then uploaded to storage.

**Image Generation**
The Universe Receipt generator will use server-side image rendering (Canvas API or similar) to create shareable images on-demand when users log signs.

## Content Specification: The Wanderer's Fortnight (Days 1-14)

This is the critical free content that converts curious visitors into paying subscribers. Each day is carefully designed to build engagement, demonstrate value, and create habit formation. The two-week journey provides enough time to establish a genuine meditation habit while building anticipation for the deeper content that follows.

### Day 1: The Spark
**Theme**: Awakening to intention
**Sign**: A White Feather (symbol of new beginnings)
**Meditation Focus**: Welcome and intention setting. Low barrier to entry, immediate positive feeling.
**Script Opening**: "Welcome to the Road. You are here because you called out for something different. Take a deep breath... and as you exhale, imagine you are standing at the edge of a dense forest. It is dark, but you hold a lantern."
**Journal Prompt**: "What is the one thing you want to change in your life right now?"
**Reward**: +10 Sparks, Lantern Lit to 100

### Day 2: The Compass
**Theme**: Defining the specific goal
**Sign**: A Key (symbol of access and answers)
**Meditation Focus**: Moving from general wish to specific goal. Programming the compass.
**Script Focus**: "The Universe loves specificity. Saying 'I want to be happy' is like asking a GPS to 'go somewhere nice.' Today, we program your compass. What does your goal look like? Smell like? Feel like?"
**Journal Prompt**: "Rewrite your goal in the present tense. (e.g., 'I am currently driving my new car...')"
**Reward**: +10 Sparks, +10 XP

### Day 3: The Clearing
**Theme**: Removing mental blocks
**Sign**: Running Water (symbol of letting go)
**Meditation Focus**: Addressing skepticism and anxiety. Observing fear without judgment.
**Script Focus**: "You may feel resistance. A voice saying 'this won't work.' That is just the weight of your old self. Today, we put down the backpack. We observe the fear, and we let it pass like water in a stream."
**Special Event**: The audio "glitches" with the cryptic message "They are looking for you" (viral mechanic)
**Tribe Introduction**: User is placed in their Tribe of 5
**Reward**: +10 Sparks, +10 XP, Tribe Unlocked

### Day 4: The Kindle
**Theme**: Gratitude and high vibration
**Sign**: A Coin (symbol of abundance)
**Meditation Focus**: Raising vibration through gratitude. Noticing what's already working.
**Script Focus**: "You cannot manifest a new life while resenting your old one. Gratitude is the fuel for your lantern. Today, we focus on what is already working."
**Journal Prompt**: "List 3 things that went right today."
**Reward**: +10 Sparks, +10 XP

### Day 5: The Signal
**Theme**: Tuning into frequency
**Sign**: 11:11 or repeating numbers (the "Master Number")
**Meditation Focus**: Introducing synchronicity concepts. Seeing patterns.
**Script Focus**: "There is a rhythm to the world. When you align with your goal, you start seeing patterns. These are not coincidences; they are breadcrumbs. Follow them."
**Special Reward**: Avatar gets temporary "Aura" effect when sign is logged
**Reward**: +10 Sparks, +10 XP, Aura Effect

### Day 6: The Mirror
**Theme**: Self-worth and identity
**Sign**: A Butterfly (symbol of transformation)
**Meditation Focus**: Identity shifting. Becoming the person who has what you want.
**Script Focus**: "To get what you want, you must become the person who has it. You are not 'trying' to be successful; you are a successful person waiting for the world to catch up."
**Duration**: Slightly longer meditation (7 minutes instead of 5) to challenge commitment
**Reward**: +10 Sparks, +15 XP

### Day 7: The Mirror
**Theme**: Self-reflection and authenticity
**Sign**: Your own reflection (in a mirror, window, or water)
**Meditation Focus**: Identity shifting and becoming the person who has what you want.
**Script Focus**: "To get what you want, you must become the person who has it. You are not 'trying' to be successful; you are a successful person waiting for the world to catch up. Today, look at yourself and see who you are becoming."
**Special Event**: "Be The Sign" challenge - wear red and post selfie (viral mechanic)
**Reward**: +10 Sparks, +15 XP

### Day 8: The Echo
**Theme**: Listening to inner wisdom
**Sign**: An echo or repeated sound (your voice, a bell, a knock)
**Meditation Focus**: Tuning into intuition and inner guidance.
**Script Focus**: "Your inner voice has been speaking all along. Today, we learn to hear it clearly. The universe speaks through you, not just to you."
**Reward**: +10 Sparks, +10 XP

### Day 9: The Seed
**Theme**: Planting intentions
**Sign**: A seed, plant, or flower
**Meditation Focus**: Understanding that manifestation requires patience and nurturing.
**Script Focus**: "You cannot rush a seed. You plant it, water it, and trust the process. Your goal is the same. Today, we plant deeper roots."
**Reward**: +10 Sparks, +10 XP

### Day 10: The Crossroads
**Theme**: Decision and clarity
**Sign**: A crossroads, intersection, or fork in the path
**Meditation Focus**: Making aligned choices and trusting your direction.
**Script Focus**: "Every choice is a vote for the life you want. Today, we practice choosing with intention rather than habit."
**Reward**: +10 Sparks, +10 XP

### Day 11: The Anchor
**Theme**: Grounding and stability
**Sign**: An anchor, rock, or tree with deep roots
**Meditation Focus**: Building unshakeable foundation while reaching for goals.
**Script Focus**: "You can only rise as high as your roots go deep. Today, we anchor your practice in something solid."
**Reward**: +10 Sparks, +10 XP

### Day 12: The Connection
**Theme**: Universal interconnection
**Sign**: Two things connected (linked chains, holding hands, bridges)
**Meditation Focus**: Understanding that you are not separate from what you seek.
**Script Focus**: "The gap between you and your goal is an illusion. You are already connected to everything you desire."
**Special Event**: "Twin Flame" half-code matching challenge (viral mechanic)
**Reward**: +10 Sparks, +10 XP

### Day 13: The Release
**Theme**: Letting go of control
**Sign**: Something floating away (balloon, leaf on water, bird flying)
**Meditation Focus**: Surrendering attachment to outcomes while maintaining intention.
**Script Focus**: "Hold your goal lightly. Grip too tight and you strangle it. Today, we practice the art of allowing."
**Reward**: +10 Sparks, +10 XP

### Day 14: The Threshold
**Theme**: Commitment and crossing into deeper practice
**Sign**: An Open Door or Archway (the literal gate to paid tier)
**Meditation Focus**: The conversion moment. Celebrating two weeks of progress and inviting deeper commitment.
**Script Focus**: "You have walked the first two weeks. Your lantern burns bright. But the forest gets deeper from here. The path ahead requires commitment. You are no longer a Wanderer; you are ready to become a Seeker. Will you step through?"
**Ending**: Audio ends with crescendo, map scrolls to Day 15 which is shrouded in mystic fog with golden padlock
**Popup**: "You have completed the Initiation. The road continues for those who are ready. Unlock the next 351 days."
**Reward**: +20 Sparks, +20 XP, Conversion Prompt

## UI/UX Specifications

### The Infinite Road (Main Screen)

**Top Bar**
- Left: Lumi avatar (tap to access cosmetics)
- Center: "Day X" indicator
- Right: Spark counter and settings icon

**Main Visual Area**
A vertical scrolling mystical path (constellation style or enchanted forest aesthetic). The path winds through a starry void or mystical landscape that evolves based on progress milestones. Current node pulses with golden glow. Completed nodes have soft glow. Locked premium nodes show padlock icons.

Tapping the current node opens the Day Detail screen with audio player and sign challenge.

**Bottom Widget: Tribe Campfire**
Semi-transparent overlay showing 5 avatar icons around a small fire. Glowing icons indicate members who meditated today. Grey icons indicate pending. "Nudge Tribe" button sends gentle notification.

**Floating Action Button**
"Quill" or "Eye" icon in bottom right. Tapping opens "Did you see the Sign today?" input with optional photo upload and journal entry.

### Day Detail Screen

**Header**
- Day number and title
- Theme description
- Sign of the Day with symbolic meaning

**Audio Player**
- Duration selector (Micro/Standard/Deep)
- Background ambience selector (premium feature, shows 12 options)
- Large play/pause button
- Progress bar
- Volume control

**Sign Challenge Card**
Visual card showing today's sign with description and symbolic meaning. "I found it!" button to log.

**Journal Section**
Text area for reflection with prompt of the day.

### Profile Screen

**User Stats**
- Current day number
- Total days completed
- Current streak
- Lantern health visualization
- Sparks balance

**Achievements Grid**
Unlocked achievements displayed as cards with icons, titles, and unlock dates.

**Tribe Section**
Current tribe members, tribe name, collective progress.

**Settings**
Notification preferences, audio settings, subscription management, privacy controls.

## Phased Delivery Plan

### Phase 0: Foundation & Alignment (Week 1)
**Goal**: Prepare the codebase and align on technical approach

- Audit existing SR codebase and identify reusable components
- Define data model and API contracts (users, steps, tribes, manifestations, audio)
- Create backend architecture plan (tech stack, hosting, database)
- Finalize Days 1-14 meditation scripts and sign challenges
- Design The Infinite Road UI mockups
- Set up project documentation structure

**Deliverables**: Technical specification document, API contract definitions, content scripts for Days 1-14, UI mockups

### Phase 1: Core Journey MVP (Weeks 2-6)
**Goal**: Ship a working Days 1-14 experience with solo journey mechanics

**Journey & Content**
- Implement road_steps data model for Days 1-14
- Build The Infinite Road UI (vertical scrolling path, node states, navigation)
- Create Day Detail screen with step information
- Implement basic audio playback with preset background mix

**Manifestation & Signs**
- Build goal intake flow during onboarding
- Implement Sign of the Day display
- Create "I found the Sign" logging with optional journal entry
- Build Traveler's Log (private journal view)

**Gamification**
- Implement Lantern health system with visual representation
- Create Sparks currency tracking
- Build XP and reward distribution logic
- Implement streak tracking with freeze mechanic

**User System**
- Set up user authentication (reuse existing authStore pattern)
- Implement user profile with stats
- Create subscription status tracking (Wanderer vs Seeker)
- Build paywall screen after Day 14

**Backend (Parallel Track)**
- Set up backend API server
- Implement database with core tables
- Create authentication endpoints
- Build user progress persistence endpoints
- Set up audio file storage and CDN

**Testing & Polish**
- Test complete Days 1-14 flow
- Ensure audio playback works smoothly
- Verify paywall triggers correctly
- Test on mobile responsive layouts

**Success Criteria**: A user can sign up, complete Days 1-14, log signs, see their progress, and hit the paywall. All data persists across sessions.

### Phase 2: Social & Cosmetics (Weeks 7-10)
**Goal**: Add social accountability and cosmetic customization

**Tribes**
- Implement tribe matching algorithm (by start date and goal category)
- Build Tribe Campfire widget with member status
- Create "Nudge Tribe" notification system
- Add tribe stats to profile

**Social Feed**
- Build Global Feed of public manifestation wins
- Implement privacy toggle for journal entries
- Create "Share to Feed" functionality
- Add emoji reactions to feed posts

**Cosmetics**
- Design Lumi avatar customization system
- Create cosmetics inventory and shop
- Implement Spark-based purchasing (no real money)
- Add cosmetic items for Lantern designs
- Build profile badges and frames

**Audio Expansion**
- Implement audio mixer with 12 background options
- Create premium gate for audio mixer (unlocks Day 15+)
- Add user preference saving for audio settings

**Content Expansion**
- Create Days 15-31 meditation scripts and signs
- Implement content management for easier script updates

**Success Criteria**: Users can join tribes, see member activity, customize their avatar with earned Sparks, and access Days 15-31 with subscription.

### Phase 3: Viral Mechanics & Growth (Weeks 11-14)
**Goal**: Implement viral sharing features to drive organic growth

**Universe Receipt Generator**
- Build server-side image rendering service
- Implement probability calculation algorithm
- Create shareable receipt design (holographic aesthetic)
- Add one-tap sharing to Instagram/Twitter/TikTok

**Day 3 Glitch Event**
- Implement audio glitch trigger on Day 3
- Create "Signal Strength" shareable image
- Build unlock flow after sharing

**Day 7 "Be The Sign" Challenge**
- Create selfie upload/camera integration
- Build "I am your sign" shareable overlay
- Implement hashtag tracking (#SignRoad)

**Day 12 Twin Flame Matching**
- Generate unique half-codes for users
- Create code matching algorithm
- Build reward distribution for matches
- Implement hashtag tracking (#SignRoadTwinFlame)

**Analytics & Optimization**
- Implement event tracking for key actions
- Set up conversion funnel analysis
- Add A/B testing framework for paywall messaging
- Create admin dashboard for monitoring

**Success Criteria**: Viral mechanics drive measurable social sharing, hashtag usage increases, and organic user acquisition improves.

### Phase 4: Scale & Mastery (Weeks 15+)
**Goal**: Expand content library and support long-term users

**Content Scaling**
- Expand to 90 days of content
- Create content creation pipeline and tools
- Expand to 180 days
- Expand to 365 days
- Plan 1000-day roadmap

**Advanced Features**
- Implement Hall of Fame for 365+ day users
- Create Master tier exclusive content
- Build personalized recommendation engine
- Add advanced analytics for users

**Platform Expansion**
- Develop native mobile apps (iOS/Android)
- Implement push notifications
- Add offline mode for audio
- Create Apple Watch/wearable integration

**Business Operations**
- Implement payment processing (Stripe)
- Build subscription management
- Create customer support tools
- Set up email marketing automation

**Success Criteria**: Users can complete 365+ days, retention metrics improve, revenue scales with user base.

## Open Questions & Decisions Needed

1. **Backend Technology Stack**: What backend framework and hosting platform should we use? Recommendation: Node.js/Express or FastAPI with PostgreSQL on Railway/Render.

2. **AI Voice Service**: Which AI voice generation service should we use? Options: ElevenLabs (high quality, $99/mo), Murf.ai (good quality, $29/mo), or open-source solutions like Coqui TTS.

3. **Payment Processing**: Should we use Stripe for subscriptions, or integrate with app store subscriptions (Apple/Google)? Recommendation: Start with Stripe for web, add app store later for mobile.

4. **Content Creation Process**: Who will write the meditation scripts for Days 8-1000? Should we hire a meditation instructor/writer or use AI assistance with human editing?

5. **Tribe Matching Algorithm**: Should tribes be matched by goal category only, or also consider factors like timezone, age range, or experience level?

6. **Data Privacy**: What user data do we collect for Universe Receipts (location, time)? How do we handle GDPR/CCPA compliance?

7. **Mobile Strategy**: Should we build native mobile apps immediately after web MVP, or wait until we validate product-market fit on web?

8. **Moderation**: How do we moderate the Global Feed to prevent spam or inappropriate content? Do we need automated filtering or manual review?

## Success Metrics

**Engagement Metrics**
- Daily Active Users (DAU)
- Weekly Active Users (WAU)
- Average session duration
- Days completed per user
- Sign logging rate
- Journal entry rate
- Tribe interaction rate

**Conversion Metrics**
- Free-to-paid conversion rate (target: 15%+ after Day 14)
- Trial-to-subscription conversion
- Churn rate (target: <5% monthly)
- Lifetime Value (LTV)

**Growth Metrics**
- Organic user acquisition rate
- Viral coefficient (users invited per user)
- Social media mentions and hashtag usage
- App store ratings and reviews

**Content Metrics**
- Completion rate by day (identify drop-off points)
- Audio playback completion rate
- Preferred meditation lengths
- Most popular background ambiences

## Conclusion

SignRoad represents a unique opportunity in the wellness space by combining proven meditation practices with gamification, social accountability, and mystical synchronicity tracking. The phased approach allows us to validate core mechanics with a focused MVP (Days 1-14) before investing in more complex social and viral features.

The existing codebase provides a solid foundation with its React/TypeScript architecture and Zustand state management. By reusing existing components and patterns while introducing new domain models (The Road, Lantern, Tribes), we can transform the generic wellness platform into this specialized manifestation journey app efficiently.

The key to success is nailing the Days 1-14 experience - creating enough value and engagement that users willingly convert to paid subscribers. The two-week free period provides sufficient time to establish a genuine meditation habit and demonstrate transformative value. The viral mechanics in Phase 3 will then amplify organic growth, but only if the core product delivers genuine transformation and delight.
