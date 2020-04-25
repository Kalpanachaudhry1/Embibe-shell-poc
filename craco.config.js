const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackBar = require("webpackbar");
const CracoAntDesignPlugin = require("craco-antd");
const path = require("path");
const { ESLINT_MODES } = require("@craco/craco");

// Don't open the browser during development
process.env.BROWSER = "none";

module.exports = {
    webpack: {
        plugins: [
            new WebpackBar({ profile: true }),
            ...(process.env.NODE_ENV === "development"
                ? [new BundleAnalyzerPlugin({ openAnalyzer: false })]
                : []),
        ],
        configure: config => {
            config.resolve.modules = [path.resolve('src')].concat(config.resolve.modules);
            return config;
        },
    },
    plugins: [
        {
            plugin: CracoAntDesignPlugin,
            options: {
                customizeThemeLessPath: path.join(
                    __dirname,
                    "antd.customize.less" //https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
                )
            }
        }
    ],
    eslint: {
        mode: ESLINT_MODES.file
    },
    jest: {
        configure(config) {
            // don't transform less files
            config.transformIgnorePatterns = [
                '"[/\\\\]node_modules[/\\\\].+\\.(less)$"'
            ]

            return config;
        },
    }
};