import { AppBar, Container, makeStyles, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { useNavigate } from "react-router-dom"

const useStyles = makeStyles(() => ({
    title: {
        flex: 2,
        color: 'white',
        fontFamily: 'Arial Black',
        cursor: 'pointer',
        fontSize: 25,
    },
}));

const Header = () => {
    const classes = useStyles();
    const navigate = useNavigate();
  return (
    <AppBar color='transparent' position='static'>
        <Container>
            <Toolbar>
                <Typography onClick={()=> navigate('/')} className={classes.title}>CRYPTO TRACKER</Typography>
            </Toolbar>
        </Container>
    </AppBar>
  )
}

export default Header