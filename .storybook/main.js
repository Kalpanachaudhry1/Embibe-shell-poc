const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.(js|mdx|tsx)'],
  addons: [
    {
        name: "@storybook/preset-create-react-app",
        options: {
            craOverrides: {
                fileLoaderExcludes: ['less']
            }
        }
    },
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-viewport/register',
  ],

  // this is required to support imports like
  // import Loading from 'components/Loading/Loading.component'
  // https://github.com/storybookjs/storybook/issues/4944#issuecomment-444997113
  webpackFinal: (config) => {
        config.resolve.modules = [
            ...(config.resolve.modules || []),
            path.resolve(__dirname, "../src"),
        ];

        config.module.rules.push({
            test: /\.less$/,
            use: ['style-loader', 'css-loader', {
                loader: "less-loader",
                options: {
                    javascriptEnabled: true,
                    modifyVars: {
                        'primary-color': '#1364ce',
                        'link-color': '#0b5fcc',
                        'layout-sider-background': '#0b5fcc',
                        'layout-sider-background-light': '#0b5fcc',
                        'menu-bg': '#0e6ef2',
                        'icon-color': '#ffffff',
                        'layout-body-background': '#ffffff',
                        'icon-color': '#a7acbb',
                    }
                }
            }],
            include: path.resolve(__dirname, '../'),
        });

        return config;
  },
};
