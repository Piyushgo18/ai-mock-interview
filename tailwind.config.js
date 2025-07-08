/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'fade-in-right': 'fade-in-right 0.8s ease-out 0.2s forwards',
        'slide-in-left': 'slide-in-left 0.6s ease-out 0.8s forwards',
        'slide-in-right': 'slide-in-right 0.6s ease-out 0.9s forwards',
        'bounce-in': 'bounce-in 0.6s ease-out 0.3s forwards',
        'float': 'float 3s ease-in-out infinite',
        'blob': 'blob 7s ease-in-out infinite',
        'counter': 'counter 0.8s ease-out forwards',
        'star-twinkle': 'star-twinkle 2s ease-in-out infinite',
        'gradient': 'gradient 3s ease infinite',
      },
      keyframes: {
        'fade-in-up': {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in-right': {
          'from': {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'slide-in-left': {
          'from': {
            opacity: '0',
            transform: 'translateX(-30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'slide-in-right': {
          'from': {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'bounce-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.3)',
          },
          '50%': {
            opacity: '1',
            transform: 'scale(1.05)',
          },
          '70%': {
            transform: 'scale(0.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        'blob': {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        'counter': {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'star-twinkle': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.7',
            transform: 'scale(0.95)',
          },
        },
        'gradient': {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
      },
      backgroundSize: {
        '400%': '400%',
      },
      boxShadow: {
        '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  safelist: [
    // Dynamic color classes for features
    'bg-blue-50', 'bg-blue-100', 'bg-blue-600',
    'bg-green-50', 'bg-green-100', 'bg-green-600',
    'bg-purple-50', 'bg-purple-100', 'bg-purple-600',
    'bg-orange-50', 'bg-orange-100', 'bg-orange-600',
    'bg-indigo-50', 'bg-indigo-100', 'bg-indigo-600',
    'bg-pink-50', 'bg-pink-100', 'bg-pink-600',
    'from-blue-50', 'to-blue-100', 'from-blue-500', 'to-blue-600',
    'from-green-50', 'to-green-100', 'from-green-500', 'to-green-600',
    'from-purple-50', 'to-purple-100', 'from-purple-500', 'to-purple-600',
    'from-orange-50', 'to-orange-100', 'from-orange-500', 'to-orange-600',
    'from-indigo-50', 'to-indigo-100', 'from-indigo-500', 'to-indigo-600',
    'from-pink-50', 'to-pink-100', 'from-pink-500', 'to-pink-600',
  ],
  plugins: [],
};
