import * as path from "path";
import { Configuration } from "webpack";

const mode =
    process.env.NODE_ENV === "development" ? "development" : "production";

const config: Configuration = {
    mode: mode,
    context: path.resolve(__dirname),
    entry: "./index.ts",
    target: "webworker",
    performance: {
        hints: false,
    },
    output: {
        filename: "worker.js",
        path: path.resolve("worker"),
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true,
                },
            },
        ],
    },
};

export default config;
