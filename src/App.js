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
  //Layout
  halfPageLeft: {
    width: '39%',
    height: '100%',
    //backgroundColor: 'red', //for testing purposes
    padding: '5px',
    float: 'left',
    display: 'inline'
  },
  //Layout
  halfPageRight: {
    width: '60%',
    height: '100vh',
    backgroundColor: '#020308',
    right: '0px',
    float: 'left',
    display: 'inline'
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

  const [selectedCountry, setSelectedCountry] = useState('')
  const [markers, setMarkers] = useState([]);
  const [event, setEvent] = useState(null);
  const [details, setDetails] = useState(null);

  //Load the markers ready to the markers-variable, ready for 'exploring'.
  const prepareInitMarkers = () => setMarkers(initCountryMarkers(selectedCountry))

  const initCountryMarkers = (country) => {
    let countryMarkers
    !selectedCountry ? console.log("Nothing to show yet, pls select country!") :
      countryMarkers = AllMarkersByCountry[country].markers.map(
        marker => ({
          ...marker,
          value: marker.value,
        })
      )
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
        {/*Don't understand a 100% how the thing below works...*/}
        {details && (<div className={classes.articlesPositioning}>{details}</div>)}
      </div>
    </div>
  )
}

export default App