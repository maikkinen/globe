import React from 'react'
//import CountryDropdown from './CountryDropdown'
import Dropdown from './Dropdown'
//import TopicInput from './TopicInput'
import { Button, Container, makeStyles } from '@material-ui/core/'
import CallMade from '@material-ui/icons/CallMade'



const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: '20%',
    backgroundColor: '#020308',
    padding: '10%',
    paddingLeft: '15%',
    paddingRight: '15%',
    width: '60%',
  },
  blockLine: {
    color: '#f2f6fc',
    fontSize: '250%',
    display: 'block',
    maxWidth: '500px',
    margin: 0
  },
  aboutLine: {
    float: 'left',
    color: '#f2f6fc',
    fontSize: '250%',
    margin: 0,
    width: '44%',
    padding: 0
    //backgroundColor: 'red',
  },
  transpButton: {
    color: 'white',
    position: 'absolute',
    left: '20%',
  }
}));

const CTAText = ({ selectedCountry, setSelectedCountry, prepareInitMarkers }) => {

  const classes = useStyles();

  return (
    <div className={classes.box}>
      <div className={classes.blockLine}>
        See how other countries read
      </div>
      <div style={{width: 300, backgroundColor: 'red'}}>
        <div className={classes.aboutLine}>
          about
        </div>
        <div className={classes.aboutLine}>
          <Dropdown
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry} />
        </div>
      </div>
      <br />
      <br />
      <div className={classes.blockLine}>
        in relation to coronavirus.
      </div>

      {/*This button actually launches the markers.*/}
      <Container>
        <Button
          className={classes.transpButton}
          onClick={() => prepareInitMarkers()}
          endIcon={<CallMade />}>
          Explore
        </Button>
      </Container>
    </div>
  )
}

export default CTAText