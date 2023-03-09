module.exports = {
    connectionType: 'local',
    Option:{
        autoIndex:"false",
        maxPoolSize:10,
        useNewUrlParser:true
    },

    local: {
        mode: 'local',
        mongo: {
            host: 'localhost',
            port: 27017,
            user: '',
            password: '',
            database: 'spotify_clone'
        }
    },
    // development: {
    //     mode: 'development',
    //     mongo: {
    //         host: '192.168.1.3',
    //         port: 27393,
    //         user: 'ais_populacelottoapp_dev',
    //         password: 'YVEzFDHz',
    //         database: ''
    //     }
    // },
}