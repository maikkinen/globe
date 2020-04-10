import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ReactGlobe from 'react-globe';
import Radio from "@material-ui/core/Radio"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Button from "@material-ui/core/Button"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles'
import Container from "@material-ui/core/Container"
import { AllMarkersByCountry } from './markers';

const useStyles = makeStyles({
  root: {
    maxWidth: "80%",
    padding: "1em"
  },
  defaultButton: {
    backgroundColor: "#6b3c67"
  },
  selectedButton: {
    backgroundColor: "#997bad"
  }
})

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

  //Component that takes care of providing the controls for the UI.
  const RadioButtons = () => {
    
    const useStyles = makeStyles((theme) => ({
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        backgroundColor: 'yellow',
        color: 'green'
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      transpButton: {
        color: 'white'
      }
    }));

    const classes = useStyles();

    const handleCountryChange = (event) => {
      //setMarkers(initCountryMarkers())
      console.log("selected country is: ", selectedCountry)
      setSelectedCountry(event.target.value) // this one is lagging by one. why?
      console.log("selected country is now: ", selectedCountry)
      
    }
    return (
      <div>
        <Container>
        <FormControl className={classes.formControl}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCountry}
              onChange={handleCountryChange}
            >
              <MenuItem value={"ch"}>China</MenuItem>
              <MenuItem value={"us"}>United States</MenuItem>
              <MenuItem value={"it"}>Italy</MenuItem>
            </Select>
          </FormControl>
          <Container>
          <Button className={classes.transpButton} onClick={() => setMarkers(initCountryMarkers(selectedCountry))}>Yea lets do it</Button>
          </Container>
        </Container>
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
    <Container style={{ width: '100%', height: '100%', top: '0px', margin: '0px', overflow: 'hidden', backgroundColor: '#04060a' }}>
      <div>
        <h2 style={{ color: '#f2f6fc' }}>
          See how other countries read about China in relation to COVID-19.
        </h2>
        <RadioButtons />
      </div>
      <div style={{ width: '80vw', height: '80vh', top: '0px', left: '0px', margin: '0px' }}>
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