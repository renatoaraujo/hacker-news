const Encore = require('@symfony/webpack-encore');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');

Encore
    .setOutputPath('web/build/')
    .setPublicPath('/build')

    .addEntry('app', './assets/js/App.js')
    .addEntry('top', './assets/js/TopStories.js')
    .addEntry('new', './assets/js/NewStories.js')
    .addEntry('comments', './assets/js/Comments.js')

    .enableSassLoader()

    .enableReactPreset()

    .disableSingleRuntimeChunk()

    .cleanupOutputBeforeBuild()

    .enableSourceMaps(!Encore.isProduction())

    .enableVersioning(Encore.isProduction())

    .addPlugin(new CopyWebpackPlugin([{
        from: 'assets/img/',
        to: 'img/'
    }]))

    .addPlugin(new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }))
;

module.exports = Encore.getWebpackConfig();
