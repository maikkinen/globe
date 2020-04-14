import React from 'react'
import Container from '@material-ui/core/Container'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'

const CountryDropdown = ({ selectedCountry, setSelectedCountry, prepareInitMarkers }) => {
    
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
      </Container>
    </div>
  )
}

export default CountryDropdown