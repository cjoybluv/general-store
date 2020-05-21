const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const PATHNAME = '/api'

const app = express()

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

// eslint-disable-next-line no-console
console.log('Mongoose Connected: ', process.env.MONGODB_URI)
app.use(bodyParser.json())

// pre-flight CORS allow
app.options(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN)
  next()
})

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN)
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.header(
    'Access-Control-Allow-Methods',
    'PUT, POST, GET, DELETE, OPTIONS, HEAD'
  )
  next()
})

app.use(PATHNAME, require('../api/routes/api'))

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
