# SignRoad Mobile App Testing Guide

**Status:** Mobile app built but NEVER tested  
**Priority:** CRITICAL - Must test before launch  
**Estimated Time:** 2-4 hours for comprehensive testing

---

## Prerequisites

### Install Required Software

**For iOS Testing:**
- macOS computer with Xcode installed
- iOS Simulator (comes with Xcode)
- OR iPhone with Expo Go app installed

**For Android Testing:**
- Android Studio with Android Emulator
- OR Android phone with Expo Go app installed

**For Both:**
```bash
# Install Expo CLI globally
npm install -g expo-cli

# Install EAS CLI (for builds)
npm install -g eas-cli
```

---

## Quick Start Testing

### Option 1: Test on Physical Device (Easiest)

1. **Install Expo Go on your phone:**
   - iOS: https://apps.apple.com/app/expo-go/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

2. **Start the development server:**
   ```bash
   cd /home/ubuntu/repos/SR/signroad-mobile
   npm start
   ```

3. **Scan the QR code:**
   - iOS: Open Camera app and scan QR code
   - Android: Open Expo Go app and scan QR code

4. **App should load on your phone**

### Option 2: Test on iOS Simulator

```bash
cd /home/ubuntu/repos/SR/signroad-mobile
npm start
# Press 'i' to open iOS simulator
```

### Option 3: Test on Android Emulator

```bash
cd /home/ubuntu/repos/SR/signroad-mobile
npm start
# Press 'a' to open Android emulator
```

---

## Comprehensive Test Checklist

### 1. Authentication Flow ✅

**Test Login:**
- [ ] Open app, verify Login screen appears
- [ ] Enter email: `test@signroad.com`
- [ ] Enter password: `test123`
- [ ] Tap "Sign In" button
- [ ] **Expected:** Navigate to Journey screen
- [ ] **Expected:** See user name in header or profile

**Test Registration:**
- [ ] Tap "Create Account" or toggle to register mode
- [ ] Enter name: `Test User`
- [ ] Enter email: `newuser@test.com`
- [ ] Enter password: `password123`
- [ ] Tap "Sign Up" button
- [ ] **Expected:** Navigate to Journey screen
- [ ] **Expected:** New account created in backend

**Test Session Restoration:**
- [ ] Login successfully
- [ ] Close app completely (swipe away from app switcher)
- [ ] Reopen app
- [ ] **Expected:** Still logged in, no login screen
- [ ] **Expected:** User data persisted

**Test Logout:**
- [ ] Navigate to Profile screen
- [ ] Tap "Logout" button
- [ ] **Expected:** Return to Login screen
- [ ] **Expected:** JWT token removed from AsyncStorage

**Bugs to Watch For:**
- Login button not responding
- Keyboard covering input fields
- Error messages not displaying
- Infinite loading spinner
- App crashes on login

---

### 2. Journey Screen (90-Day Path) ✅

**Test Day Visualization:**
- [ ] After login, verify Journey screen displays
- [ ] **Expected:** See 90 day nodes in grid layout
- [ ] **Expected:** Day 1 highlighted as current day
- [ ] **Expected:** Days 1-14 unlocked (free tier)
- [ ] **Expected:** Days 15-90 locked with lock icon 🔒

**Test Day Node States:**
- [ ] Verify Day 1 has orange border (current day)
- [ ] Complete Day 1 meditation
- [ ] Return to Journey screen
- [ ] **Expected:** Day 1 has green background (completed)
- [ ] **Expected:** Day 1 has checkmark ✓
- [ ] **Expected:** Day 2 now has orange border (current)

**Test Day Navigation:**
- [ ] Tap on Day 1 node
- [ ] **Expected:** Navigate to Day Detail screen
- [ ] Tap back button
- [ ] **Expected:** Return to Journey screen
- [ ] Try tapping on locked day (Day 15+)
- [ ] **Expected:** No navigation (or show upgrade prompt)

**Test User Stats Display:**
- [ ] Verify current day number displayed
- [ ] Verify streak count displayed
- [ ] Verify Sparks count displayed
- [ ] Complete a day
- [ ] **Expected:** Stats update immediately

**Bugs to Watch For:**
- Day nodes not rendering
- Wrong days marked as completed
- Can't tap on day nodes
- Locked days are tappable
- Stats not updating
- Scroll performance issues (lag when scrolling through 90 days)

---

### 3. Day Detail Screen (Meditation & Sign Logging) ✅

