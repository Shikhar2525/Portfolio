module.exports = {
  // ...other config...
  module: {
    rules: [
      {
        test: /\.(pdf)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
};
