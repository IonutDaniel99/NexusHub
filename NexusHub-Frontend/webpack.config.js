const path = require('path');

module.exports = {
    // Your existing Webpack configuration here

    module: {
        rules: [
            // Your existing rules here

            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                    },
                ],
            },
        ],
    },
};
