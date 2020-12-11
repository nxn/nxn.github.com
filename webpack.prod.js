const path = require('path');

const { CleanWebpackPlugin }    = require('clean-webpack-plugin');
const CopyPlugin                = require('copy-webpack-plugin');
const HtmlWebpackPlugin         = require('html-webpack-plugin');
const MiniCssExtractPlugin      = require('mini-css-extract-plugin');
const CssMinimizerPlugin        = require('css-minimizer-webpack-plugin');
const TerserPlugin              = require('terser-webpack-plugin');

const outputPath = path.resolve(__dirname, 'dist');
const downloads = /downloads[\/\\][\S]+\.[\S]+$/i;

module.exports = {
    mode: 'production',



    entry:
        { 'nxn.io': './src/nxn.io/nxn.io.js'
        , 'resume/resume': './src/resume/resume.js'
        },
    
    target: 'web',

    output: 
        { filename: '[name].[contenthash].js'
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
            , exclude: [ downloads ]
            , loader: 'file-loader'
            , options: 
                { outputPath: 'assets/images'
                }
            },
            // Fonts (file-loader)
            { test: /\.(woff|woff2|eot|ttf|otf)$/i
            , exclude: [ downloads ]
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
                { from: 'src/site-root'
                , to: outputPath
                },
                { from: 'src/dzi-data'
                , to: 'assets/dzi-data' 
                }
            ]})
        , new MiniCssExtractPlugin(
            { filename: "[name].[contenthash].css"
            , chunkFilename: "[id].[contenthash].css"
            })
        , new HtmlWebpackPlugin(
            { template: 'src/nxn.io/nxn.io.ejs'
            , filename: 'index.html'
            , inject: true
            , chunks: ['nxn.io']
            })
        , new HtmlWebpackPlugin(
            { template: 'src/nxn.io/404.ejs'
            , filename: '404.html'
            , inject: true
            , chunks: ['nxn.io']
            })
        , new HtmlWebpackPlugin(
            { template: 'src/resume/resume.ejs'
            , filename: 'resume/index.html'
            , inject: true
            , chunks: ['resume/resume']
            })
        ],

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true
            }),
            new CssMinimizerPlugin()
        ]
    }
};