**Test Audio Player:**
- [ ] Navigate to Day 1 detail
- [ ] **Expected:** See meditation audio player
- [ ] Tap play button ▶️
- [ ] **Expected:** Audio starts playing
- [ ] **Expected:** Play button changes to pause ⏸️
- [ ] Tap pause button
- [ ] **Expected:** Audio pauses
- [ ] Tap play again
- [ ] **Expected:** Audio resumes from where it paused
- [ ] Let audio play to completion
- [ ] **Expected:** Meditation marked as complete
- [ ] **Expected:** Progress synced to backend

**Test Sign Challenge:**
- [ ] Verify "Sign of the Day" displayed
- [ ] Verify sign description displayed
- [ ] Tap "Log Sign" button
- [ ] **Expected:** Sign logged successfully
- [ ] **Expected:** Success message or toast
- [ ] **Expected:** +5 Sparks awarded
- [ ] **Expected:** Sign synced to backend

**Test Navigation:**
- [ ] Tap back button
- [ ] **Expected:** Return to Journey screen
- [ ] **Expected:** Day marked as completed

**Bugs to Watch For:**
- Audio not loading (check Internet Archive URLs)
- Audio player crashes app
- Play/pause button not responding
- Audio continues playing after leaving screen
- Sign logging fails silently
- Progress not syncing to backend
- App crashes when audio finishes

---

### 4. Traveler's Log Screen ✅

**Test Signs Display:**
- [ ] Navigate to Traveler's Log tab
- [ ] **Expected:** See list of all logged signs
- [ ] **Expected:** Each sign shows:
  - Day number
  - Sign name
  - Note (if provided)
  - Date/time logged
  - Photo (if uploaded)

**Test Journal Entries Display:**
- [ ] Scroll down to journal section
- [ ] **Expected:** See list of all journal entries
- [ ] **Expected:** Each entry shows:
  - Day number
  - Content preview
  - Date created

**Test Empty States:**
- [ ] Login with new account (no signs/journals)
- [ ] Navigate to Traveler's Log
- [ ] **Expected:** See "No signs logged yet" message
- [ ] **Expected:** See "No journal entries yet" message

**Test Data Loading:**
- [ ] Pull to refresh (if implemented)
- [ ] **Expected:** Data reloads from backend
- [ ] **Expected:** Loading indicator shown

**Bugs to Watch For:**
- Signs not loading from backend
- Journal entries not displaying
- Photos not rendering
- Infinite loading spinner
- App crashes when opening log
- Scroll performance issues with many entries

---

### 5. Profile Screen ✅

**Test User Info Display:**
- [ ] Navigate to Profile tab
- [ ] **Expected:** See user name
- [ ] **Expected:** See email address
- [ ] **Expected:** See subscription tier (Wanderer/Seeker/Master)

**Test Stats Display:**
- [ ] **Expected:** See current day number
- [ ] **Expected:** See completed days count
- [ ] **Expected:** See streak count
- [ ] **Expected:** See Sparks balance
- [ ] Complete a meditation
- [ ] Return to Profile
- [ ] **Expected:** Stats updated

**Test Logout:**
- [ ] Tap "Logout" button
- [ ] **Expected:** Confirmation dialog appears
- [ ] Tap "Cancel"
- [ ] **Expected:** Stay on Profile screen
- [ ] Tap "Logout" again
- [ ] Tap "Confirm"
- [ ] **Expected:** Return to Login screen
- [ ] **Expected:** Session cleared

**Bugs to Watch For:**
- User data not loading
- Stats showing incorrect values
- Logout not working
- App crashes on logout
- Can't navigate back to Profile after logout

---

### 6. Network & Connectivity Testing ✅

**Test Slow Network:**
- [ ] Enable network throttling (Settings → Developer Options → Network)
- [ ] Set to "Slow 3G" or similar
- [ ] Try logging in
- [ ] **Expected:** Loading indicator shown
- [ ] **Expected:** Login succeeds (may take longer)
- [ ] Try loading Journey screen
- [ ] **Expected:** Data loads eventually
- [ ] Try logging a sign
- [ ] **Expected:** Request completes or shows retry option

**Test Offline Mode:**
- [ ] Enable Airplane Mode
- [ ] Try logging in
- [ ] **Expected:** Error message: "No internet connection"
- [ ] Login first, then enable Airplane Mode
- [ ] Try navigating between screens
- [ ] **Expected:** Cached data still visible
- [ ] Try logging a sign
- [ ] **Expected:** Error message or queued for later sync

