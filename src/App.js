import { useState } from 'react';
import './App.css';
import axios from 'axios';
import { useEffect } from 'react';

function App() {
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'v', 'w', 'y', 'z'];
  const [coktails, setCoktails] = useState([]);
  const [apiLetter, setApiLetter] = useState('a');
  const [inpValue, setInpValue] = useState('');

  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${apiLetter}`;

  useEffect(() => {
    axios(URL).then((response) => {
      const res = response.data;
      setCoktails(res.drinks);
    })
  }, [URL])

  const cursor = { cursor: 'pointer' };
  const letters = document.querySelectorAll('span');
  const handleLetterClick = (e) => {
    setApiLetter(e.target.innerText.toLowerCase());
  }
  for (let letter of letters) {
    letter.addEventListener('click', (e) => handleLetterClick(e))
  }

  return (
    <div className="App">
      <h1>Coktails</h1>
      {alphabet.map((elem, index) => (
        <span key={index + 's'} style={cursor} onClick={(e) => handleLetterClick(e)}>{elem.toUpperCase() + ' '}</span>
      ))}
      {coktails.map((coktail, index) => (
        <div key={index}>
          <h4>{coktail.strDrink}</h4>
          <p>{coktail.strCategory}</p>
          <img src={coktail.strDrinkThumb} style={{ maxWidth: '250px' }} alt='coc'></img>
          <p>{coktail.strInstructions}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
