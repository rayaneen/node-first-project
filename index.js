if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


const express = require('express');
const { process_params } = require('express/lib/router');
const app = express()
const port = 3000
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const Math = require('mathjs')
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'google-image-search1.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.API_KEY
  }
};

const infoUrl = `https://api.le-systeme-solaire.net/rest/bodies/`



app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/info', async (req, res) => {

  const celestialBodyResponse = await fetch(infoUrl)
  const celestialBodies = await celestialBodyResponse.json()
  const celestialBody = celestialBodies.bodies[Math.floor(Math.random() * celestialBodies.bodies.length)]
  const imageResponse = await fetch(`https://google-image-search1.p.rapidapi.com/v2/?q=${celestialBody.name}+${celestialBody.bodyType}&hl=en`, options)
  const images = await imageResponse.json();
  const image = images.response.images[0].image.url
  const result = [celestialBody, image]
  res.json(result)
})
