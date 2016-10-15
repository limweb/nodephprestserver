var path = require('path');
var webpack = require('webpack');
 
module.exports = {
 

    // ให้ webpack เริ่มรวมโค้ดที่ไฟล์ client.js
    entry: {
        index:'./src/client/index.js',
        all:'./src/all.js'
    },
 
    // แล้วตั้งชื่อไฟล์ output ว่า bundle.js
    output: {
        path: path.join(__dirname,'../public/dist'),
        filename: "[name].bundle.js"
    },
 
    // อ่านไฟล์นามสกุล .js, .jsx ด้วย Babel
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
};