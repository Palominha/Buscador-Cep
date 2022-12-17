import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import './style.css';

import api from './services/api';
// import { BsSearch } from "react-icons/bs";
function App() {
  const [input, setInput] = useState('')

  const [cep, setCep] = useState({});



  async function handleSearch() {
    //08130060/json/

    if (input === '') {
      alert("Preencha algum CEP!")
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")

    } catch {
      alert("Ops! Erro ao buscar esse CEP. Digite novamente!")
      setInput("")
    }
  }


  return (
    <div>
      <div class="custom-shape-divider-top-1671316892">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
        </svg>
      </div>

      <div className="container">
        <h1 className="title">Buscador de <span>CEP</span></h1>

        <div className="containerinput">
          <input
            type="text"
            placeholder="Digite seu CEP..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button className="buttoninput" onClick={handleSearch}>
            <FiSearch size={25} color="#FFFF" />
          </button>

        </div>

        {Object.keys(cep).length > 0 && (
          <main className="main">
            <h2> CEP: {cep.cep}</h2>

            <span>{cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>{cep.bairro}</span>
            <span> {cep.localidade} - {cep.uf}</span>
          </main>

        )}


      </div>
    </div>
  );
}

export default App;
