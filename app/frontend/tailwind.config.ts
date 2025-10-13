import type {Config} from 'tailwindcss';

const config: Config = {
  darkMode: ['class'], // active le mode sombre basé sur `.dark`
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './node_modules/@shadcn/ui/dist/**/*.{ts,tsx}', // compatibilité Shadcn
  ],
  theme: {
    extend: {
      colors: {
        // 🌈 Couleurs principales liées aux variables CSS
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',

        secondary: 'var(--color-secondary)',
        'secondary-hover': 'var(--color-secondary-hover)',

        accent: 'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',

        // 🎨 Couleurs de fond et texte
        bg: 'var(--color-bg)',
        'bg-alt': 'var(--color-bg-alt)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        'text-light': 'var(--color-text-light)',
      },

      // 🖋️ Typographie
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        ui: ['var(--font-ui)', 'sans-serif'],
      },

      // 🔲 Radius et ombres
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },

      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },

      // ⚡ Transitions
      transitionProperty: {
        base: 'var(--transition-base)',
      },
    },
  },
  plugins: [],
};

export default config;
