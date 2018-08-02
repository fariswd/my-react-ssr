import path from 'path'
import fs from 'fs'

import React from 'react'
import express from 'express'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { matchRoutes } from 'react-router-config';
import serialize from 'serialize-javascript'

import App from '../src/App'
import Routes from '../src/routes'

const PORT = process.env.PORT || 3006
const app = express()

app.use(express.static('./build'))

app.get('/*', (req, res) => {
  const matchingRoutes = matchRoutes(Routes, req.url);
  let promises = []
  matchingRoutes.forEach(route => {
    if (route.route.loadData) {
      promises.push(route.route.loadData());
    }
  });
  
  Promise.all(promises).then(dataArr => {  
    const context = { dataArr }
    const app = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    )
    const indexFile = path.resolve('./build/index.html')
    fs.readFile(indexFile, 'utf8', (err, data) => {
      if(err) {
        console.error('Something went wrong:', err)
        return res.status(500).send('Oops, better luck next time!!')
      }
      
      if(context.status === 404) {
        res.status(404)
      }
      
      if(context.url) {
        return res.redirect(301, context.url)
      }
      
      return res.send(
        data
        .replace('<div id="root"></div>', '<div id="root">${app}</div>')
        .replace(
          '</body>',
          `<script>window.__ROUTE_DATA__ = ${serialize(data)}</script></body>`
        )
      )
    })
    
  })
  .catch(err => console.log('---err', err))
})

app.listen(PORT, () => {
  console.log('server listening on port ' + PORT)
})