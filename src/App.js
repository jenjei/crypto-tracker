import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Coin from './components/Coin'
import './App.css'

function App() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
    .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(response => {
      setCoins(response.data)
      console.log('data: ', coins)
    }).catch(error => console.log(error))
  }, [])

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="coin-app">
      <div className='coin-search'>
        <div className='coin-text'>
          <input type='text' placeholder='Search a Currency' 
          className='coin-input' onChange={handleChange}>
          </input>
        </div>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin 
          key={coin.id} 
          namee={coin.name} 
          image={coin.image}
          symbol={coin.symbol}
          marketcap={coin.market_cap}
          price={coin.current_price}
          priceChange={coin.price_change_percentage_24h}
          volume={coin.total_volume}
          />
        )
      })}
    </div>
  );
}

export default App;
