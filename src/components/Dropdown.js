import React from 'react'
import Select from 'react-select'

const Dropdown = ({ selectedCountry, setSelectedCountry }) => {

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
      padding: 10,
      fontSize: '55%',
      backgroundColor: '#595269'
    }),
    control: (_, { selectProps: { width }}) => ({
      width: 200,
      //backgroundColor: 'red',
      padding: 5,
      height: 50,
    }),
    valueContainer: () => ({
      float: 'left',
      width: '75%'
    }),
    indicatorsContainer: () => ({
      float: 'left',
      width: '24%'
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    }
  }

  const handleCountryChange = (selectedOption) => {
    //This takes care of switching the displayed dropdown text.
    const value = selectedOption.value
    setSelectedCountry(value)
  }

  return (
    <div>
     <Select
            styles={customStyles}
            value={selectedCountry}
            onChange={(e) => handleCountryChange(e)}
            //defaultValue
            placeholder="Country"
            options={options}
          />
    </div>
  )
}

export default Dropdown