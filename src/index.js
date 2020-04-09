import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ReactGlobe from 'react-globe';
import Radio from "@material-ui/core/Radio"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Button from "@material-ui/core/Button"
import { makeStyles } from '@material-ui/core/styles'
import Container from "@material-ui/core/Container"
import { AllMarkersByCountry } from './markers';

const useStyles = makeStyles({
  root: {
    maxWidth: "50%",
    padding: "1em"
  },
  defaultButton: {
    backgroundColor: "#6b3c67"
  },
  selectedButton: {
    backgroundColor: "#997bad"
  }
})

function getTooltipContent(marker) {
  return (
    <div>
      <p>UK: {marker.headline1}</p>
      <p>FIN: {marker.headline2}</p>
      <p>SE: {marker.headline3}</p>
      <p>CH: {marker.headline4}</p>
      <p>CH: {marker.headline5}</p>
      <br/>
      <p>Was said about {marker.city} from outside</p>
    </div>
  )
}

//value used to be: Math.floor(Math.random() * 100)
function App() {

  
const RadioButtons = () => {
  const [selectedValue, setSelectedValue] = useState('a')

  const classes = useStyles()

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value)
  }

  const handleButtonChange = (event) => {
    console.log("wasup")
  }
  return (
    <div>
      <Container>
      <Radio
        checked={selectedValue === 'a'}
        onChange={handleRadioChange}
        value="a"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'A' }}
      />
      <Radio
        checked={selectedValue === 'b'}
        onChange={handleRadioChange}
        value="b"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'B' }}
        label="(Disabled option)"
      />
      </Container>
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button className={classes.defaultButton} onClick={() => setMarkers(initCountryMarkers('healthcare'))}>Healthcare</Button>
        <Button className={classes.defaultButton} onClick={() => setMarkers(initCountryMarkers('government'))}>Government</Button>
        <Button className={classes.defaultButton} onClick={() => setMarkers(initCountryMarkers('economy'))}>Economy</Button>
      </ButtonGroup>
    </div>
  )
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

  function onClickMarker(marker, markerObject, event) {
          setEvent({
            type: 'CLICK',
            marker,
            markerObjectID: markerObject.uuid,
            pointerEventPosition: { x: event.clientX, y: event.clientY },
          });
    setDetails(getTooltipContent(marker));
  }
  function onDefocus(previousCoordinates, event) {
          setEvent({
            type: 'DEFOCUS',
            previousCoordinates,
            pointerEventPosition: { x: event.clientX, y: event.clientY },
          });
    setDetails(null);
  }

  return (
        <div style={{ width: '75vw', height: '75vh', top: '0px', left: '0px', margin: '0px' }}>
          <ReactGlobe
            markers={markers}
            markerOptions={{
              activeScale: 1.1,
            }}
            onClickMarker={onClickMarker}
            onDefocus={onDefocus}

          />
          {details && (
            <div
              style={{ //These are marker's notes' properties.
                background: 'yellow',
                position: 'absolute',
                fontSize: 20,
                top: '10vh',
                right: '10vh',
                padding: 12,

              }}>
              <div>{details}</div> {/*getTooltipContent -function picks the marker's headlines and renders them here. */}
            </div>
          )}
          <div>
            <h2>Some deep text that also makes an intro to the different subsets of COVID-19 news.</h2>
            <RadioButtons/>
          </div>
        </div>
  )
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);


/*

 globeOptions={{
          texture:
            'https://raw.githubusercontent.com/chrisrzhou/react-globe/master/textures/globe_dark.jpg', //This skin is cooll, but seems to slow down the broswer.
        }}

        <button disabled={markers.length === 0} onClick={() => setMarkers([])}>
        Clear markers
      </button>
      <button
        disabled={markers.length === initCountryMarkers.length}
        onClick={() => setMarkers([...markers, initCountryMarkers[markers.length]])}>
        Add marker
      </button>
      <button
        disabled={markers.length === 0}
        onClick={() => setMarkers(markers.slice(0, markers.length - 1))}>
        Remove marker
      </button>
*/