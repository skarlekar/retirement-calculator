// File: src/App.js
import React, { useState } from 'react';
import Form from './components/Form';
import Results from './components/Results';
import { calculateResults } from './utils/Calculations';

const App = () => {
  const [results, setResults] = useState([]);
  const [aar, setAar] = useState(0);

  const handleFormSubmit = (formValues) => {
    const { aar, results } = calculateResults(formValues);
    setAar(aar);
    setResults(results);
  };

  return (
    <div>
      <h1>Retirement Calculator</h1>
      <Form onSubmit={handleFormSubmit} />
      {aar !== 0 && <h2>Amount at Retirement (AAR): ${aar.toFixed(2)}</h2>}
      {results.length > 0 && <Results results={results} />}
    </div>
  );
};

export default App;