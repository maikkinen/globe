import React from 'react'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    textColor: 'white',
    backgroundColor: 'yellow',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
    color: 'red'
  },
}));

const TopicInput = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <TextField 
        className={classes.textField}
        //id="filled-full-width"
        //label="Label"
        placeholder="topic of your interest."
        //helperText="Full width!"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  )
}

export default TopicInput