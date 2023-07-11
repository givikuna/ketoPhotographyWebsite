module.exports = {
    apps: [
        {
            name: 'index',
            script: 'cgi/index.js',
        },
        {
            name: 'img',
            script: 'cgi/img.js',
        },
        {
            name: 'select',
            script: 'cgi/select.js',
        },
        {
            name: 'src',
            script: 'cgi/src.js',
        },
        {
            name: 'serve',
            script: 'cgi/serve.js'
        },
        {
            name: 'auth',
            script: 'cgi/auth.js'
        }
    ]
};
