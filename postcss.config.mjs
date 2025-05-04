export default {
  plugins: {
    '@tailwindcss/postcss': {
      config: './tailwind.config.mjs'
    },
    'autoprefixer': {},
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true,
      },
    },
  },
}; 