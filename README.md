# Ragnarok Online MVP Timer

An application to track and manage MVPs in Ragnarok Online.

Download the latest version for Windows [here](https://github.com/TekiDev42/ragnarok-mvp-tracker/releases/)

## Screenshots

[![Image 1](./images-preview/mini-1.png)](./images-preview/1.png)
[![Image 2](./images-preview/mini-2.png)](./images-preview/2.png)
[![Image 3](./images-preview/mini-3.png)](./images-preview/3.png)
[![Image 4](./images-preview/mini-4.png)](./images-preview/4.png)
[![Image 5](./images-preview/mini-5.png)](./images-preview/5.png)

## Features

- **MVP Tracking**
  - Precise timer for each MVP
  - Sound notification when timer ends
  - Tomb location on map
  - Display of normal drops and MVP drops
  - Display of race and element
  - Customizable drop rates
  - Share timers with connected members of the same party

- **Favorites Management**
  - Mark your favorite MVPs

## Usage

1. **MVP Timer**
   - Select an MVP from the list
   - Start the timer after killing the MVP
   - Receive a sound notification when the MVP can respawn
   - View the tomb location on the map

2. **Drops**
   - View the complete list of possible drops
   - See drop rates
   - Customize rates according to your server

3. **Favorites**
   - Add MVPs to your favorites
   - Quickly access your favorite MVPs from the dedicated tab (TODO)

3. **Stats**
   - Race and element quickly visible
   - View statistics

## Installation
1. **Download**
   - Clone the repository: `git clone https://github.com/your-name/ro-mvp-timer.git`
   - Or download the ZIP directly from GitHub

2. **Install dependencies**
   ```bash
   cd ragnarok-mvp-timer
   npm install / bun install / pnpm install
   
   ```

3. **Launch**
   ```bash
   npm run dev / bun run dev / pnpm run dev
   ```
   The application will be accessible at `http://localhost:3000`

4. **Build (optional)**
   To create a production version:
   ```bash
   npm run build / bun run build / pnpm run build
   ```
5. **ENV**
   Create a .env with your SUPABASE keys:
   ```
   VITE_SUPABASE_URL=https://example.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```


## Contributors
- [MrKitey](https://github.com/TekiDev42)