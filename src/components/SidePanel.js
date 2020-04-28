import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Button from '@material-ui/core/Button'
import About from './About'

const useStyles = makeStyles({
  panel: {
    backgroundColor: '#756585', //for testing purposes
    color: 'white',           //for testing purposes
    width: '40vw',
    height: '100%',
    margin: '0px',
    padding: '3%',
    overflow: 'hidden',
    fontSize: '120%'
  },
  button: {
    //If no backgroundColor is set, it's transparent. Voilá!material 
    position: 'absolute',
    top: '2%',
    left: '2%',
    color: 'white',
    zIndex: '100'
  },
});

const SidePanel = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.panel)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <About/>
    </div>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            className={classes.button}
            onClick={toggleDrawer(anchor, true)}>
              About 
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default SidePanel