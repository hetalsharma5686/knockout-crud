const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    module: {
        rules: [
            { 
                test: /\.html$/, 
                use: [ "html-loader" ] 
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader" 
                }
            }
        ]
    },
    externals: {
        knockout: 'ko'
    }
}