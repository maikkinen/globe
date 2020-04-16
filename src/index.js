import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import ReactGlobe from 'react-globe'
import { makeStyles } from '@material-ui/core/styles'
import CTAText from './components/CTAtext.js'
import SidePanel from './components/SidePanel'


// Example for accessing markers: AllMarkersByCountry.ch.markers --> list of objects
import { AllMarkersByCountry } from './markers'

//For now, styles are available here directly, for simplicity. 
//TODO: syled-components? Or sth else?

const useStyles = makeStyles(() => ({
  pageStyle: {
    height: '100vh',
    top: '0px',
    margin: 'auto',
    padding: '0px',
    overflow: 'hidden',
    backgroundColor: '#020308',
  },
  halfPageLeft: {
    width: '39%',
    height: '100%',
    //backgroundColor: 'red', //for testing purposes
    padding: '5px',
    float: 'left',
    display: 'inline'
  },
  halfPageRight: {
    width: '60%',
    height: '100vh',
    backgroundColor: '#020308',
    right: '0px',
    float: 'left',
    display: 'inline'
  },
  transpButton: {
    position: 'absolute',
    top: '2%',
    right: '20%',
    color: 'red',
    zIndex: '100'
  },
  articleOutlineStyle: { //This effects the box that holds the articles' content.
    background: 'yellow',
    position: 'absolute',
    fontSize: 20,
    top: '10vh',
    right: '10vh',
    padding: 12,
  },

}));

//This touches only the written content of the news card.
const articleStyle = {
  header: {
    fontSize: 20,
  },
  paragraph: {
    fontSize: 14
  },
  details: {
    fontSize: 12
  }
}


//Function that fetches the marker data, marker by marker, and formats it to be ready for rendering.
const getTooltipContent = (marker) => {
  return (
    <div>
      <div style={articleStyle.header}>{marker.headline}</div>
      <div style={articleStyle.paragraph}>{marker.paragraph}</div>
      <div style={articleStyle.details}>
        Published in {marker.outlet}, in {marker.date}
      </div>
    </div>
  )
}

const App = () => {
  const classes = useStyles();

  const [selectedCountry, setSelectedCountry] = useState("ch")

  //Confusion: is this one necessary anymore? 
  const prepareInitMarkers = () => {
    console.log("selected country was first: ", selectedCountry)
    setMarkers(initCountryMarkers(selectedCountry))
    console.log("selected country is now: ", selectedCountry)
  }

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
    <div className={classes.pageStyle}> {/*Containser for the whole page's content. */}
      <div className={classes.halfPageLeft}>
        <CTAText
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          prepareInitMarkers={() => prepareInitMarkers()}
        />
      </div>
      <div className={classes.halfPageRight}>
        <SidePanel />
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
        {details && (<div className={classes.articleOutlineStyle}>{details}</div>)}
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);