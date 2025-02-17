const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js', // Указываем точку входа
    output: {
        path: path.resolve(__dirname, './build'), // Абсолютный путь к директории сборки
        filename: 'bundle.[contenthash].js', // Имя файла бандла
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/, // обрабатываем все файлы с расширением .js
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    devtool: 'source-map', // Генерация source-maps
    plugins: [
        new CleanWebpackPlugin(), // Очистка директории сборки перед новой сборкой
        new CopyWebpackPlugin({
            patterns: [
                { 
                    from: 'public', 
                    to: 'build',
                    globOptions: {
                        ignore: ['*.html'], // Исключаем все html-файлы из копирования
                    },
                },
            ],
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html', // Укажите путь к вашему шаблону
            filename: 'index.html', // Имя выходного файла
        }),
    ],
};
