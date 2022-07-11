import React, { useState, useEffect } from "react";

import "./App.css";

import Select from "react-select";
import api from "./service";

import MapImage from "./assets/map.png";


function App() {
  const [countries, setCountries] = useState([]);
  const [initialCountry, setInitialCountry] = useState("");
  const [finalCountry, setFinalCountry] = useState("");
  const [result, setResult] = useState([])

  useEffect(()=>{
    const initCountries = async () => {
      const res = await api.get('/countries');
      const parsedCountries = res.data.countries.map((e)=>{
        return {
          value: e,
          label: e
        }
      })
      setCountries(parsedCountries)
    }

    initCountries();
  },[])

  const findPath = async () => {
    const res = await api.post("find_path", {
      source: initialCountry,
      destination: finalCountry
    })
    setResult(res.data.path);
  }

  return (
    <div className="App">

      <h1>RPG MAP</h1>

      <img src={MapImage} alt="Map" className="Map" />

      <div className="InputContainer">

        <Select
          options={countries}
          placeholder="País inicial"
          onChange={(e)=>{
              setInitialCountry(e.value);
          }}
          className="InputField"
        />

        <Select
          options={countries}
          placeholder="País destino"
          onChange={(e)=>{
              setFinalCountry(e.value);
          }}
          className="InputField"
        />

        <button type="submit" onClick={findPath}>Enviar</button>

      </div>

      <ul>
      <p>Instruções para ir de {initialCountry} para {finalCountry}:</p>
        {result.map((country)=>(
          <li> Vá para {country}</li>
        ))}
      </ul>
       
    </div>
  );
}

export default App;
