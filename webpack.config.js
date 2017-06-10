var webpack = require('webpack');

module.exports = {
    entry: "./src/main.js",
    output: {
        path: __dirname + '/public/',
        publicPath: "public/",
        filename: "bundle.js"
    },
    plugins: [
        new webpack.ProvidePlugin({
            _: 'underscore'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ],
    resolve: {
        extensions: ['.js', '.json']
    },
    module: {
        loaders: [
            { test: /\.(scss|sass)$/, loader: "style-loader!css-loader!autoprefixer-loader!sass-loader"},
            { test: /\.html$/, loader: "html-loader" },
            { test: /\.json$/, loader: "json-loader" }
        ]
    },
}