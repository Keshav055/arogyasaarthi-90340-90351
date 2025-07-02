# ArogyaMitr Frontend Feature Audit & Enhancement Roadmap

This document compares the React frontend implementation to the detailed app requirements and outlines the missing elements for each major module/page, followed by the roadmap to complete the UX as specified.

---

## Key Requirements per Feature/Module:
- **Interactive cards, charts, and infographics**
- **User-driven state (add/edit/log data, feedback)**
- **Live data or realistic demo hooks (API-facing)**
- **Support for Indian regional context where relevant**
- **Functional media (video/voice), map integrations, filtering, notifications**
- **Responsive, modern, health-themed UI**

---

## Page-By-Page Audit

### 1. Homepage / Dashboard (/dashboard)
**Existing:**  
- User greeting, logout button
- Progress chart (UserProgressChart), wellness infographic (radar), trending health tips (bar chart)

**Missing:**  
- Notifications (health reminders, unread activity)
- Quick health check-in widget (e.g. “How are you feeling?”)
- Upcoming appointments/events snippet
- Deeper data insights (AI highlights, suggested actions)
- Customizable dashboard tiles/cards
- Recent activity log/summary

**To Add:**  
- Notification and activity panels (top or sidebar cards)
- Customizable tile/components ("Add tile" or drag/drop order)
- Widget for "Quick health check-in"
- Card with upcoming bookings/events

---

### 2. Wellness Path (/wellness-path)
**Existing:**  
- Wellness radar chart (static), goal suggestion list

**Missing:**  
- Ability to select/change focus areas (e.g. Nutrition/Fitness/Mindfulness/Sleep)
- Animation or progress along path
- Navigation/Call-to-action buttons to submodules
- Deeper analytics (historical trends)
- “Set/Track Goal” button(s)
- Guided user walkthrough (onboarding-style)

**To Add:**  
- Interactive selection of focus areas
- CTA cards linking to Diet/Fitness/Mindfulness/Sleep
- Progress timeline/visualization
- Goal setting/tracking widget

---

### 3. Diet & Nutrition (/diet-nutrition)
**Existing:**  
- Hydration pie chart, nutrient radar, meal planner placeholder

**Missing:**  
- Live meal plan browser (filter/search), add meal/food log
- Indian regional recipes database/list
- Hydration/nutrient reminders
- Upload/add custom recipe
- Nutrition tip cards, AI nutrition suggestions
- Calorie/macro summary cards
- Barcode scanner link for groceries (deep link to Product Scanner)

**To Add:**  
- Table/List for daily/weekly meal plan (with filter)
- Indian recipes explorer (region dropdown, etc)
- Add meal and hydration log forms
- List for nutrition suggestions/tips (scrollable)
- Button to scan/navigate to product scanner

---

### 4. Fitness (/fitness)
**Existing:**  
- Progress chart, workout log table, add workout form (demo only, not persisted)

**Missing:**  
- Fetching/saving workout logs to backend
- AI workout suggestion widget
- Embedded exercise video player
- Step goal progress bar
- Actionable cards: “Start workout”, “View history”, “Sync device”
- Feedback/encouragement notification

**To Add:**  
- Integrate with real backend for logs
- Workout suggestion cards, video embed area
- Progress bar with today’s target/steps
- CTA for device sync/import
- Motivational notification/popup

---

### 5. Mindfulness (/mindfulness)
**Existing:**  
- Mood progress chart, journaling log table, add entry form (demo only, not persisted)

**Missing:**  
- Guided meditation audio player
- Pranayama (breath training) timer
- Save/restore mood/journal to/from backend
- Calming reminders/notifications
- Streaks ("X days meditated")
- Mood trend insights/AI feedback

**To Add:**  
- Audio/video playback card for meditation/pranayama
- Streaks and insights panel
- Connect to backend for log persistence
- Push notification toggle

---

### 6. Sleep (/sleep)
**Existing:**  
- Sleep progress chart, log/entry form, log table (demo/persist only in state)

**Missing:**  
- Circadian rhythm/cycle visualization
- Smart alarm/bedtime tips/recommendations
- Historical sleep analytics
- Sync sleep data (device)
- "Add sleep data" via device upload
- AI sleep quality feedback

**To Add:**  
- Cards for tips/history/cycle
- Sync/import device data UI
- Inline AI feedback after adding new record

---

### 7. Product Scanner (/product-scanner)
**Existing:**  
- Placeholder text

**Missing:**  
- Barcode/QR scanner activation (webcam widget or input)
- Scan/import/upload barcode
- Product info/result and AI ethical score display
- Button to find/recommend alternatives
- Camera permissions/UX handling

**To Add:**  
- Barcode scanner input
- Result cards/list with scores
- Alternative product recommendations

---

### 8. Ethical Directory (/ethical-business-directory)
**Existing:**  
- Placeholder text

**Missing:**  
- Map view with pins (Google Maps/Mapbox)
- Listings/table/cards of businesses with filtering
- Business detail modal/popup
- Submit/review/rate business
- Category/regional filter UI

**To Add:**  
- Table/list of businesses
- Search/filter bar
- Map widget
- Review/rating component

