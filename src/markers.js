
const LondonMarkers = {
  id: "UK",
  markers: [
    {
      id: 1,
      city: 'Singapore',
      color: 'red',
      coordinates: [1.3521, 103.8198],
      value: 50,
    },
    {
      id: 2,
      city: 'New York',
      color: 'blue',
      coordinates: [40.73061, -73.935242],
      value: 25,
    },
    {
      id: 3,
      city: 'San Francisco',
      color: 'orange',
      coordinates: [37.773972, -122.431297],
      value: 35,
    },
    {
      id: 4,
      city: 'Beijing',
      color: 'gold',
      coordinates: [39.9042, 116.4074],
      value: 0,
    },
    {
      id: 5,
      city: 'Milan',
      color: 'green',
      coordinates: [45.464664, 9.188540],
      value: 400,
    },
    {
      id: 6,
      city: 'Helsinki',
      color: 'green',
      coordinates: [60.192059, 24.94583],
      value: 80,
    },
    {
      id: 7,
      city: 'London',
      color: 'green',
      coordinates: [51.5074, 0.1278],
      value: 80,
    }
  ]
}

const AllMarkersByCountry = {
  finland: {
    markers: [
      {
        id: 4,
        headline: 'Headline wow such wow',
        color: 'green',
        coordinates: [51.5074, 0.1278],
        value: 400,
      },
      {
        id: 1,
        headline: 'Headline wow such wow',
        color: 'green',
        coordinates: [58.5074, 0.1278],
        value: 80,
      },
    ]
  },
  uk: {
    markers: [
      {
        id: 2,
        headline1: 'Beef Consumption has increased by 35%',
        headline2: 'Space Investigation In Trouble due to Infections',
        color: 'red',
        coordinates: [31.5074, -100],
        value: 80,
      },
      {
        id: 3,
        headline1: 'Universities Supporting Healthcare Professionals ',
        headline2: 'Tourism dropped by -120% in San Francisco',
        headline3: 'Hollywood is in Financial Difficulties',
        headline4: 'Silicon Valley`s tips for Remote Working',
        headline5: 'California is Still considered safe zone',
        color: 'red',
        coordinates: [36, -119],
        value: 80,
      },
      {
        id: 4,
        headline1: 'Universities Supporting Healthcare Professionals ',
        headline2: 'Tourism dropped by -120% in San Francisco',
        headline3: 'Hollywood is in Financial Difficulties',
        headline4: 'Silicon Valley`s tips for Remote Working',
        headline5: 'California is Still considered safe zone',
        color: 'red',
        coordinates: [28, -119],
        value: 80,
      },
           {
        id: 5,
        headline1: 'Universities Supporting Healthcare Professionals ',
        headline2: 'Tourism dropped by -120% in San Francisco',
        headline3: 'Hollywood is in Financial Difficulties',
        headline4: 'Silicon Valley`s tips for Remote Working',
        headline5: 'California is Still considered safe zone',
        color: 'red',
        coordinates: [15, -95],
        value: 80,
      },
    ]
  }
}


export {
  LondonMarkers,
  AllMarkersByCountry
}
