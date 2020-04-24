import React from 'react'
import ReactGlobe from 'react-globe'
import ArticleCard from './ArticleCard'
import { Button } from '@material-ui/core/'

//import { AllMarkersByCountry } from '../markers'

const globeTextureUrl = 'https://raw.githubusercontent.com/chrisrzhou/react-globe/master/textures/globe_dark.jpg'
const backgroundImage = './assets/virus_green.jpg'


const articlesPlacementInLayout = {
  width: '100%'
}

const customMarkerOpts = {
  activeScale: 1.3,
  enableGlow: true,
  enableTooltip: true,
  enterAnimationDuration: 1000,
  enterEasingFunction: ['Linear', 'None'],
  exitAnimationDuration: 500,
  exitEasingFunction: ['Cubic', 'Out'],
  getTooltipContent: marker => headlineFunc(marker),
  glowCoefficient: 0,
  glowPower: 3,
  glowRadiusScale: 2,
  radiusScaleRange: [0.005, 0.02],
  //type: MarkerType.Dot,
}

const headlineFunc = (marker) => `"${marker.headline}" - ${marker.city}`


const closeCards = (e, setDetails) => {
  e.preventDefault()
  setDetails(null)
  console.log('close now pls')
}


const Globe = ( { setEvent, setDetails, markers }) => {

  const articleCardDisplayerThing = (markers, setDetails) => {
  return (
    <div style={articlesPlacementInLayout}>
      {markers.map(marker =>
        <ArticleCard key={marker.id} marker={marker} style={{color: 'blue'}} />
      )}
      <Button variant="outlined" color="primary" onClick={(e) => closeCards(e, setDetails)}>Close</Button>
    </div>
  )
}

  //Zoom in animation + functionalities
  const onClickMarker = (marker, markerObject, event) => {
    setEvent({
      type: 'CLICK',
      marker,
      markerObjectID: markerObject.uuid,
      pointerEventPosition: { x: event.clientX, y: event.clientY },
    });
    //console.log('marker is: ', marker)
    setDetails(articleCardDisplayerThing(markers, setDetails));
  }

  //Zoom out animation + functionalities
  const onDefocus = (previousCoordinates, event) => {
    setEvent({
      type: 'DEFOCUS',
      previousCoordinates,
      pointerEventPosition: { x: event.clientX, y: event.clientY },
    });
    setDetails(null);
  }

  return (
    <ReactGlobe
      markers={markers}
      markerOptions={customMarkerOpts}
      onClickMarker={onClickMarker}
      onDefocus={onDefocus}
      globeOptions={{
        enableBackground: false,
        texture: `${globeTextureUrl}`,
        enableClouds: false,
        backgroundTexture: `${backgroundImage}`
      }}
    />
  )
}

export default Globe



  