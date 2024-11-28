// const { merge } = require('webpack-merge')
// const commonConfiguration = require('./webpack.common.js')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// module.exports = merge(
//     commonConfiguration,
//     {
//         mode: 'production',
//         devtool: false,
//         plugins:
//         [
//             new CleanWebpackPlugin()
//         ]
//     }
// )


const { merge } = require('webpack-merge');
const path = require('path');
const commonConfiguration = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin'); // Minimización de JS
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // Minimización de CSS

module.exports = merge(commonConfiguration, {
    mode: 'production',
    devtool: false, // Deshabilita los sourcemaps para producción
    output: {
        path: path.resolve(__dirname, '../dist'), // Carpeta de salida
        filename: '[name].[contenthash].js', // Nombres de archivo con hash para cacheo
        publicPath: '/', // Asegura que los recursos se sirvan correctamente
    },
    optimization: {
        minimize: true, // Habilita la minimización
        minimizer: [
            new TerserPlugin({ // Minimiza JavaScript
                extractComments: false, // Elimina comentarios en producción
            }),
            new CssMinimizerPlugin(), // Minimiza CSS
        ],
        splitChunks: { // Divide el código en fragmentos más pequeños
            chunks: 'all',
        },
        runtimeChunk: 'single', // Mejora el manejo de módulos en producción
    },
    plugins: [
        new CleanWebpackPlugin(), // Limpia la carpeta de salida antes de generar nuevos archivos
    ],
});
