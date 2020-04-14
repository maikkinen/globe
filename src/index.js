import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import ReactGlobe from 'react-globe'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CountryDropdown from './components/CountryDropdown'

// Example for accessing markers: AllMarkersByCountry.ch.markers --> list of objects
import { AllMarkersByCountry } from './markers'

const pageStyle = {
  width: '100%',
  height: '100%',
  top: '0px',
  margin: '0px',
  overflow: 'hidden',
  backgroundColor: '#04060a'
}

const headlineStyle = {
  color: '#f2f6fc'
}

const globeStyle = {
  width: '80vw',
  height: '80vh',
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
function getTooltipContent(marker) {
  return (
    <div>
      <p>"{marker.headline1}"</p>
      <p>was said in {marker.city}.</p>
    </div>
  )
}

function App() {

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
  function onClickMarker(marker, markerObject, event) {
    setEvent({
      type: 'CLICK',
      marker,
      markerObjectID: markerObject.uuid,
      pointerEventPosition: { x: event.clientX, y: event.clientY },
    });
    setDetails(getTooltipContent(marker));
  }

  //Zoom out animation + functionalities
  function onDefocus(previousCoordinates, event) {
    setEvent({
      type: 'DEFOCUS',
      previousCoordinates,
      pointerEventPosition: { x: event.clientX, y: event.clientY },
    });
    setDetails(null);
  }

  return (
    <Container style={pageStyle}>
      <div>
        <h2 style={headlineStyle}>
          See how other countries read about China in relation to COVID-19.
        </h2>
        <CountryDropdown selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} prepareInitMarkers={() => prepareInitMarkers()} />
      </div>
      <div style={globeStyle}>
        <ReactGlobe
          markers={markers}
          markerOptions={{ activeScale: 1.1, }}
          onClickMarker={onClickMarker}
          onDefocus={onDefocus}
        />
        {/*getTooltipContent function picks the marker's headlines and renders them here nicely; somehow.*/}
        {details && ( <div style={articleStyle}>{details}</div>)}
      </div>
    </Container>
  )
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);


/*

 globeOptions={{
          texture:
            'https://raw.githubusercontent.com/chrisrzhou/react-globe/master/textures/globe_dark.jpg', //This skin is cooll, but seems to slow down the broswer.
        }}
*/