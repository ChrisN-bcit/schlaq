const express = require('express')
const reactViews = require('express-react-views')
const { port, viewsDir, engineOpts } = require('./globals')
const { title } = require('./globals').props
const { starred, channels, dms, messages } = require('./db/db')

const server = express()

server.use( express.static( 'public' ) )
server.set( 'views', viewsDir )
server.set( 'view engine', 'jsx' )
server.engine( 'jsx', reactViews.createEngine( engineOpts ) )

server.get( '/', (req,res) => res.render( 'App', {
  title,
  starred,
  channels,
  dms,
  messages,
  scope: 'Bob'
}))

server.get( '/:scope', (req,res) => res.render( 'App', {
  title,
  starred,
  channels,
  dms,
  messages,
  scope: req.params.scope,
  scopeStarred: starred.map( ({ starred }) => starred ).includes( req.params.scope )
}))


server.listen( port, () => console.log( `\nServer is live at http://localhost:${port}` ) )
