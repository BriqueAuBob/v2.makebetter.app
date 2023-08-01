module.exports = {
    apps: [
        {
            name: 'makebetter-beta',
            port: '3024',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs',
        },
    ],
};
