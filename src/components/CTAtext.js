import React from 'react'
import CountryDropdown from './CountryDropdown'
import { Button, Container, makeStyles } from '@material-ui/core/'

const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: '25%',
    backgroundColor: '#020308',
    padding: '10%',
  },
  headline: {
    color: '#f2f6fc',
    fontSize: '250%',
  },
  transpButton: {
    color: 'white',
  }
}));

const CTAText = ({ selectedCountry, setSelectedCountry, prepareInitMarkers }) => {
  
const classes = useStyles();

  return (
    <div className={classes.box}>
      <div className={classes.headline}>
        See how other countries read about China in relation to COVID-19.
      </div>
      <CountryDropdown
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        prepareInitMarkers={() => prepareInitMarkers()} />
      <Container>
        <Button className={classes.transpButton} onClick={() => prepareInitMarkers()}>Explore</Button>
      </Container>
    </div>
  )
}

export default CTAText