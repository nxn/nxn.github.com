const path = require('path');

const { CleanWebpackPlugin }    = require('clean-webpack-plugin');
const HtmlWebpackPlugin         = require('html-webpack-plugin');
const MiniCssExtractPlugin      = require('mini-css-extract-plugin');
const CopyPlugin                = require('copy-webpack-plugin');



const outputPath = path.resolve(__dirname, 'dist');
const downloads = /downloads[\/\\][\S]+\.[\S]+$/i;
const favicon = /favicon[\/\\][\S]+\.(png|svg|ico|xml|webmanifest)$/i;

module.exports = {
    entry:
        { 'nxn.io': './src/nxn.io/nxn.io.js'
        , 'resume/resume': './src/resume/resume.js'
        },
    mode: 'development',
    target: 'web',

    output: 
        { filename: '[name].[hash:20].js'
        , path: outputPath
        , publicPath: '/'
        },

    module: {
        rules: [
            // CSS/Stylesheet loader
            { test: /\.css$/i
            , use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            // EJS/HTML (ejs-loader)
            { test: /\.ejs$/i
            , use: 
                [ { loader: 'ejs-loader', options: { variable: 'data' } }
                , 'extract-loader'
                , 'html-loader'
                ]
            },
            // Images (file-loader)
            { test: /\.(png|svg|jpg|webp)$/i
            , exclude: [ downloads, favicon ]
            , loader: 'file-loader'
            , options: 
                { outputPath: 'assets/images'
                }
            },
            // Fonts (file-loader)
            { test: /\.(woff|woff2|eot|ttf|otf)$/i
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
                { outputPath: 'downloads'
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
                { from: 'src/favicon'
                , to: outputPath
                },
                { from: 'CNAME'
                , to: outputPath
                }
            ]})
        , new MiniCssExtractPlugin(
            { filename: "[name].[contenthash].css"
            , chunkFilename: "[id].[contenthash].css"
            })
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