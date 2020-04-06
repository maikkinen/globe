import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ReactGlobe, { defaultMarkerOptions } from 'react-globe';

import { AllMarkersByCountry } from './markers';

function getTooltipContent(marker) {
  return (
    <div>
      <p>UK: {marker.headline1}</p>
      <p>FIN: {marker.headline2}</p>
      <p>SE: {marker.headline3}</p>
      <p>CH: {marker.headline4}</p>
      <p>CH: {marker.headline5}</p>
    </div>
  )
}

//value used to be: Math.floor(Math.random() * 100)
function App() {

  const [country1, setCountry1] = useState('finland')
  const [country2, setCountry2] = useState("UK")

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
    <div style={{ width: '75vw', height: '75vh', top: '0px', lef: '0px', margin: '0px' }}>
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
          
          <p>{details}</p>
          <p>
            California, US
          </p>
        </div>
      )}
      <div>
      <h2>Some deep text that also makes an intro to the different subsets of COVID-19 news.</h2>
      <button onClick={() => setMarkers(initCountryMarkers('uk'))}> {/*This thing actually initializes the markers. Just change the wording to be proper. */}
        News on Government
      </button>
      <button onClick={() => setMarkers(initCountryMarkers('finland'))}> {/*This thing actually initializes the markers. Just change the wording to be proper. */}
        News on Economy
      </button>
      <button onClick={() => setMarkers(initCountryMarkers('finland'))}> {/*This thing actually initializes the markers. Just change the wording to be proper. */}
        News on Politics
      </button>
      <button onClick={() => setMarkers(initCountryMarkers('finland'))}> {/*This thing actually initializes the markers. Just change the wording to be proper. */}
        News on People
      </button>
      <button onClick={() => setMarkers(initCountryMarkers('finland'))}> {/*This thing actually initializes the markers. Just change the wording to be proper. */}
        News on Healthcare
      </button>
      </div>
    </div>
  );
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