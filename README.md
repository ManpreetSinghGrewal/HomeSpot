# 🏠 HomeSpot - Punjab's Premier Rental Platform

> **A modern React-based rental property platform designed specifically for Punjab, India**

HomeSpot is a comprehensive rental property platform that connects tenants with landlords across Punjab's major cities including Ludhiana, Amritsar, Jalandhar, and Mohali. Built with React and modern web technologies, it provides a seamless experience for finding and managing rental properties.

## ✨ Features

### 🏡 Property Management
- **Verified Listings** - Every property is carefully vetted for quality and accuracy
- **Virtual Tours** - High-quality images and detailed property information
- **Smart Search** - Filter properties by location, price, bedrooms, and amenities
- **Favorites System** - Save preferred properties for easy access

### 👤 User Experience
- **User Authentication** - Secure login system with role-based access
- **Profile Management** - Personalized user profiles and preferences
- **24/7 Support** - Dedicated customer support team
- **Mobile Responsive** - Optimized for all devices and screen sizes

### 🔒 Security & Trust
- **Secure Messaging** - Direct communication between tenants and landlords
- **Data Protection** - Advanced security measures for user data
- **Verified Users** - Trusted landlord verification system
- **Safe Payments** - Secure transaction processing

## 🚀 Tech Stack

- **Frontend**: React 18.2.0 with Vite
- **Routing**: React Router DOM 7.9.4
- **Styling**: CSS3 with modern features
- **Icons**: Font Awesome 6.4.0
- **State Management**: React Context API
- **Build Tool**: Vite 5.0.0

## 📁 Project Structure

```
HomeSpot/
├── public/
│   └── logo.png                 # Company logo
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── Header.jsx          # Navigation header
│   │   ├── Footer.jsx          # Site footer
│   │   ├── Hero.jsx            # Landing page hero section
│   │   ├── PropertyCard.jsx    # Property listing cards
│   │   ├── FeaturedListings.jsx # Featured properties
│   │   ├── InfoBar.jsx         # Information bar
│   │   ├── Loading.jsx         # Loading component
│   │   └── ErrorBoundary.jsx   # Error handling
│   ├── pages/                   # Page components
│   │   ├── About.jsx           # About us page
│   │   ├── Services.jsx        # Services page
│   │   ├── FAQ.jsx             # Frequently asked questions
│   │   └── Contact.jsx         # Contact information
│   ├── contexts/
│   │   └── UserContext.jsx     # User state management
│   ├── data/
│   │   └── properties.js       # Property data
│   ├── App.jsx                 # Main app component
│   ├── router.jsx              # React Router configuration
│   ├── index.jsx               # Application entry point
│   └── index.css               # Global styles
├── index.html                  # HTML template
├── package.json                # Dependencies and scripts
└── vite.config.js             # Vite configuration
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/HomeSpot.git
   cd HomeSpot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run lint:fix # Fix ESLint issues
```

## 🎯 Key Pages

- **Home** (`/`) - Landing page with featured properties
- **About** (`/about`) - Company information and team
- **Services** (`/services`) - Platform services and features
- **FAQ** (`/faq`) - Frequently asked questions
- **Contact** (`/contact`) - Contact information and support

## 🏙️ Coverage Areas

HomeSpot serves the following cities in Punjab:
- **Ludhiana** - Industrial hub with modern apartments
- **Amritsar** - Cultural center with heritage properties
- **Jalandhar** - Educational city with family homes
- **Mohali** - IT hub with luxury villas and apartments

## 👥 Team

- **Mannat Dhiman** - Lead Property Agent
- **Manprabhnoor Kaur** - Marketing Director
- **Manpreet Singh** - Client Relations
- **Manraj Singh** - Lead Developer

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_URL=your_api_url_here
VITE_APP_NAME=HomeSpot
```

### Customization
- Update `src/data/properties.js` to modify property listings
- Modify `src/index.css` for global styling changes
- Edit component files in `src/components/` for UI modifications

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and inquiries:
- **Email**: support@homespot.in
- **Phone**: +91 98765-43210
- **Website**: [HomeSpot](http://localhost:5173)

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

---

**Made with ❤️ for Punjab's rental community**