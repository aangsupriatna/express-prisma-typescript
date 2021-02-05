import redis from 'redis'

const client = redis.createClient({
    port: 6379,
    host: "127.0.0.1"
})

client.on('connect', () => {
    console.log("Redis connected")
})

client.on('ready', () => {
    console.log("Redis ready")
})

client.on('error', (error) => {
    console.log(error.message)
})

client.on('end', () => {
    console.log("Redis disconnected")
})

process.on('SIGINT', () => {
    client.quit()
})

export default client