import React from 'react'
import Container from '@material-ui/core/Container'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'

const CountryDropdown = ({ selectedCountry, setSelectedCountry }) => {
    
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      backgroundColor: 'yellow',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  const handleCountryChange = (event) => {
    //This only takes care of switching the displayed dropdown text.
    console.log("UI selected country is: ", selectedCountry)
    setSelectedCountry(event.target.value)
    console.log("UI selected country is now: ", selectedCountry)
    
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