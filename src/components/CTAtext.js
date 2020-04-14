import React from 'react'
import CountryDropdown from './CountryDropdown'
import { Button, Container, makeStyles } from '@material-ui/core/'

const headlineStyle = {
  color: '#f2f6fc',
  zIndex: '100',
}

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

const CTAText = ({ selectedCountry, setSelectedCountry, prepareInitMarkers }) => {
  
const classes = useStyles();

  return (
    <div>
      <h2 style={headlineStyle}>
        See how other countries read about China in relation to COVID-19.
        </h2>
      <CountryDropdown
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        prepareInitMarkers={() => prepareInitMarkers()} />
      <Container>
        <Button className={classes.transpButton} onClick={() => prepareInitMarkers()}>Yea lets do it</Button>
      </Container>
    </div>
  )
}

export default CTAText