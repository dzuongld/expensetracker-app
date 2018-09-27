//entry --> output

const path = require('path'); //node methods
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack')

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({
        path: '.env.test'
    });
} else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({
        path: '.env.development'
    });
}

module.exports = (env) => {
    const isProduction = env === "production"; //check for mode

    return {
        entry: './src/app.js', //file to be loaded
        output: {
            path: path.join(__dirname, 'public', 'dist'), //must be absolute
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
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({ filename: 'styles.css' }),
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
            })
        ],

        // devtool: "cheap-module-eval-source-map", //point to actual js file, not bundle.js
        devtool: isProduction ? 'source-map' : 'inline-source-map',

        devServer: {
            contentBase: path.join(__dirname, 'public'),    //where to look for public files
            historyApiFallback: true, //fall back to 'index.html' for unknown source
            publicPath: '/dist/'
        }
    }
};
