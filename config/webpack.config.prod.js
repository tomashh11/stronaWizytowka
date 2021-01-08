const path = require('path');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: 'js/[name]-[contenthash].js',
        path: path.resolve(__dirname, '../', 'build')
    },
    module: {
        rules: [{
                test: /\.txt$/,
                use: 'raw-loader'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')],
                        }
                    }
                ]
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')],
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpg|png|svg|gif|jpeg)$/,
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name][contenthash:6].[ext]',
                            outputPath: 'images',
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                quality: 70,
                                progressive: true
                            }
                        }
                    }
                ]

            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "src/index.html",
            minify: {
                collapseWhitespace: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash].css'
        }),
        new CopyPlugin(
            [{
                from: 'public/images',
                to: 'images'
            }]
        )
    ]
}