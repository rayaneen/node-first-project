

const getBody = async() => {
  const response = await fetch('/info')
  const data = await response.json()
  console.log(data[0])
  const infos = {
    name: data[0].name || 'Unknown',
    alternativeName: data[0].alternativeName || 'None',
    bodyType: data[0].bodyType || 'Unknown',
    closeTo: data[0].aroundPlanet == null ? 'Nothing' : data[0].aroundPlanet.planet || 'Nothing' ,
    gravity: data[0].gravity || 'Unknown',
    density: data[0].density || 'Unknown',
    discoveryDate: data[0].discoveryDate || 'Unknown',
    discoveredBy: data[0].discoveredBy || 'Unknown'
  }
  const image = data[1]
  const content = {
    infos: infos,
    image: image
  }
  insertContent(content)
}

const cleanUp = () => {
  const cleanUp = `
  <div id="img" class="col-sm-12 col-md-6 p-0">
  </div>
  <div id="info"class="col-sm-12 col-md-6 p-0">
  </div>`
  document.querySelector('#card').innerHTML = cleanUp
}

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const insertContent = (content) => {
  cleanUp()
  const card = `<div class="card-name"
    style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${content.image})">
    ${content.infos.name}
  </div>`
  const info =
    `<div class="card-info">
    <h2>${content.infos.bodyType}</h2>
    <ul class='details'>
      <li>Alternative name: <strong>${content.infos.alternativeName}</strong></li>
      <li>Close to: <strong>${capitalizeFirstLetter(content.infos.closeTo)}</strong></li>
      <li>Gravity: <strong>${content.infos.gravity} G</strong></li>
      <li>Density: <strong>${content.infos.density} d</strong></li>
      <li>Discovered on: <strong>${content.infos.discoveryDate}</strong></li>
      <li>By: <strong>${content.infos.discoveredBy}</strong></li>
    </ul>
  </div>`

  document.querySelector('#img').insertAdjacentHTML('beforeend', card)
  document.querySelector('#info').insertAdjacentHTML('beforeend', info)
}


const btn = document.querySelector('#btn')

btn.addEventListener('click', (event) => {
  event.preventDefault()
  getBody()
})
