const fs = require('fs')

module.exports = {
    devServer: {
/*        https: {
            key: fs.readFileSync('./src/assets/key/localhost-key.pem'),
            cert: fs.readFileSync('./src/assets/key/localhost.pem'),
        },*/
        port: 8081,
        proxy: {
            '^/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
            },
        }
    }
}
