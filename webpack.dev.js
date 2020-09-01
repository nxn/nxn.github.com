const path = require('path');
const HtmlWebpackPlugin       = require('html-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');

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
            // Document loader (file)
            { test: /\.(pdf|otf)$/
            , loader: 'file-loader'
            , options:
                { outputPath: 'assets/documents'
                , name: '[name].[ext]'
                }
            },
            // Image loader (file)
            { test: /\.(png|svg|jpg|webp)$/
            , loader: 'file-loader'
            , options: 
                { outputPath: 'assets/images'
                }
            },
            // Font loader(file)
            { test: /\.(woff|woff2|eot|ttf|otf)$/
            , loader: 'file-loader'
            , options: 
                { outputPath: 'assets/fonts'
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