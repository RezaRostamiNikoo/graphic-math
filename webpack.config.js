const path = require("path");


/** @type {import("webpack").Configuration} */
module.exports = {
    entry: "./src/index.ts",
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.ts?/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            }
        ],
    },
    devtool: "source-map",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
        globalObject: "globalThis",
        library: {
            type: "umd",
            name: {
                amd: "graphic-math",
                root: "graphic-math",
                commonjs: "graphic-math",
            },

        }
    }

}