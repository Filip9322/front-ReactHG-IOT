module.exports = {
    apps: [
        {
            name: 'React_Front',
            script: 'node_modules/next/dist/bin/next',
            env_development: {
                PORT: process.env.PORT,
                NODE_ENV: "development"
            }
        }
    ]
}