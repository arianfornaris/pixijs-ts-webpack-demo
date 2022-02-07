const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
    return ({

        stats: 'minimal', // Keep console output easy to read.

        entry: './src/index.ts', // Your program entry point\

        // Your build destination
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: "[name]-[contenthash].bundle.js",
        },

        // Config for your testing server
        devServer: {
            compress: true,
            static: false,
            client: {
                logging: "warn",
                overlay: {
                    errors: true,
                    warnings: false,
                },
                progress: true,
            }
        },

        // Web games are bigger than pages, disable the warnings that our game is too big.
        performance: { hints: false },

        // Enable sourcemaps while debugging
        devtool: argv.mode === 'development' ? 'eval-source-map' : undefined,

        // Minify the code when making a final build
        optimization: {
            minimize: argv.mode === 'production',
            minimizer: [new TerserPlugin({
                terserOptions: {
                    ecma: 6,
                    compress: { drop_console: true },
                    output: { comments: false, beautify: false },
                },
            })],
            splitChunks: {
                chunks: "all",
                cacheGroups: {
                    defaultVendors: {
                        name: "vendors",
                        test: /[\\/]node_modules[\\/]/,
                        reuseExistingChunk: true,
                    }
                }
            }
        },

        // Explain webpack how to do Typescript
        module: {
            rules: [
                {
                    test: /\.ts(x)?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
            ]
        },
        resolve: {
            extensions: [
                '.tsx',
                '.ts',
                '.js'
            ]
        },

        plugins: [
            // Make an index.html from the template
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                hash: true,
                minify: false
            })
        ]
    });
}