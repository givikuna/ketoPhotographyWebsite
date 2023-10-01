const path = require("path");

module.exports = {
    entry: "./public/app.ts",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: [
                    path.resolve(__dirname, "node_modules"),
                    path.resolve(__dirname, "target"),
                    path.resolve(__dirname, "cgi"),
                    path.resolve(__dirname, "db"),
                    path.resolve(__dirname, "documentation"),
                    path.resolve(__dirname, "img"),
                    path.resolve(__dirname, ".vscode"),
                    path.resolve(__dirname, ".git"),
                ],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true,
                        },
                    },
                ],
            },
        ],
    },
    mode: "production",
    devtool: false,
    resolve: {
        extensions: [".ts", ".js", ".css"],
    },
    externals: {
        main: "main",
    },
};
