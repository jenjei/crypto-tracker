import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { makeStyles, Typography } from '@material-ui/core'

const CoinPage = () => {
    const {id} = useParams()
    const [coin, setCoin] = useState()

    useEffect(() => {
        axios
        .get(`https://api.coingecko.com/api/v3/coins/${id}`)
        .then(response => {
          setCoin(response.data)
          console.log('data: ', response.data)
        }).catch(error => console.log(error))
      }, [])

    const useStyles = makeStyles ((theme) => ({
        container: {
            display: 'flex',
            [theme.breakpoints.down("md")]: {
                flexDirection: "column",
                alignItems: "center",
            },
        },
        sidebar: {
            width: '30%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 25,
            borderRight: '2px solid',
            [theme.breakpoints.down("md")]: {
                width: "100%",
            },
        },
        heading: {
            marginBottom: 20,
            fontSize: 40,
            fontFamily: 'Arial Black',
        },
        description: {
            width: "80%",
            fontFamily: "Arial",
            fontStyle: 'italic',
            padding: 25,
            paddingBottom: 25,
            paddingTop: 0,
            textAlign: "justify",
          },
        marketData: {
            padding: 25,
            paddingTop: 10,
            width: "80%",
            fontFamily: 'Arial Black',
            alignItems: 'center',
            [theme.breakpoints.down("md")]: {
              display: "flex",
              justifyContent: "space-around",
            },
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
              alignItems: "center",
            },
            [theme.breakpoints.down("xs")]: {
              alignItems: "start",
            },
          },
    }));
    const classes = useStyles()

  return (
    <div className={classes.container}>

        <div className={classes.sidebar}>
            <img
            src={coin?.image.large}
            alt={coin?.name}
            height='200'
            style={{marginBottom: 20}}/>

            <Typography className={classes.heading}>{coin?.name}</Typography>
            <Typography className={classes.description}>{coin?.description.en.split('.')[0]}</Typography>

            <div className={classes.marketData}>
                <span style={{ display: "flex" }}>
                    <Typography style={{fontSize: 20}} className={classes.heading}>
                    Rank:
                    </Typography>
                    &nbsp; &nbsp;
                    <Typography
                        style={{
                            fontFamily: "Arial",
                            fontSize: 20,
                        }}
                        >
                        {coin?.market_cap_rank}
                    </Typography>
                </span>
            
                <span style={{ display: "flex" }}>
                    <Typography style={{fontSize: 20}} className={classes.heading}>
                    Current Price:
                    </Typography>
                    &nbsp; &nbsp;
                    <Typography
                        style={{
                            fontFamily: "Arial",
                            fontSize: 20,
                        }}
                        >
                { (coin?.market_data.current_price.eur) } €
                    </Typography>
                </span>

                <span style={{ display: "flex" }}>
                    <Typography style={{fontSize: 20}} className={classes.heading}>
                    Market Cap:
                    </Typography>
                    &nbsp; &nbsp;
                    <Typography
                        style={{
                            fontFamily: "Arial",
                            fontSize: 20,
                        }}
                        >
                        { (coin?.market_data.market_cap.eur)} €
                    </Typography>
                </span>
            </div>
        </div>
    </div>
  )
} 

export default CoinPage