import React from 'react'
import ReactGlobe from 'react-globe'
import ArticleCard from './ArticleCard'
import { Button } from '@material-ui/core/'

const globeTextureUrl = 'https://raw.githubusercontent.com/chrisrzhou/react-globe/master/textures/globe_dark.jpg'
const backgroundImage = './assets/virus_green.jpg'

const articlesPlacementInLayout = {
  width: '100%' //It's a full amount of the 60% that's given to the globe.
}

//Modified version react-globe's default markerOptions
const customMarkerOpts = {
  activeScale: 1.3,
  enableGlow: true,
  enableTooltip: true,
  enterAnimationDuration: 1000,
  enterEasingFunction: ['Linear', 'None'],
  exitAnimationDuration: 500,
  exitEasingFunction: ['Cubic', 'Out'],
  getTooltipContent: marker => helperOnHover(marker),
  glowCoefficient: 0,
  glowPower: 3,
  glowRadiusScale: 2,
  radiusScaleRange: [0.005, 0.02],
  //type: MarkerType.Dot,
}

const customGlobeOps = {
  enableBackground: false,
  texture: `${globeTextureUrl}`,
  enableClouds: false,
  backgroundTexture: `${backgroundImage}`
}

//Determines what's shown when hovering on marker. Passed to Globe's markerOptions through customMarkerOpts.
const helperOnHover = (marker) => `"${marker.headline}" - ${marker.city}`

//When cards are displayed, this appears and enables closing them.
const closeCards = (e, setDetails) => {
  e.preventDefault()
  setDetails(null)
}

const Globe = ( { setEvent, setDetails, markers }) => {

  //"Container" that fetches the articles from the markers and pushes them to readable format as news cards
  const helperDisplayArticle = (markers, setDetails) => {
  return (
    <div style={articlesPlacementInLayout}>
      {markers.map(
        marker =>
        <ArticleCard key={marker.id} marker={marker}/>
      )}
      <Button variant="outlined" color="primary" onClick={(e) => closeCards(e, setDetails)}>Close</Button>
    </div>
  )
}

  //Zoom in animation
  const onClickMarker = (marker, markerObject, event) => {
    setEvent({
      type: 'CLICK',
      marker,
      markerObjectID: markerObject.uuid,
      pointerEventPosition: { x: event.clientX, y: event.clientY },
    });
    setDetails(helperDisplayArticle(markers, setDetails));
  }

  //Zoom out animation
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
      globeOptions={customGlobeOps}
    />
  )
}

export default Globe



  