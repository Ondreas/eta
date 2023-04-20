const dayjs = require('dayjs');

module.exports = function (eleventyConfig) {
    /* ----------------------------------------- */
    /* PassthroughCopy                           */
    /* ----------------------------------------- */
    eleventyConfig.addPassthroughCopy({ 
        // './src/static/': '/',
        './src/assets/img': '/assets/img',
        './src/assets/fonts': '/assets/fonts',
        'node_modules/alpinejs/dist/cdn.min.js': '/assets/js/alpine.js',
        'node_modules/@alpinejs/persist/dist/cdn.min.js': '/assets/js/persist.js'
    });
    /* ----------------------------------------- */
    /* Watch targets                             */
    /* ----------------------------------------- */
    /*
	** 11ty | Eleventy :: Watch targets
	** Watch for changes in folders/files
	** By default not watched by 11ty !!!
	** @link: https://www.11ty.dev/docs/config/#add-your-own-watch-targets
    */
	eleventyConfig.addWatchTarget('./src/assets');
	// eleventyConfig.addWatchTarget('./utils/*.js');
	eleventyConfig.addWatchTarget('./tailwind.config.js');
    /* ----------------------------------------- */
    /* Layout aliases                            */
    /* ----------------------------------------- */
	// @link https://www.11ty.dev/docs/layouts/#layout-aliasing
	eleventyConfig.addLayoutAlias('base', 'base.njk');
	// eleventyConfig.addLayoutAlias('page', 'layouts/page.njk')
	// eleventyConfig.addLayoutAlias('post', 'layouts/post.njk')
	// eleventyConfig.addLayoutAlias('author', 'layouts/author.njk')

    /* ----------------------------------------- */
    /* Shortcodes                                */
    /* ----------------------------------------- */
    eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);

    /* ----------------------------------------- */
    /* Filters                                   */
    /* ----------------------------------------- */
    // dayJS
    eleventyConfig.addFilter('date', (dateObj) => {
        return dayjs(dateObj).format('MMMM D, YYYY');
    });
    eleventyConfig.addFilter("sitemapDate", (dateObj) => {
        return dayjs(dateObj).toISOString();
    });
    eleventyConfig.addFilter("year", () => {
        return dayjs().format("YYYY");
    });
    // Excerpt
    eleventyConfig.addFilter('excerpt', (post) => {
        const content = post.replace(/(<([^>]+)>)/gi, '');
        return content.substr(0, content.lastIndexOf(' ', 200)) + '...';
    });

    /* ----------------------------------------- */
    /* Collections                               */
    /* ----------------------------------------- */
    eleventyConfig.addCollection("pages", function (collections) {
        return collections.getFilteredByTag("page").sort(function (a, b) {
            return a.data.order - b.data.order;
        });
    });
    
    return {
        // markdownTemplateEngine: "njk",
        dir: {
            input: "src",
            data: "data",
            includes: "includes",
            layouts: "layouts",
            output: "dist"
        },
        templateFormats: [
            'md',
            'njk',
            'html'
        ],
        passthroughFileCopy: true
    };
};
