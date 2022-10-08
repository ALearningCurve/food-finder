// tailwind.config.js
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        // For the best performance and to avoid false positives,
        // be as specific as possible with your content configuration.
    ],
    theme: {
        container: {
            // you can configure the container to be centered
            center: true,

            // or have default horizontal padding
            padding: '1rem',

            // default breakpoints but with 40px removed
            screens: {
                sm: '600px',
                md: '728px',
                lg: '984px',
                xl: '984px',
                '2xl': '984px',
            },
        },
    },
};