**Test Network Errors:**
- [ ] Temporarily stop backend (or use invalid API URL)
- [ ] Try any API operation
- [ ] **Expected:** Clear error message
- [ ] **Expected:** Retry button or option

**Bugs to Watch For:**
- App crashes on network timeout
- Infinite loading with no error message
- No indication of offline state
- Data loss when offline
- App becomes unusable without internet

---

### 7. Cross-Platform Testing ✅

**Test on Multiple iOS Devices:**
- [ ] iPhone SE (small screen)
- [ ] iPhone 14 Pro (standard)
- [ ] iPad (tablet)
- [ ] **Expected:** UI adapts to screen size
- [ ] **Expected:** No layout issues

**Test on Multiple Android Devices:**
- [ ] Small phone (5" screen)
- [ ] Standard phone (6" screen)
- [ ] Tablet (10" screen)
- [ ] **Expected:** UI adapts to screen size
- [ ] **Expected:** No layout issues

**Test Different OS Versions:**
- [ ] iOS 15, 16, 17
- [ ] Android 11, 12, 13, 14
- [ ] **Expected:** App works on all versions

**Bugs to Watch For:**
- Layout broken on small screens
- Text cut off or overlapping
- Buttons not reachable
- Different behavior on iOS vs Android
- Crashes on specific OS versions

---

### 8. Performance Testing ✅

**Test App Launch Time:**
- [ ] Close app completely
- [ ] Open app
- [ ] **Expected:** App loads within 3 seconds
- [ ] **Expected:** No white screen or flash

**Test Screen Transitions:**
- [ ] Navigate between all screens
- [ ] **Expected:** Smooth transitions (60fps)
- [ ] **Expected:** No lag or stuttering

**Test Scroll Performance:**
- [ ] Scroll through 90-day journey
- [ ] **Expected:** Smooth scrolling
- [ ] Scroll through Traveler's Log with many entries
- [ ] **Expected:** No lag

**Test Memory Usage:**
- [ ] Use app for 10+ minutes
- [ ] Navigate between screens multiple times
- [ ] Play audio multiple times
- [ ] **Expected:** No memory leaks
- [ ] **Expected:** App doesn't slow down over time

**Bugs to Watch For:**
- App becomes sluggish after use
- Animations stuttering
- Scroll lag
- App crashes after extended use
- High battery drain

---

### 9. Audio Playback Testing ✅

**Test Audio Loading:**
- [ ] Navigate to Day 1 detail
- [ ] **Expected:** Audio loads within 5 seconds
- [ ] Check console for audio URL errors

**Test Audio Controls:**
- [ ] Play, pause, resume
- [ ] **Expected:** All controls work smoothly
- [ ] Test volume controls (if implemented)
- [ ] Test seek/scrub (if implemented)

**Test Audio Interruptions:**
- [ ] Play meditation audio
- [ ] Receive phone call
- [ ] **Expected:** Audio pauses automatically
- [ ] End call
- [ ] **Expected:** Audio resumes or shows resume button
- [ ] Play meditation audio
- [ ] Switch to another app
- [ ] **Expected:** Audio continues in background (if implemented)

**Test Multiple Audio Sessions:**
- [ ] Play Day 1 audio
- [ ] Navigate back
- [ ] Navigate to Day 2
- [ ] Play Day 2 audio
- [ ] **Expected:** Day 1 audio stops
- [ ] **Expected:** Only one audio plays at a time

**Bugs to Watch For:**
- Audio not loading (404 errors from Internet Archive)
- Audio player crashes app
- Audio continues after leaving screen
- Multiple audios playing simultaneously
- Audio quality issues
- Can't pause or stop audio

---

### 10. Backend Integration Testing ✅

**Test Data Persistence:**
- [ ] Login on mobile app
- [ ] Complete Day 1 meditation
- [ ] Log a sign
- [ ] Logout from mobile app
- [ ] Login on web app (https://pr-generator-yatdm0kx.devinapps.com)
- [ ] **Expected:** Day 1 marked as completed
- [ ] **Expected:** Sign appears in Traveler's Log
- [ ] **Expected:** Progress synced across platforms

**Test Real-Time Sync:**
- [ ] Login on both mobile and web
- [ ] Complete Day 2 on mobile
- [ ] Refresh web app
- [ ] **Expected:** Day 2 shows as completed on web
- [ ] Log sign on web
- [ ] Pull to refresh on mobile
- [ ] **Expected:** Sign appears on mobile

**Test API Error Handling:**
- [ ] Temporarily stop backend
- [ ] Try any operation
- [ ] **Expected:** Clear error message
- [ ] **Expected:** No app crash
- [ ] Restart backend
- [ ] Retry operation
- [ ] **Expected:** Works after backend is back

**Bugs to Watch For:**
- Data not syncing to backend
- Progress lost after logout
- Duplicate entries created
- Conflicts between mobile and web data
- API errors not handled gracefully

---

## Critical Bugs to Report Immediately

### Severity: CRITICAL (App Unusable)
- [ ] App crashes on launch
- [ ] Can't login (authentication broken)
- [ ] Can't navigate between screens
- [ ] Audio player crashes app
- [ ] Data loss (progress not saved)

### Severity: HIGH (Major Feature Broken)
- [ ] Audio not playing
- [ ] Sign logging fails
- [ ] Journey screen not loading
- [ ] Backend sync not working
- [ ] Session not persisting

### Severity: MEDIUM (Minor Feature Issues)
- [ ] UI layout issues
- [ ] Slow performance
- [ ] Missing error messages
- [ ] Stats not updating immediately

### Severity: LOW (Polish Issues)
- [ ] Text alignment issues
- [ ] Color inconsistencies
- [ ] Missing loading indicators
- [ ] Minor UI glitches

---

## Bug Report Template

When you find a bug, please report it with this information:

```markdown
**Bug Title:** [Short description]

**Severity:** Critical / High / Medium / Low

**Device:** iPhone 14 Pro / Samsung Galaxy S23 / etc.
**OS Version:** iOS 17.1 / Android 14 / etc.
**App Version:** 1.0.0

**Steps to Reproduce:**
1. Open app
2. Navigate to Journey screen
3. Tap on Day 1
4. [etc.]

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happened]

**Screenshots/Videos:**
[Attach if possible]

**Console Errors:**
[If available, check Expo logs]

**Additional Notes:**
[Any other relevant information]
```

---

## Performance Benchmarks

### Target Metrics
- **App Launch:** < 3 seconds
- **Screen Transitions:** < 300ms
- **API Requests:** < 2 seconds (on good network)
- **Audio Loading:** < 5 seconds
- **Scroll FPS:** 60fps
- **Memory Usage:** < 200MB
- **Crash Rate:** < 0.5% of sessions

### How to Measure
- Use React Native Performance Monitor (shake device → "Show Perf Monitor")
- Check Xcode Instruments (iOS) or Android Profiler (Android)
- Monitor network requests in Expo Dev Tools

---

## Next Steps After Testing

### If No Critical Bugs Found:
1. Create Expo EAS builds
2. Submit to TestFlight (iOS) and Play Store Beta (Android)
3. Invite beta testers
4. Collect feedback
5. Iterate and fix issues
6. Public release

### If Critical Bugs Found:
1. Document all bugs with severity
2. Fix critical bugs first
3. Re-test after fixes
4. Repeat until no critical bugs remain
5. Then proceed to beta release

---

## Testing Completion Checklist

- [ ] All 10 test sections completed
- [ ] Tested on at least 2 devices (iOS + Android)
- [ ] Tested on slow network
- [ ] Tested offline mode
- [ ] All critical bugs documented
- [ ] All high-severity bugs documented
- [ ] Performance benchmarks measured
- [ ] Backend integration verified
- [ ] Cross-platform sync tested
- [ ] Ready for beta release OR bugs need fixing

---

## Resources

- **Backend API:** https://app-lnhrftkp.fly.dev
- **API Docs:** https://app-lnhrftkp.fly.dev/docs
- **Web App:** https://pr-generator-yatdm0kx.devinapps.com
- **Test Credentials:** test@signroad.com / test123
- **Expo Documentation:** https://docs.expo.dev
- **React Navigation Docs:** https://reactnavigation.org

---

## Estimated Testing Time

- **Quick Smoke Test:** 30 minutes
- **Comprehensive Testing:** 2-4 hours
- **Performance Testing:** 1-2 hours
- **Cross-Platform Testing:** 2-3 hours
- **Total:** 5-10 hours for thorough testing

**Recommendation:** Start with quick smoke test to catch critical bugs, then do comprehensive testing once major issues are fixed.
