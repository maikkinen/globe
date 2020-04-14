import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import ReactGlobe from 'react-globe'
import { styled, makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CTAText from './components/CTAtext.js'


// Example for accessing markers: AllMarkersByCountry.ch.markers --> list of objects
import { AllMarkersByCountry } from './markers'

//For now, styles are available here directly, for simplicity. 
//TODO: syled-components? Or sth else?
const pageStyle = {
  width: '100%',
  height: '100%',
  top: '0px',
  margin: '0px',
  overflow: 'hidden',
  backgroundColor: '#020308'
}

const globeContainerStyle = {
  width: '100vw',
  height: '100vh',
  top: '0px',
  left: '0px',
  margin: '0px'
}

const articleStyle = {
  background: 'yellow',
  position: 'absolute',
  fontSize: 20,
  top: '10vh',
  right: '10vh',
  padding: 12,
}
//Function that fetches the marker data, marker by marker, and formats it to be ready for rendering.
const getTooltipContent = (marker) => {
  return (
    <div>
      <p>"{marker.headline1}"</p>
      <p>was said in {marker.city}.</p>
    </div>
  )
}

const App = () => {

  const [selectedCountry, setSelectedCountry] = useState("ch")

  //Confusion: is this one necessary anymore? 
  const prepareInitMarkers = () => setMarkers(initCountryMarkers(selectedCountry))

  const initCountryMarkers = (country) => {
    const countryMarkers = AllMarkersByCountry[country].markers.map(marker => ({
      ...marker,
      value: marker.value,
    })
    )
    console.log("countrymarkers :", countryMarkers)
    return countryMarkers
  }

  const [markers, setMarkers] = useState([]);
  const [event, setEvent] = useState(null);
  const [details, setDetails] = useState(null);

  //Zoom in animation + functionalities
  const onClickMarker = (marker, markerObject, event) => {
    setEvent({
      type: 'CLICK',
      marker,
      markerObjectID: markerObject.uuid,
      pointerEventPosition: { x: event.clientX, y: event.clientY },
    });
    setDetails(getTooltipContent(marker));
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
    <Container style={pageStyle}> {/*Containser for the whole page's content. */}
      <CTAText
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        prepareInitMarkers={() => prepareInitMarkers()}
      />
      <div style={globeContainerStyle}>
        <ReactGlobe
          markers={markers}
          markerOptions={{ activeScale: 1.1, }}
          onClickMarker={onClickMarker}
          onDefocus={onDefocus}
          globeOptions={{
            texture: 'https://raw.githubusercontent.com/chrisrzhou/react-globe/master/textures/globe_dark.jpg',
          }}
        />
        {/*getTooltipContent function picks the marker's headlines and renders them here nicely; somehow.*/}
        {details && (<div style={articleStyle}>{details}</div>)}
      </div>
    </Container>
  )
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);