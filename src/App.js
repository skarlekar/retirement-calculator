// File: App.js
import React, { useState } from 'react';
import Form from './components/Form';
import Results from './components/Results';
import { calculateResults } from './utils/Calculations';

const App = () => {
  const [results, setResults] = useState([]);

  const handleFormSubmit = (formValues) => {
    const calculatedResults = calculateResults(formValues);
    setResults(calculatedResults);
  };

  return (
    <div>
      <h1>Retirement Calculator</h1>
      <Form onSubmit={handleFormSubmit} />
      {results.length > 0 && <Results results={results} />}
    </div>
  );
};

export default App;