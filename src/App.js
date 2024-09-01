// File: src/App.js
import React, { useState } from 'react';
import Form from './components/Form';
import Results from './components/Results';
import { calculateResults } from './utils/Calculations';

const App = () => {
  const [results, setResults] = useState([]);
  const [aar, setAar] = useState(0);
  const [yearsToRetireComfortably, setYearsToRetireComfortably] = useState(0);

  const handleFormSubmit = (formValues) => {
    const { aar, results, yearsToRetireComfortably } = calculateResults(formValues);
    setAar(aar);
    setResults(results);
    setYearsToRetireComfortably(yearsToRetireComfortably);
  };

  const formatCurrency = (value) => `$${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;

  return (
    <div>
      <h1>Retirement Calculator</h1>
      <Form onSubmit={handleFormSubmit} />
      {aar !== 0 && <h2>Amount at Retirement (AAR): {formatCurrency(aar)}</h2>}
      {yearsToRetireComfortably !== 0 && <h3>You can retire comfortably for {yearsToRetireComfortably} years.</h3>}
      {results.length > 0 && <Results results={results} formatCurrency={formatCurrency} />}
    </div>
  );
};

export default App;