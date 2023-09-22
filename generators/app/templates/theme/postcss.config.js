module.exports = (ctx) => ({
  plugins: {
    autoprefixer: {},
    'postcss-discard-comments': {},
    'postcss-preset-env': { stage: 1 },
    cssnano: ctx.env === 'production' ? {} : false,
  },
});
