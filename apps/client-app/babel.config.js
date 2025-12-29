module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          'react-compiler': {
            sources: (filename) => {
              // Exclude gifted-charts from React Compiler
              if (filename.includes('gifted-charts')) {
                return false;
              }
              // Only compile app source files
              return filename.includes('apps/client-app');
            },
          },
        },
      ],
    ],
  };
};
