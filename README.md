# Interactive A/B Test Line Chart

This project visualizes A/B test statistics using an interactive Line Chart. It allows users to analyze Conversion Rates across different variations over time.

## 🚀 Demo
(https://andrey27bn.github.io/ab-test-chart/)

## 🛠 Tech Stack
- **React** (v18)
- **TypeScript**
- **Recharts** (Visualization library)
- **Vite** (Build tool)
- **CSS Modules** (Styling)

## ✨ Features

### Implemented Requirements
- **Conversion Rate Calculation:** `(conversions / visits) * 100`.
- **Interactive Line Chart:** Displays daily conversion rates for all variations.
- **Dynamic Axes:** X and Y axes automatically adapt to the visible data range.
- **Controls:**
  - **Variation Selector:** Toggle individual lines. Logic ensures at least one variation is always selected.
  - **Day/Week Selector:** Aggregates data by week or shows daily granular stats.
- **Hover Effects:** Vertical crosshair and detailed tooltip showing percentages for all active variations.
- **Responsive Layout:** Optimized for screens between 671px and 1300px.

### Bonus Features
- **Smooth Lines:** Used `type="monotone"` for better visual perception.
- **Null Value Handling:** Handled cases where variations (like C) stop mid-experiment using `connectNulls`.

## ⚙️ Local Setup 

1. **Clone the repository**
   ```bash
   git clone <repository_url>
   cd ab-test-chart
   ```

2. **Install dependencies**
   ```bash
   npm install
   # или yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
  The application will be accessible at `http://localhost:5173` or similar.

4. **Build for production**
   ```bash
   npm run build
   ```

## 🚢 Deployment

The project is configured for deployment using Vite and GitHub Pages.

To create a production build and deploy:

1.  **Build the project:**
    ```bash
    npm run build
    ```
2.  **Deploy using `gh-pages` (if configured in `package.json`) or manually:**
    
    ```bash
    npm run deploy
    ```

The live demo is available at: (https://andrey27bn.github.io/ab-test-chart/)
