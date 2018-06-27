//entry --> output

const path = require('path'); //node methods

module.exports = {
    entry: './src/app.js', //file to be loaded
    output: {
        path: path.join(__dirname,'public'), //must be absolute
        filename: 'bundle.js'
    },
    module: {
        rules: [{       //set of rules
            loaders: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            test: /\.s?css$/, //add css
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    devtool: "cheap-module-eval-source-map", //point to actual js file, not bundle.js
    devServer: {
        contentBase: path.join(__dirname,'public'),    //where to look for public files
        historyApiFallback: true //fall back to 'index.html' for unknown source
    }
};

