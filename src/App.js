import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CTAText from './components/CTAtext.js'
import SidePanel from './components/SidePanel'
import Globe from './components/Globe'


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
  articlesPositioning: { //This effects the box that holds the articles' content.
    position: 'absolute',
    top: '4%',
    left: '42%',
    width: '57%',
  },

}));

//Function that fetches the marker data, marker by marker, and formats it to be ready for rendering.


const App = () => {
  const classes = useStyles();

  const [selectedCountry, setSelectedCountry] = useState('ch')
  const [markers, setMarkers] = useState([]);
  const [event, setEvent] = useState(null);
  const [details, setDetails] = useState(null);

  //Load the markers ready to the markers-variable, ready for 'exploring'.
  const prepareInitMarkers = () => {
    console.log("selected country was first: ", selectedCountry)
    setMarkers(initCountryMarkers(selectedCountry))
    console.log("selected country is now: ", selectedCountry)
  }

  const initCountryMarkers = (country) => {
    let countryMarkers
    !selectedCountry ? console.log("noo don't do that!") :
      countryMarkers = AllMarkersByCountry[country].markers.map(marker => ({
        ...marker,
        value: marker.value,
      })
      )
    console.log("countrymarkers :", countryMarkers)
    return countryMarkers
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
        <Globe 
          setDetails={setDetails} 
          setEvent={setEvent} 
          markers={markers} 
          /> 
        {/*getTooltipContent function picks the marker's headlines and renders them here nicely; somehow.*/}
        {details && (<div className={classes.articlesPositioning}>{details}</div>)}
      </div>
    </div>
  )
}

export default App