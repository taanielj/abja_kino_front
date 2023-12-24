const API_URL = process.env.API_URL || 'http://localhost:8080/'
module.exports = {
    devServer: {
        allowedHosts: [
            'localhost',
            'abjakino.duckdns.org',
            'abja.jakobsons.net'
        ],
        proxy: API_URL

    }
}

