const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

module.exports = {
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: [/src/, /examples/, /.storybook/],
                use: [
                    {
                        loader: "awesome-typescript-loader",
                        options: {
                            useCache: true,
                            reportFiles: ["src/**/*.{ts,tsx}", "examples/**/*.{ts,tsx}", ".storybook/**/*.{ts,tsx}"]
                        }
                    },
                    {
                        loader: "react-docgen-typescript-loader"
                    }
                ]
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"],
                include: [/src/, /examples/, /.storybook/]
            }
        ]
    },
    plugins: [new HardSourceWebpackPlugin()]
};
