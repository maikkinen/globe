import React, { useState } from 'react'
import Select from 'react-select'

const Dropdown = ({ selectedCountry, setSelectedCountry }) => {

  const [dropdownText, setDropdownText] = useState("country")

  const options = [
    { value: 'ch', label: 'China' },
    { value: 'us', label: 'United States' },
    { value: 'it', label: 'Italy' },
  ]

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      borderBottom: '1px dotted orange',
      color: state.selectProps.menuColor,
      padding: 20,
      backgroundColor: '#595269',
      opacity: '0.9'
    }),
    option: (provided, state) => ({
      ...provided,
      //borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'white',
      paddingLeft: 0,
      paddingTop: 5,
      paddingBottom: 5,
      fontSize: '55%',
      backgroundColor: '#595269'
    }),
    control: (_, { selectProps: { width }}) => ({
      width: 220,
      //backgroundColor: 'red',
      padding: 0,
      height: 50,
    }),
    valueContainer: () => ({
      float: 'left',
      width: '75%',
      fontSize: '75%'
    }),
    indicatorsContainer: () => ({
      float: 'left',
      width: '24%',
      position: 'absolute',
      right: 0,
      top: '25%'
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    }
  }

  const handleCountryChange = (selectedOption) => {
    //This takes care of 1) setting the correct country to the App's state 2) switching the dropdown's text.
    setDropdownText(selectedOption.label)
    setSelectedCountry(selectedOption.value)
  }


  return (
    <div>
     <Select
            styles={customStyles}
            value={selectedCountry}
            onChange={(e) => handleCountryChange(e)}
            //defaultValue
            placeholder={dropdownText}
            options={options}
          />
    </div>
  )
}

export default Dropdown