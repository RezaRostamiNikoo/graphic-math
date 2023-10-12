const path = require("path");

const libraryName = "graphic-math"

/** @type {import("webpack").Configuration} */
module.exports = {
    mode: "production",
    entry: "./src/index.ts",
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.ts?/,
                exclude: /node_modules/,
                use: "ts-loader"
            }
        ],
    },
    plugins: [
        // function () {
        //     this.hooks.done.tap({
        //         name: "dts-bundler"
        //     }, stats => {
        //         var dts = require('dts-bundle');
        //         dts.bundle({
        //             name: libraryName,
        //             main: './dist/typings/index.d.ts',
        //             out: '../index.d.ts',
        //             removeSource: true,
        //             outputAsModuleFolder: true // to use npm in-package typings
        //         });
        //     })
        // }
    ],
    devtool: "source-map",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
        globalObject: "globalThis",
        library: {
            type: "umd",
            name: {
                amd: libraryName,
                root: libraryName,
                commonjs: libraryName,
            },

        }
    }

}