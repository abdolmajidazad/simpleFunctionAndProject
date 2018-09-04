module.export = {
    mode:"production",
    watch: true,
    entry: "./src/index.js",
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    watchOptions: {
        ignored: /node_modules/
    }
};
console.log("::::",__dirname);
//    "build":"webpack --mode=development --watch --info-verbosity verbose"
// "build":"webpack  --config webpack.config.js"
