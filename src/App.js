// File: src/App.js
import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
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
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Retirement Calculator
        </Typography>
        <Form onSubmit={handleFormSubmit} />
        {aar !== 0 && (
          <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
            Amount at Retirement (AAR): {formatCurrency(aar)}
          </Typography>
        )}
        {yearsToRetireComfortably !== 0 && (
          <Typography variant="h6" component="h3">
            You can retire comfortably for {yearsToRetireComfortably} years.
          </Typography>
        )}
        {results.length > 0 && <Results results={results} formatCurrency={formatCurrency} />}
      </Box>
    </Container>
  );
};

export default App;