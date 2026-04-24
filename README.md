# Orion Pro CMS

Orion Pro is a modern, dynamic CMS built with **Next.js 15**, **MySQL**, and **Tailwind CSS**. It features a robust theme system, plugin architecture, and IoT integration capabilities.

## Recent Updates (March 2026)

### 1. New Industrial & High-Tech Themes
Expanded the ecosystem with specialized themes for industrial applications:
- **Orion Load Scanner**: Precision mining material volume calculation with LiDAR visualization.
- **Orion Livecam**: Advanced surveillance system with real-time encrypted video feeds.
- **Industrial Automation**: Comprehensive dashboard for Industry 4.0 production monitoring and OEE analytics.
- **Machine Monitor**: Real-time health diagnostics for industrial equipment (CNC, Hydraulic Press, etc.).
- **Orion Smarthome & Smartpark**: Integrated solutions for intelligent living and space management.

### 2. Enhanced Weather Station Integration
- **BMKG JSON API**: Upgraded to use the high-resolution JSON API for location-specific 3-day forecasts (every 3 hours).
- **Search Capability**: Users can now search for specific villages/cities to get granular environmental data.
- **Interactive Map**: Improved Highcharts Map integration with local topojson fallbacks.

### 3. Custom Development Portal
- **Direct Ordering**: New `/custom-development` route featuring a comprehensive request form for custom digital solutions.
- **Ecosystem Showcase**: Updated landing page displaying all 13+ thematic solutions with professional industrial visuals.

### 4. Core System Improvements
- **Robust Data Fetching**: Implemented defensive coding patterns with timeouts and try-catch blocks for database and API stability.
- **Theme Switcher**: Improved dynamic theme resolution in `app/page.tsx` supporting seamless transitions between 13+ themes.
- **Asset Localization**: Moved critical external assets (topologies, industrial images) to local storage to prevent CDN-related failures.

## Features

- **Dynamic Theme System**: Switch frontend themes instantly via Admin Panel (DB-driven).
- **Plugin Architecture**: Enable/Disable features like Smart Farm IoT via database.
- **Role-Based Access**: Admin and User roles with capability management.
- **Next.js Server Actions**: Secure and efficient data mutations.

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/diskonnekted/Orion-Pro-CMS.git
    cd Orion-Pro-CMS
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure Database:
    - Update `lib/db.ts` with your MySQL credentials (use `127.0.0.1` for XAMPP stability).
    - Import the `orion_pro.sql` schema to your MySQL server.

4.  Run Development Server:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000).

## Configuration

- **Active Theme**: Change the `active_theme` value in `orion_options` table (or via Admin Panel).
- **IoT Devices**: Manage devices at `/admin/iot`.

## Contribution

Feel free to submit issues and pull requests.

## License

[MIT](LICENSE)
