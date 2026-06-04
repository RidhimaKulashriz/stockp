process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

console.log("1: Requiring paths...");
const paths = require('react-scripts/config/paths');
console.log("2: Requiring modules...");
const modules = require('react-scripts/config/modules');
console.log("3: Requiring env...");
const env = require('react-scripts/config/env');
console.log("4: Requiring createEnvironmentHash...");
const createEnvironmentHash = require('react-scripts/config/webpack/persistentCache/createEnvironmentHash');
console.log("5: Done!");
