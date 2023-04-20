const plugins = [
    require('postcss-import'),
    require('tailwindcss')('./tailwind.config.js'),
    require('autoprefixer')
];

if (process.env.NODE_ENV === 'production') {
    plugins.push(
        require('cssnano')({
            preset: [
                'cssnano-preset-default', {
                    discardComments: {
                        removeAll: true,
                    },
                },
            ],
        }),
    );
}
module.exports = { plugins };