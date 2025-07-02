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

## Page-By-Page Audit (Current Implementation vs Requirements)

### 1. Homepage / Dashboard (`DashboardPage.js`)
**Implemented:**  
- Greeting, logout button
- User progress chart, wellness radar infographic, trending health tips bar chart

**Missing:**  
- Notification panel (reminders, unread activity)
- Quick health check-in widget ("How are you feeling?")
- Upcoming appointments/events card/snippet
- Deeper data insights (AI highlights, suggested actions)
- Customizable dashboard tiles/cards (add/remove/reorder modules)
- Recent activity log/summary

**Summary:**  
- Must add notifications, activity summary, check-in widget, booking/events card, and customizable dashboard tile UI.

---

### 2. Wellness Path (`WellnessPathPage.js`)
**Implemented:**  
- Static wellness radar, goal suggestions list

**Missing:**  
- Interactive selection/changing focus areas (e.g., Nutrition/Fitness/Mindfulness/Sleep)
- Animated progress path visualization
- Navigation/Cards for submodules (Diet, Fitness, etc.)
- Goal "set/track" buttons
- Historical analytics (trends)
- Onboarding/walkthrough wizard

**Summary:**  
- Should implement: interactive focus selection, progress visual, CTA cards, goal/track widget, onboarding experience.

---

### 3. Diet & Nutrition (`DietNutritionPage.js`)
**Implemented:**  
- Hydration pie chart and nutrient radar
- Meal planner placeholder

**Missing:**  
- Meal plan table/list with filter/search
- Add meal/food/hydration log forms (user input)
- Indian regional recipes explorer (list, with region filter)
- Nutrition suggestion/tip cards (from AI or database)
- Calorie/macro summary
- Barcode scanner link (to Product Scanner)
- Upload/add user recipe
- Hydration/nutrient reminder notifications

**Summary:**  
- Add: meal plan UI, logging forms, Indian recipes browser, tip/suggestion cards, barcode link, and log reminders.

---

### 4. Fitness (`FitnessPage.js`)
**Implemented:**  
- Progress chart, workout log table
- Add workout form (demo only, not persisted)

**Missing:**  
- Backend integration for logs (current: client-only)
- AI workout suggestion widget/cards
- Embedded exercise video player
- Step goal progress bar
- CTA/action cards: “Start workout,” “View history,” “Sync device”
- Feedback/encouragement notification

**Summary:**  
- Provide persistent backend logs, workout suggestions, embedded player, goal progress, device sync CTA, and notifications.

---

### 5. Mindfulness (`MindfulnessPage.js`)
**Implemented:**  
- Mood progress chart, journal log table, add-entry form (demo-only)

**Missing:**  
- Guided meditation audio player
- Pranayama (breath training) timer/widget
- Backend for log saving/restoring
- Calming reminders/notification toggle
- Streaks/count ("X days meditated")
- Trend/insight/AI feedback panel

**Summary:**  
- Add: audio/video player, streak/insight panel, backend log persistence, reminder toggle.

---

### 6. Sleep (`SleepPage.js`)
**Implemented:**  
- Sleep progress chart, log table/form (state only)

**Missing:**  
- Circadian rhythm/cycle visualization
- Smart alarm/bedtime tips, recommendations
- Import/sync device sleep data
- "Add sleep" via device upload
- AI sleep quality feedback and historic analytics

**Summary:**  
- Add: cycle card, history/tips cards, device import, AI assessment after entries.

---

### 7. Product Scanner (`ProductScannerPage.js`)
**Implemented:**  
- Placeholder text only

**Missing:**  
- Barcode/QR input (webcam or text box)
- Product scan/import/upload, display info/results, AI score
- Alternative recommendations
- Camera permissions

**Summary:**  
- Needs barcode scanner widget, product results/score, alternative recommendations UI.

---

### 8. Ethical Directory (`EthicalBusinessDirectoryPage.js`)
**Implemented:**  
- Placeholder text only

**Missing:**  
- Map widget (Google/Mapbox)
- Table/list/cards of businesses with filter/search
- Business detail modal/pop-up
- Review/ratings, submission form
- Category/region filter UI

**Summary:**  
- Add business list/table, map, filter/search, review submission, modal popups.

---

### 9. Disease Management (`DiseaseManagementPage.js`)
**Implemented:**  
- Chart placeholder for health metrics

**Missing:**  
- Vitals chart: BP, glucose, weight, etc.
- Add/view logs (chart + table)
- Medication reminder/notification
- Upload/share medical records
- AI anomaly/insight alerts

**Summary:**  
- Add: multi-metric chart, CRUD on logs/records, reminders, uploads, AI insight panel.

---

