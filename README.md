# Motkaml Landing Page

منصة متكامل - متجر إلكتروني بدون تعقيد

## Project Structure

```
motkaml-landing/
├── index.html          # Main HTML file with RTL setup
├── assets/
│   ├── css/
│   │   ├── main.css           # Main stylesheet with imports
│   │   └── sections/
│   │       ├── _hero.css      # Hero section styles
│   │       └── _intro.css     # Intro section styles
│   ├── js/
│   │   ├── main.js            # Main JavaScript coordinator
│   │   └── sections/
│   │       ├── hero.js        # Hero section functionality
│   │       └── intro.js       # Intro section functionality
│   └── images/
│       ├── logo.svg           # Main horizontal logo
│       └── logo1.png          # Square logo
└── README.md           # This file
```

## Features

### ✅ Completed Foundation
- **HTML5 Structure**: Semantic HTML with proper Arabic RTL setup
- **Bootstrap 5 RTL**: Full Bootstrap integration with RTL support
- **Modular CSS**: Organized with @import structure and section-specific files
- **Modular JavaScript**: ES6 modules with section-specific functionality
- **Arabic Typography**: Cairo and Tajawal fonts for optimal Arabic text rendering
- **Advanced Animations**: Custom keyframe animations with scroll triggers
- **Interactive Elements**: Hover effects, click animations, and notifications
- **Responsive Design**: Mobile-first approach with proper breakpoints
- **Accessibility**: Focus states, keyboard navigation, and reduced motion support

### 🎨 Design System

#### Colors
- **Primary**: `#105FAA` (Motkaml Blue)
- **Background**: `#FFFFFF` (White)
- **Text Primary**: `#2C3E50` (Dark Blue-Gray)
- **Text Secondary**: `#5D6D7E` (Medium Gray)
- **Accent**: `#E74C3C` (Red)
- **Success**: `#27AE60` (Green)
- **Warning**: `#F39C12` (Orange)
- **Info**: `#3498DB` (Light Blue)

#### Typography
- **Headings**: Cairo font family
- **Body Text**: Tajawal font family
- **RTL Support**: Proper right-to-left text alignment

#### Spacing
- **Section Padding**: 80px vertical (responsive)
- **Container Max Width**: 1200px
- **Border Radius**: 8px standard, 12px large

## Technical Stack

- **HTML5**: Semantic markup with RTL support
- **CSS3**: Modern CSS with variables and flexbox/grid
- **Bootstrap 5 RTL**: Component framework with RTL support
- **JavaScript ES6+**: Modern JavaScript with utilities
- **Google Fonts**: Cairo and Tajawal for Arabic typography
- **Font Awesome**: Icon library

## Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Getting Started

1. **Clone or download** the project files
2. **Open** `index.html` in your browser
3. **Start building** sections step by step

## Development Guidelines

### Adding New Sections
1. Add HTML structure to `index.html`
2. Add corresponding styles to `css/style.css`
3. Add JavaScript functionality to `js/script.js` if needed

### CSS Organization
- Use CSS variables for consistent theming
- Follow the existing section structure
- Add responsive breakpoints for mobile support

### JavaScript Utilities
Available utilities in `window.MotkamlUtils`:
- `addLoadingState()` - Add loading state to buttons
- `showNotification()` - Display notifications
- `validateEmail()` - Email validation
- `validatePhone()` - Phone number validation
- `formatArabicNumber()` - Convert numbers to Arabic numerals
- `apiCall()` - Handle API requests
- `debounce()` - Debounce function calls
- `throttle()` - Throttle function calls

## Next Steps

The foundation is ready for building specific sections:
1. **Header/Navigation** - Logo, menu, language toggle
2. **Hero Section** - Main banner with call-to-action
3. **Features Section** - Platform benefits and features
4. **About Section** - Company information
5. **Services Section** - Available services
6. **Testimonials** - Customer reviews
7. **Contact Section** - Contact form and information
8. **Footer** - Links, social media, copyright

## Notes

- All text is in Arabic with proper RTL layout
- Images are optimized for web use
- CSS is organized with clear sections and comments
- JavaScript includes useful utilities for future development
- Responsive design works on all screen sizes

---

**Platform**: Motkaml - Online Store Without Complexity  
**Language**: Arabic (RTL)  
**Framework**: Bootstrap 5 RTL  
**Status**: Foundation Complete ✅ 