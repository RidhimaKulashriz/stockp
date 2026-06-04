console.log("1: Resolving react-refresh/runtime...");
require.resolve('react-refresh/runtime');

console.log("2: Resolving @pmmmwh/react-refresh-webpack-plugin...");
require.resolve('@pmmmwh/react-refresh-webpack-plugin');

console.log("3: Resolving babel-preset-react-app...");
const babelRuntimeEntry = require.resolve('babel-preset-react-app');

console.log("4: Resolving assertThisInitialized...");
require.resolve(
  '@babel/runtime/helpers/esm/assertThisInitialized',
  { paths: [babelRuntimeEntry] }
);

console.log("5: Resolving regenerator...");
require.resolve('@babel/runtime/regenerator', {
  paths: [babelRuntimeEntry],
});

console.log("6: Done!");
