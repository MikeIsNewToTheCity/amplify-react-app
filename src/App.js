import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { API } from 'aws-amplify';
import { response } from '../amplify/backend/function/cryptofunction/src/app';

const App = () => {

  const [coins, updateCoins] = useState([]);

  const fetchCoins = async () => {
    try {
      const data = await API.get('cryptoapi', `/coins?limit=${input.limit}&start=${input.start}`);
      updateCoins(data.coins);
    }
    catch(err) {
      console.error(err);
    }
  }  

  // const fetchCoinsn = () => {
  //   API.get('cryptoapi', `/coins?limit=${input.limit}&start=${input.start}`)
  //   .then(response => {
  //     console.log(response)
  //     updateCoins(response.coins);
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   });
  // }

  useEffect(
    () => {
      fetchCoins();
    }
    , []
  );

  const [input, updateInput] = useState({ limit: 5, start: 0 })

  const updateInputValues = (type, value) => {
    updateInput({ 
      ...input
      , [type]: value 
    });
  }



  return (
    <div className = "App">
      <input 
        placeholder='Start with...'
        onChange={ e => updateInputValues('start', e.target.value) }
      />
      <input 
        placeholder='Limit to...'
        onChange={ e => updateInputValues('limit', e.target.value) }
      />
      <button
        onClick={fetchCoins}
      >
        Fetch Coins
      </button>

      {
        coins.map(x => (
          <div
            key={ x.symbol }
          >
            <h2>
              { x.name } - {x.symbol}
            </h2>
            <h5>
              ${ x.price_usd }
            </h5>
          </div>
        ))
      }
    </div>
  );
}

export default App;
