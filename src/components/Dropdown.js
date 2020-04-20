import React from 'react'
import Select from 'react-select'

const Dropdown = ({ selectedCountry, setSelectedCountry }) => {

  const options = [
    { value: 'ch', label: 'China' },
    { value: 'us', label: 'United States' },
    { value: 'italy', label: 'Italy' },
  ]

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      borderBottom: '1px dotted pink',
      color: state.selectProps.menuColor,
      padding: 20,
    }),
    option: (provided, state) => ({
      ...provided,
      //borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'blue',
      padding: 10,
    }),
    control: (_, { selectProps: { width }}) => ({
      width: 200,
      backgroundColor: 'red',
      padding: 10
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    }
  }

  const handleCountryChange = (event) => {
    //This only takes care of switching the displayed dropdown text.
    console.log("UI selected country is: ", selectedCountry)
    setSelectedCountry(event.target.value)
    console.log("UI selected country is now: ", selectedCountry)
    
  }
  return (
    <div>
      <Select
            styles={customStyles}
            value={selectedCountry}
            onChange={handleCountryChange}
            menuColor='red'
            options={options}
          />
    </div>
  )
}

export default Dropdown