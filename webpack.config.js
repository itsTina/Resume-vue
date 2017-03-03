/**
 * Created by mating on 2017/2/23.
 */
var webpack= require('webpack');
module.exports={
    entry:"./src/app.js",
    output:{
        path:'./dist/',
        filename:"build.js"
    },
    module:{
        rules:[
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node-modules/,
                query: {
                    presets: ['es2015']
                }
            }

        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
}