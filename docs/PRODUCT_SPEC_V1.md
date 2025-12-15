# SignRoad Product Spec v1

**Last Updated:** December 11, 2025  
**North Star Persona:** Maya, 24yo, marketing/tech/creative, chronically online, 50% skeptical / 50% hopeful

---

## Core Promise (30 seconds)

> "Manifestation with receipts. 10 minutes daily. Actual proof when it works."

---

## Primary Persona: Maya

- **Age:** 24
- **Work:** Marketing/tech/creative fields, earning ~$3K/month
- **Behavior:** Chronically online, sees manifestation content on TikTok constantly
- **Mindset:** 50% skeptical, 50% hopeful - wants to believe but needs proof
- **Willingness to pay:** $11.11/month if it actually works (will cancel Spotify to afford it)
- **Advocacy:** Will screenshot Universe Receipt and post on IG Stories with "no because this actually works???"

### What Maya is trying to fix:
1. **Primary:** "I feel stuck" (existential, lack of direction)
2. **Secondary:** Anxiety (overthinking, need for control)
3. **Tertiary:** Abundance/money (not desperate, just wants better opportunities)

### What Maya brags about:
> "I manifested [specific thing] in 11 days and I have the Universe Receipt to prove it."

### Maya's fears before starting:
1. "This is woo-woo" → Solved with receipts + structure
2. "I'll abandon it like every other app" → Solved with 10-min commitment + daily habit
3. "It'll guilt me when I miss days" → Solved with "universe works in timing" messaging
4. "It's expensive" → Solved with "better than Spotify" framing + 7-step free proof

---

## Segments (Priority Order)

1. **"Spiritual but busy" seekers** (primary) - Want manifestation to work but need structure
2. **Curious skeptics who like data** (secondary) - Need receipts (literal receipts!) as proof
3. **Burned-out professionals** (tertiary) - Need the 10-min daily ritual for sanity

### SignRoad is NOT for:
- People wanting instant results
- Users who want 100% mystical/spiritual (no structure)
- People unwilling to invest 10 min/day
- Anyone under 18
- Pure productivity app seekers

---

## Core Mechanics (Why They Come)

### Tier 1 - Primary (Growth Drivers)
| Mechanic | Purpose | Status |
|----------|---------|--------|
| **Universe Receipts** | Proof + shareability - THE growth engine | Implemented (needs odds calculation) |
| **Daily Audio** | 10-min habit anchor, learning curve | Placeholder (admin-managed) |
| **Signs** | Gamification + awareness, real-world engagement | Implemented (100 signs, expanding to 1000) |

### Tier 2 - Secondary (Retention)
| Mechanic | Purpose | Status |
|----------|---------|--------|
| **Tribes** | Social proof + accountability (5-person groups) | Implemented (mock data) |
| **Daily Message** | Barnum effect - personalized feel | Implemented |
| **Goals** | Track what user wants to manifest | Implemented |

### Tier 3 - Nice Flavor (Not Core)
| Mechanic | Purpose | Status |
|----------|---------|--------|
| **Lantern** | Visual progress indicator (dims, never resets) | Implemented |
| **Sparks** | Earned-only currency for avatar items | Implemented (needs clearer explanation) |

---

## Content Strategy

### Daily Audio
- **Delivery:** Sequential (same order for every user - learning curve)
- **Volume:** 1000 audios planned (placeholders for now)
- **Management:** Admin panel uploads → reflects to frontend
- **Duration:** 10-minute micro-sessions (primary), deep dives available

### Daily Message (Barnum Effect)
- **Delivery:** Random selection, personalized with user's name
- **Volume:** 1000 messages planned
- **Management:** Admin panel
- **Purpose:** Create "how did this know?" feeling

### Signs
- **Assignment:** Random from database
- **Volume:** 1000 signs planned (100 currently implemented)
- **Rarity tiers:** Whispered (70%), Spoken (20%), Shouted (7%), Thundered (2.5%), Cosmos-Aligned (0.5%)
- **Logging:** Trust-based manual logging (no image recognition)

---

## Trial & Pricing Model

### Free Trial
- **Model:** Step-based (NOT calendar-based)
- **Access:** First 7 steps free, even if user takes 15 days to complete them
- **After 7 steps:** Paywall appears

### Pricing
| Plan | Price | Interval |
|------|-------|----------|
| Monthly | $11.11 | /month |
| Annual | $88.88 | /year (save 33%) |

### Post-Paywall Behavior
- Users can view past logs and receipts
- Cannot access new steps/content until payment
- Gentle "continue your journey" messaging

---

## Universe Receipt Specification

### What triggers a Receipt:
User clicks "Goal Achieved" on their goal

### Receipt contains:
- Verified SignRoad stamp
- Goal name
- Days taken
- Signs logged count
- Sessions completed count
- "Odds Beaten" percentage

