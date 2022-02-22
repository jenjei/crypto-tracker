import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Banner from '../components/Banner'
import { createTheme, 
    TableContainer, 
    TableHead, 
    TextField, 
    ThemeProvider, 
    Table, 
    TableRow, 
    TableCell, 
    TableBody, } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { useNavigate } from 'react-router-dom'


const Homepage = () => {
    const [coins, setCoins] = useState([]) // data
    const [search, setSearch] = useState('') // search input
    const [page, setPage] = useState(1) // pagination

    const navigate = useNavigate()
    useEffect(() => {
        axios
        .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        .then(response => {
          setCoins(response.data)
          console.log('data: ', response.data)
        }).catch(error => console.log(error))
      }, [])

    const darktheme = createTheme({
        palette: {
            primary: {
                main: '#fff',
            },
            type: 'dark',
        },
    });

    const handleChange = (event) => {
        setSearch(event.target.value)
    }

    const filteredCoins = () => {
        return coins.filter(
            (coin) => 
        coin.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    return (
        <ThemeProvider theme={darktheme}>
            <div style= {{textAlign: 'center'}}>
                <Banner />
                <div className='coin-search'>
                    <div className='coin-text'>
                        <TextField 
                        label='Search Currency...' 
                        variant='outlined' 
                        style={{marginBottom: 20, width: '90%', color: 'white', marginTop: 40}}
                        onChange={handleChange}/>
                    </div>
                </div>
                
                <TableContainer >
                    <Table style={{width: '80%', marginLeft: '110px'}}>
                        <TableHead style={{backgroundColor: '#00004d'}}>
                            <TableRow>
                                {['COIN', 'PRICE', '24H CHANGE', 'MARKET CAP' ].map((head) => (
                                <TableCell
                                    style={{
                                        color: 'white',
                                        fontWeight: 600,
                                        fontFamily: 'Arial Black',
                                    }}
                                    align={head === 'COIN' ? '' : 'right'}
                                    key={head}>
                                    {head}
                                </TableCell>
                                ))} 
                            </TableRow>
                            </TableHead>

                            <TableBody>
                            {filteredCoins()
                            .slice((page-1)*10, (page-1)*10+10)
                            .map(row =>{
                                return (
                                    <TableRow onClick={() => navigate(`/coins/${row.id}`)}
                                    key={row.name}>
                                        <TableCell
                                        component='th'
                                        scope='row'
                                        styles={{
                                            display: 'flex',
                                            gap: 15,
                                        }}>
                                        <img
                                        src={row?.image}
                                        alt={row.name}
                                        height='50'
                                         />
                                        <div style={{display: 'flex',flexDirection:'column'}}>
                                            <span
                                            style={{
                                                textTransform: 'uppercase',
                                                fontSize: 18,
                                                fontFamily: 'Arial Black',
                                            }}>{row.symbol}</span>
                                            <span
                                            style={{fontFamily: 'Arial Black'}}>{row.name}</span>
                                        </div>
                                        </TableCell>
                                        <TableCell align='right' style={{fontFamily: 'Arial Black'}}>
                                            {row.current_price.toFixed(2)} €
                                        </TableCell>
                                        <TableCell
                                        align='right'
                                        style= {{
                                            color: row.price_change_percentage_24h > 0 ? 'rgb(14, 203, 129)' : 'red',
                                            fontWeight: 500,
                                            fontFamily: 'Arial Black',
                                        }}>
                                            {row.price_change_percentage_24h.toFixed(2)}%
                                        </TableCell>
                                        <TableCell align='right' style={{fontFamily: 'Arial Black'}}>
                                            {row.market_cap.toString().slice(0, -6)} M €
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                            </TableBody>
                    </Table>
                </TableContainer>
                <Pagination
                style={{
                    padding: 20,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
                count={(filteredCoins()?.length/10).toFixed(0)}
                onChange={(_, value) => {
                    setPage(value);
                    window.scroll(0, 100)
                }} />
            </div>
        </ThemeProvider>
    )
}

export default Homepage