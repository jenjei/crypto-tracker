import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import CoinPage from './pages/CoinPage';
import { makeStyles } from '@material-ui/core';

function App() {
  const useStyles = makeStyles(() => ({
    App: {
      flex: 1,
      backgroundColor:'#00004d',
      color: 'white',
      minHeight: '10vh',
      minWidth: '150vh'
    },
  }));

  const classes= useStyles();

  return (
    <div className="coin-app">
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
        <Route path='/' element={<Homepage/>} exact/>
        <Route path='/coins/:id' element={<CoinPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
