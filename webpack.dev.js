const path = require('path');

const HtmlWebpackPlugin     = require('html-webpack-plugin');
const {CleanWebpackPlugin}  = require('clean-webpack-plugin');
const CopyPlugin            = require('copy-webpack-plugin');

const downloads = /downloads\/[\S]+\.[\S]+$/;
const favicon = /favicon\/[\S]+\.(png|svg|ico|xml|webmanifest)$/;

module.exports = {
    entry:
        { 'nxn.io': './src/nxn.io/nxn.io.js'
        , 'resume/resume': './src/resume/resume.js'
        },
    mode: 'development',
    target: 'web',

    output: 
        { filename: '[name].js'
        , path: path.resolve(__dirname, 'dist')
        , publicPath: '/'
        },

    module: {
        rules: [
            // CSS/Stylesheet loader
            { test: /\.css$/
            , use: [ 'style-loader', 'css-loader' ]
            },
            // EJS/HTML (ejs-loader)
            { test: /\.ejs$/
            , use: 
                [ { loader: 'ejs-loader', options: { variable: 'data' } }
                , 'extract-loader'
                , 'html-loader'
                ]
            },
            // Images (file-loader)
            { test: /\.(png|svg|jpg|webp)$/
            , exclude: [ downloads, favicon ]
            , loader: 'file-loader'
            , options: 
                { outputPath: 'assets/images'
                }
            },
            // Fonts (file-loader)
            { test: /\.(woff|woff2|eot|ttf|otf)$/
            , exclude: [ downloads, favicon ]
            , loader: 'file-loader'
            , options: 
                { outputPath: 'assets/fonts'
                }
            },
            // Downloads (file-loader)
            { test: downloads
            , loader: 'file-loader'
            , options:
                { outputPath: 'assets/downloads'
                , name: '[name].[ext]'
                }
            },
            // Favicon (file-loader)
            { test: favicon
            , loader: 'file-loader'
            , options:
                { outputPath: '/'
                , name: '[name].[ext]'
                }
            }
        ]
    },

    resolve: {
        alias: 
            { '@shared': path.resolve(__dirname, 'src/shared/')
            }
    },

    plugins: 
        [ new CleanWebpackPlugin()
        , new CopyPlugin(
            { patterns: [ 
                { from: 'src/dzi-data'
                , to: 'assets/dzi-data' 
                },
                { from: 'src/favicon' }
            ]})
        , new HtmlWebpackPlugin(
            { template: 'src/nxn.io/index.ejs'
            , filename: 'index.html'
            , inject: "head"
            , chunks: ['nxn.io']
            })
        , new HtmlWebpackPlugin(
            { template: 'src/resume/index.ejs'
            , filename: 'resume/index.html'
            , inject: "head"
            , chunks: ['resume/resume']
            })
        ]
};