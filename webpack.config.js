const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js', // Point d'entrée de votre application
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
