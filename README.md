# Favourite Design Studio Website

A responsive website for "Favourite" design studio by Tetsuro Shimura, featuring interactive color controls, curved text overlays, and adaptive typography.

![Favourite Website](https://img.shields.io/badge/Next.js-15.3.4-black)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## 🎨 Features

- **Dual Color Picker System**: Interactive color controls for background and SVG stroke colors
- **Responsive Design**: Optimized layouts for mobile and desktop with different positioning strategies
- **Curved Text Overlay**: Dynamic Japanese text following custom SVG paths
- **Dynamic Typography**: Font scaling based on viewport width for desktop (1440px baseline)
- **Custom Artwork**: SVG illustrations with real-time color manipulation
- **Custom Typography**: Monument Grotesk font family integration
- **Modular Components**: Reusable color pickers and text components

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd favourite-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Layout Structure

### Desktop Layout
- **Fixed Header**: "Favourite" title in top-right
- **Centered Artwork**: SVG illustration with curved text overlay
- **Fixed Contact**: Bottom-left positioning with email
- **Fixed Info Panel**: Bottom-right with tags, works, and social links
- **Color Controls**: Top-left corner with dual color pickers

### Mobile Layout
- **Stacked Layout**: Vertical arrangement optimized for mobile
- **Responsive Typography**: Smaller font sizes and adjusted spacing
- **Touch-Friendly**: Larger interactive elements
- **Color Controls**: Top-right corner positioning

## 🎨 Color System

### Background Color Picker
- Interactive color selection for page background
- Preset color swatches for quick selection
- Real-time preview with smooth transitions

### SVG Color Picker
- Dynamic stroke color control for all SVG paths
- Targets both main artwork and text path elements
- Synchronized color updates across all SVG elements

## 🔧 Technical Implementation

### Component Architecture
```
app/
├── components/
│   ├── ColorPicker.tsx        # Background color control
│   ├── SVGColorPicker.tsx     # SVG stroke color control
│   ├── CurvedText.tsx         # Desktop curved text overlay
│   └── CurvedTextMobile.tsx   # Mobile curved text overlay
├── globals.css                # Global styles and custom properties
├── layout.tsx                 # Root layout with font configuration
└── page.tsx                   # Main page component
```

### Key Technologies
- **Next.js 15.3.4**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first styling with custom configuration
- **Custom Fonts**: Monument Grotesk font family
- **SVG Manipulation**: Dynamic stroke color updates via DOM queries
- **Responsive Design**: Mobile-first approach with desktop enhancements

## 📊 Typography Scaling

Desktop typography uses viewport-based scaling with 1440px as the baseline:

- **Favourite Header**: `clamp(60px, 5vw, 120px)`
- **Contact Text**: `clamp(40px, 3.47vw, 83px)`
- **Section Titles**: `clamp(20px, 1.67vw, 40px)`
- **Body Text**: `clamp(16px, 1.25vw, 30px)`

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Automatic Deployment**
   - Push to main branch triggers automatic deployment
   - Environment variables can be configured in Vercel dashboard

### GitHub Pages

1. **Add deployment script to package.json**
   ```json
   {
     "scripts": {
       "export": "next build && next export"
     }
   }
   ```

2. **Configure next.config.ts for static export**
   ```typescript
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   }
   ```

### Manual Build

```bash
npm run build    # Build the application
npm run start    # Start production server
```

## 📁 Project Structure

```
favourite-site/
├── app/
│   ├── components/          # Reusable React components
│   ├── favicon.ico         # Site favicon
│   ├── globals.css         # Global styles and CSS variables
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Main page component
├── public/
│   ├── human01.svg         # Desktop artwork
│   ├── human01_sp.svg      # Mobile artwork
│   ├── human_text01.svg    # Desktop text path
│   ├── human_text01_sp.svg # Mobile text path
│   ├── monument-grotesk-*.woff # Custom font files
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## 🎯 Key Features

### Interactive Color Controls
- Two-stage interaction: small circle button expands to full color picker
- Click-outside-to-close functionality
- Real-time color preview
- Preset color swatches for quick selection

### Responsive Typography
- Mobile: Fixed font sizes optimized for readability
- Desktop: Viewport-based scaling maintaining proportions
- Custom font loading with proper fallbacks

### SVG Integration
- Dynamic color manipulation via DOM queries
- Separate artwork files for mobile/desktop
- Curved text following custom SVG paths
- Real-time stroke color updates

## 📝 Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint code analysis

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is private and proprietary to Favourite Design Studio.

## 👨‍💻 Author

**Tetsuro Shimura**  
Design Studio: Favourite  
Email: tetsuro@favouriteforalongtime.info  
Website: [https://badbadnotgood.design/](https://badbadnotgood.design/)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS