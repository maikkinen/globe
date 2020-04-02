import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ReactGlobe from 'react-globe';

import defaultMarkers from './markers';

function getTooltipContent(marker) {
  return `CITY: ${marker.city} (Value: ${marker.value})`;
}

//value used to be: Math.floor(Math.random() * 100)
function App() {
  const randomMarkers = defaultMarkers.map(marker => ({
    ...marker,
    value: marker.value,
  }));
  const [markers, setMarkers] = useState([]);
  const [event, setEvent] = useState(null);
  const [details, setDetails] = useState(null);

  console.log('markers are: ', markers)

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
    <div style={{ width: '100vw', height: '100vh', top: '0px', lef: '0px', margin: '0px' }}>
      <ReactGlobe
        markers={markers}
        markerOptions={{
          getTooltipContent,
        }}
        onClickMarker={onClickMarker}
        onDefocus={onDefocus}
        globeOptions={{
          texture:
            'https://raw.githubusercontent.com/chrisrzhou/react-globe/master/textures/globe_dark.jpg', //This skin is cooll, but seems to slow down the broswer.
        }}
      />
      {details && (
        <div
          style={{ //These are marker's notes' properties.
            background: '#14141a',
            position: 'absolute',
            fontSize: 20,
            top: 0,
            right: 0,
            padding: 12,
          }}>
          <p>{details}</p>
          <p>
            EVENT: type={event.type}, position=
            {JSON.stringify(event.pointerEventPosition)})
          </p>
        </div>
      )}
      <button onClick={() => setMarkers(randomMarkers)}> {/*This thing actually initializes the markers. Just change the wording to be proper. */}
        Randomize markers
      </button>
      <button disabled={markers.length === 0} onClick={() => setMarkers([])}>
        Clear markers
      </button>
      <button
        disabled={markers.length === randomMarkers.length}
        onClick={() => setMarkers([...markers, randomMarkers[markers.length]])}>
        Add marker
      </button>
      <button
        disabled={markers.length === 0}
        onClick={() => setMarkers(markers.slice(0, markers.length - 1))}>
        Remove marker
      </button>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