### 10. Teleconsultation (`TeleconsultationPage.js`)
**Implemented:**  
- Room join, chat with doctor (WebSocket), video area (placeholder)

**Missing:**  
- Real video call integration (WebRTC/Jitsi/Agora)
- Doctor selection/list, search
- Appointment booking calendar UI
- E-prescription view/download
- File/image sharing in chat
- Consultation history list/table

**Summary:**  
- Add: real video, doctor selector, calendar booking, file sharing, consultation log.

---

### 11. Peer Support/Forums (`ForumsPage.js`)
**Implemented:**  
- Live WebSocket group chat, basic username

**Missing:**  
- Rooms/topics selector, private/direct chat
- Event calendar (community events)
- Moderation tools (report/mute)
- Message search/filter

**Summary:**  
- Implement: rooms/topics UI, direct chat, event/calendar, moderation tools.

---

### 12. Local Resources (`LocalResourcesPage.js`)
**Implemented:**  
- Placeholder text only

**Missing:**  
- Directory/map of clinics/pharmacies/labs/resources
- List/search/filter UI
- Event calendar UI
- Add resource/event widget (form)
- “Near me”/geolocation map

**Summary:**  
- Add: map/resource table, search bar, calendar, add resource/event, geolocation.

---

### 13. Education Hub (`EducationHubPage.js`)
**Implemented:**  
- Placeholder text only

**Missing:**  
- Article/video/infographic cards (fetch/paginate)
- Embedded video/media player
- Categories/tags/filter search
- Article detail view (modal/fullscreen)
- Save/bookmark/share UI

**Summary:**  
- Add: articles/video browser, cards, filter/search, embedded player, bookmarks.

---

### 14. AI Chat (`AiChatPage.js`)
**Implemented:**  
- Functional real-time WebSocket chat, message log, voice input placeholder

**Missing:**  
- Real voice input integration and permissions
- Response audio (text-to-speech)
- Chat session/history view/persistence
- Health question prompt suggestions
- Quick navigation CTA to Teleconsult/Forum on context

**Summary:**  
- Add: speech-to-text, response audio, session/history UI, suggested question CTA.

---

### 15. Profile & Settings (`ProfileSettingsPage.js`)
**Implemented:**  
- Placeholder text only

**Missing:**  
- User info form (view/edit)
- Device integration (wearable sync)
- Notification, privacy/security preferences/settings
- Connected accounts list
- Download/delete account data options

**Summary:**  
- Implement: full profile edit form, settings, device connect UI, privacy/export controls.

---

### General UI/UX (Contextual Navigation/Layout)
**Implemented:**  
- Top nav bar, responsive to login state, basic mobile drawer

**Missing:**  
- Contextual sidebars (dashboard/modules)
- Persistent bottom navigation (mobile)
- Floating action buttons (page-level CTAs)
- Modular dashboard: customizable tile arrangement

**Summary:**  
- Add: side-nav, bottom-nav, floating CTAs, modular dashboard config.

---

## Full Work To-Do Summary (per page):

| Page/Module             | Key Missing Elements/Features                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------------|
| Dashboard               | Notifications, check-in widget, activity log, events card, customizable tiles                     |
| Wellness Path           | Interactive focus select, progress visual/timeline, navigation cards, goal widgets, onboarding     |
| Diet & Nutrition        | Meal plan/recipe list, log forms, Indian regional recipes, tip cards, barcode scanner link         |
| Fitness                 | Backend logs, AI suggestions, video embed, progress bar, CTA cards (sync, start), notifications     |
| Mindfulness             | Audio player, breath-pranayama widget, backend journaling, streaks, AI insights, reminders         |
| Sleep                   | Rhythm/cycle card, analytics/history, device sync/import, AI sleep feedback/tips                  |
| Product Scanner         | Barcode/QR input, result cards, alternative recommendations, camera permissions                   |
| Ethical Directory       | Map, business list/table, filter/search bar, reviews/ratings, detail popup                        |
| Disease Management      | Vitals chart, logs, records upload/share, medication reminders, insights/alerts                   |
| Teleconsultation        | Real video, doctor search, booking calendar, file/image share, consultation history, e-prescription|
| Forums                  | Multiple rooms/topics, direct chat, event/calendar, moderation, search/filter                     |
| Local Resources         | Directory/map, filter/search, event calendar, add resource/event, geolocation                     |
| Education Hub           | Article/video cards, filter/search, embedded player, bookmarks/share                              |
| AI Chat                 | Speech-to-text, response TTS, session/history, suggestion CTAs                                    |
| Profile/Settings        | Editable form, device UI, notification/privacy settings, data export/delete                       |
| Navigation/Layout       | Sidebars, bottom nav (mobile), floating CTAs, modular dashboard                                   |

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

>>>>>>> REPLACE