### Odds Beaten Calculation (v1)
Gamified deterministic formula based on:
- Sign rarity values encountered
- Days taken to manifest
- Steps completed
- Sessions listened

Formula: `odds = 100 - (baseOdds * rarityMultiplier * timeMultiplier)`

### Sharing
- User downloads image OR clicks share button
- Native share sheet appears with social media options
- No direct IG/TikTok API integration needed for v1

---

## User Journey (7-Step Free Period)

### Day/Step 1: First Impression
- Sign revealed (random from database)
- Daily message displayed (Barnum effect with name)
- First audio queued ("Today's 10-min session")
- Tribe preview shown

### Steps 2-4: Building Habit
- Daily sign + audio + message
- Nudges if sign not logged: "Still looking? Universe works in timing"
- Tribe engagement encouraged

### Steps 5-6: Deepening
- Continue daily ritual
- Show progress toward first receipt
- "You're X signs away from your first Universe Receipt"

### Step 7: Conversion Point
- Complete final free step
- Paywall appears
- Copy: "You've experienced 7 steps. Ready to continue your 1,000-step road?"

### Aha Moment (Must happen by Step 3):
> "Holy shit, I just saw my sign in real life, logged it, got a stamped receipt, and now I'm posting this on IG."

---

## Drop-off Prevention

### Risk Point 1: Step 3 - No sign found yet
**Solution:** Daily message says "Universe works in timing. Your sign is waiting for you."

### Risk Point 2: Step 5 - No Tribe engagement
**Solution:** Show Tribe activity feed, highlight others' wins

### Risk Point 3: Step 7 - Paywall with no receipt
**Solution:** Ensure "Goal Achieved" flow is prominent; show sample receipt if none generated

---

## Success Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| D7 Activation | % users who generate at least 1 Universe Receipt in first 7 steps | TBD |
| Trial-to-Paid Conversion | % of 7-step trial users who convert to Premium | TBD |
| Social Share Rate | % of receipts that get shared on social media | TBD |

---

## Acquisition Channels (Priority)

1. **Social (TikTok/Instagram)** - Universe Receipts go viral
2. **Word-of-mouth** - Users share receipts, friends get curious
3. **Content (YouTube/TikTok educational)** - "I tried manifestation apps for 30 days"
4. **Paid ads** - Retargeting people who engaged with manifestation content

---

## Technical Constraints (v1)

- Push notifications: Available
- Email automation: Future (not in v1)
- Stripe: Payment provider (stubs in place)
- Admin panel: Exists, needs audio/message upload capability
- Real-time Tribe activity: Mock data for now

---

## B2B Strategy

**NOT YET.** Stay laser-focused on B2C for next 12-18 months. Once 50K+ passionate users are posting receipts, HR teams will come asking. Don't dilute the message now.

- Hide/demote Enterprise nav link
- Keep /enterprise page but don't promote it

---

## Implementation Phases

### Phase 1: Homepage Story (Current)
- New hero: "Manifestation with receipts. 10 minutes daily."
- 3-step "How it works" explainer
- Universe Receipt showcase above the fold
- Demote Sparks/Lantern visual weight
- Hide Enterprise nav

### Phase 2: Day-1 Onboarding Flow
- Post-signup wizard: intention → sign reveal → first audio
- Dramatic sign reveal moment
- Tribe preview

### Phase 3: Day-Based Nudges
- Step 2-4: Encouragement if no sign yet
- Step 5-6: Progress toward receipt
- Step 7: Paywall with "continue your journey" framing

### Phase 4: Referral Entry Path
- Detect receipt/referral links
- Fast-track onboarding: "Your friend [Name] manifested [thing]. Ready for yours?"

---

## Appendix: Barnum Effect Messages (Examples)

Messages should feel deeply personal but apply broadly:

- "You're the kind of person who feels deeply, but doesn't always show it. Today, a small sign will remind you you're on the right road."
- "You often carry more than you admit, yet others see you as strong. A simple ritual today will feel like a weight off your shoulders."
- "You've been thinking about a change for a while. Today, you'll notice a sign that nudges you one step closer."
- "[Name], there's a stillness waiting for you that you've been too busy to notice. Today, you'll see a sign that invites you in."

---

## Appendix: Sign Rarity Distribution

| Rarity | Probability | Example | Unlock Day |
|--------|-------------|---------|------------|
| Whispered | 70% | White feather, 11:11, butterfly | Day 1 |
| Spoken | 20% | Rainbow, cardinal, 444 | Day 3+ |
| Shouted | 7% | Double rainbow, owl, 777 | Day 7+ |
| Thundered | 2.5% | Dolphin, peacock | Day 15+ |
| Cosmos-Aligned | 0.5% | Northern lights, whale, eclipse | Day 21+ |
