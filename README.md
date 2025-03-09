# OpenSource-Limitimer

A simple, mobile-friendly HTML webpage that functions as a countdown timer ("Limitimer"). Users can set a desired time in minutes, start the countdown, optionally enable a finish alert sound, and stop or refresh the page without losing the timer state.

---

## Features

1. **Countdown Timer**  
   - Enter a time in minutes, then click **Start** to begin counting down.
   - The time left (in minutes and seconds) is displayed at the center of the page.

2. **Color-Coded Background**  
   - **Green** when more than 2 minutes remain.  
   - **Yellow** when between 1 and 2 minutes remain.  
   - **Red** when less than 1 minute remains.  
   - **Black** when the countdown reaches zero.

3. **Stop Timer**  
   - Click **Stop** at any time to manually cancel the current countdown.

4. **Optional Sound Alert**  
   - A checkbox (**Enable Sound**) toggles an alarm sound at countdown completion.

5. **Persistent State**  
   - If the page is refreshed mid-countdown, the timer automatically resumes thanks to localStorage (as long as time remains).

6. **Mobile-Friendly**  
   - Responsive font sizes and layout adjustments ensure readability on phones and tablets.

---

## File Overview

- **index.html**:  
  Contains the HTML structure, including the form, checkboxes, audio element, and references to CSS/JS.
- **style.css**:  
  Handles layout, font sizes, and media queries for responsiveness and a clean UI.
- **script.js**:  
  Implements the countdown logic, color changes, localStorage persistence, and optional sound playback.