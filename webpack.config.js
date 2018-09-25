//entry --> output

const path = require('path'); //node methods
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
    const isProduction = env === "production"; //check for mode
    
    return {
        entry: './src/app.js', //file to be loaded
        output: {
            path: path.join(__dirname, 'public','dist'), //must be absolute
            filename: 'bundle.js'
        },
        module: {
            rules: [{       //set of rules
                loaders: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/, //add css
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]},
        plugins: [new MiniCssExtractPlugin({filename: 'styles.css'})],

        // devtool: "cheap-module-eval-source-map", //point to actual js file, not bundle.js
        devtool: isProduction ? 'source-map' : 'inline-source-map',

        devServer: {
            contentBase: path.join(__dirname, 'public'),    //where to look for public files
            historyApiFallback: true, //fall back to 'index.html' for unknown source
            publicPath: '/dist/'
        }
    }
};