---

### 9. Disease Management (/disease-management)
**Existing:**  
- Health metrics chart placeholder

**Missing:**  
- Vitals chart (BP, glucose, weight, etc)
- Add/view logs (chart + table)
- Medication reminder/set notification
- Upload/share medical records
- AI anomaly alerts/insights

**To Add:**  
- Vitals multi-metric chart
- Add/view record table
- Medication reminders
- Upload/share file widget
- Insights panel (AI driven, optional)

---

### 10. Tele-Consultation (/teleconsultation)
**Existing:**  
- Room join, chat with doctor (WebSocket), video call placeholder

**Missing:**  
- Real video call integration (WebRTC/Jitsi/Agora etc)
- Doctor selection/list of available experts
- Appointment booking calendar
- E-prescription (download/view record)
- File/image share in chat
- Consultation history list/table

**To Add:**  
- Replace video placeholder with real integration
- Doctor search/selection
- Calendar booking widget
- Record/file share UI in chat
- Past consultations table

---

### 11. Peer Support/Forums (/forums)
**Existing:**  
- WebSocket-based group chat, persistent username

**Missing:**  
- Multiple rooms/topics selection
- Private chat with peer/friend
- Event calendar (local/peer health events)
- Moderation tools (report, mute)
- Message search/filter

**To Add:**  
- Rooms selector UI
- Direct chat feature
- Events/calendar pane
- Basic moderation (UI)

---

### 12. Local Resources (/resources)
**Existing:**  
- Placeholder text

**Missing:**  
- Directory/map of clinics/pharmacies/labs
- List/filter/search UI
- Local health events calendar
- “Add resource/event” form
- “Near me” (geolocation) map

**To Add:**  
- Resource table/list with cards
- Search/filter bar
- Map widget with geolocation
- Event calendar
- Add resource/event button/modal

---

### 13. Education Hub (/education)
**Existing:**  
- Placeholder text

**Missing:**  
- Article/video/infographic cards (fetch/paginate)
- Video/media embedded player
- Categories/tags filtering
- Article detail/read mode
- Bookmark/save/share article

**To Add:**  
- List of articles/videos (responsive cards)
- Embedded video player
- Filter/search bar
- Save/bookmark option

---

### 14. AI Chat (/ai-chat)
**Existing:**  
- Functional WebSocket chat; real-time UI, message log, basic voice input placeholder

**Missing:**  
- Voice input (mic record to text, browser API)
- Response audio (text-to-speech)
- Chat session/history view
- Health question prompt suggestions
- Option to escalate to Teleconsult or Peer Forum

**To Add:**  
- Add voice input button and permissions handling
- Text-to-speech audio replay
- Message history/session list
- Suggestion/CTA buttons for navigation

---

### 15. Profile & Settings (/profile)
**Existing:**  
- Placeholder text

**Missing:**  
- User info display/edit form
- Device integration (wearables, sync)
- Notification preferences
- Privacy/security settings
- Connected accounts list
- Download/delete account data

**To Add:**  
- Full profile form (view/edit)
- Device connection UI
- Notification/privacy settings
- Export/delete account actions

---

## General UI/UX:

### Navigation/Layout
**Existing:**  
- Top nav bar, responsive to login state, mobile drawer

**Missing:**  
- Contextual sidebars (dashboard, main modules)
- Persistent bottom navigation (for mobile)
- Floating action buttons for common actions
- Modular dashboard with customizable tiles

**To Add:**  
- Implement sidebar modular navigation
- Bottom bar for mobile, floating CTAs

---

# Enhancement Implementation Roadmap

**Phase 1: Core Data/Visual Additions**
- Dashboard: notifications, activity, check-in widget, booking/events card.
- Wellness Path: focus area selector, CTA cards, goal/track widgets.
- Diet/Nutrition: meal plan list, recipes explorer, food/hydration log, barcode scanner link.
- Fitness: API integration for logs, workout video cards, progress bar, device sync CTA.

**Phase 2: Engagement & Interactivity**
- Mindfulness: meditation audio, streaks, mood trends, notifications, backend for logs.
- Sleep: circadian analytics, device sync UI, AI feedback.
- Disease Mgmt: multi-metric charts, log table, reminders, uploads, insights.

**Phase 3: Rich Media & Connectivity**
- Product Scanner: barcode input, result card, recommendations.
- Ethical Directory: map/table, search/filter, reviews.
- Teleconsultation: video call API integration, booking calendar, record/file sharing.

**Phase 4: Social & Community**
- Forums: topic/room selection, private chat, calendar/events, moderation.
- Local Resources: card/map list, geosearch, add resource/event, calendar.

**Phase 5: Learning & AI**
- Education Hub: article/video cards, filter, player, bookmarking.
- AI Chat: voice in/out, session history, suggestion CTAs.

**Phase 6: Profile, Settings, System**
- Profile: editable info, device connect UI, settings/preferences.
- Navigation/layout: side drawers, mobile bottom nav, floating action buttons.

---

**Prioritize backend API connectivity, then real interactivity/UX, then advanced media/maps/AI features.**

---

Task Owner: Frontend Lead

Date: 2024-06-08

