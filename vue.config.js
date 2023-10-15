const API_URL = process.env.API_URL || 'http://localhost:8080/'
module.exports = {
    devServer: {
        port: 8081,
        proxy: API_URL

    }
}

