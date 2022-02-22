import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Line } from "react-chartjs-2"
import { ThemeProvider,
        CircularProgress,
        createTheme,
        makeStyles, } from '@material-ui/core'
import SelectButton from "./SelectButton"

function Coin({coin}) {

    const [history, setHistory] = useState([])
    const [days, setDays] = useState(1)
    const [flag,setflag] = useState(false);

    const chartDays = [
        {
          label: "24 Hours",
          value: 1,
        },
        {
          label: "30 Days",
          value: 30,
        },
        {
          label: "3 Months",
          value: 90,
        },
        {
          label: "1 Year",
          value: 365,
        },
      ];

    useEffect(() => {
        axios
        .get(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=eur&days=${days}`)
        .then(response => {
          setHistory(response.data)
          console.log('data: ', response.data)
        }).catch(error => console.log(error))
      }, [])

      const useStyles = makeStyles((theme) => ({
        container: {
          width: "75%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 25,
          padding: 40,
          [theme.breakpoints.down("md")]: {
            width: "100%",
            marginTop: 0,
            padding: 20,
            paddingTop: 0,
          },
        },
      }));
    
      const classes = useStyles();
    
      const darkTheme = createTheme({
        palette: {
          primary: {
            main: "#fff",
          },
          type: "dark",
        },
      });
  return (
    <div>
        <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!history | flag===false ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: history.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: history.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in euros`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
    </div>
  )
}

export default Coin