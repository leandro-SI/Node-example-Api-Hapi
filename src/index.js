const Hapi = require('hapi')
const database = require('./config/database')
const userRoute = require('./routes/userRoute')

const port = 3000
const server = Hapi.server({
    host: 'localhost',
    port,
    routes: {
        json: {
            space: 4
        }
    }
})

userRoute(server)

server.route({
    method: 'GET',
    path: '/',
    handler: () => 'Hello World from Hapi!'
})

database.connect().then(async () => {

    try {
        await server.start()
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
    
    console.log('Server running at:', server.info.uri);
})