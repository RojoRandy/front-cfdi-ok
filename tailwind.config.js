/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    fontFamily: {
      'sans': ['OpenSans', 'Montserrat']
    },
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/src/assets/images/hero.png')",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        disabled: {
          DEFAULT:  "var(--disabled)",
          secondary: "var(--disabled-secondary)"
        },
        'theme-interface': {
          DEFAULT: "var(--primary-interface)",
          foreground: "var(--primary-interface-foreground)",
        },
        'theme-interface-secondary': {
          DEFAULT: "var(--secondary-interface)",
          foreground: "var(--secondary-interface-foreground)"
        },
        'theme-text': {
          DEFAULT: "var(--primary-foreground)",
          secondary: "var(--secondary-foreground)",
          paragraph: "var(--paragraph-foreground)",
        },
        'theme-button': {
          DEFAULT: "var(--primary-button)",
          foreground: "var(--primary-button-foreground)",
          hover: "var(--primary-button-hover)",
          ring: "var(--primary-button-ring)",
        },
        'theme-button-secondary': {
          DEFAULT: "var(--secondary-button)",
          foreground: "var(--secondary-button-foreground)",
          hover: "var(--secondary-button-hover)",
          ring: "var(--secondary-button-ring)",
        },
        'theme-icons': {
          DEFAULT: "var(--primary-icon)",
          secondary: "var(secondary-icon)"
        },
        'theme-success': {
          DEFAULT: "var(--success)",
        },
        'theme-destructive': {
          DEFAULT: "var(--destructive)"
        }
        
      }
    }
  },
  plugins: [],
};
