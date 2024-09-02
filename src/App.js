// File: src/App.js
import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import Form from './components/Form';
import Results from './components/Results';
import RetirementChart from './components/RetirementChart';
import { calculateResults, calculateChartData } from './utils/Calculations';

const App = () => {
  const [results, setResults] = useState([]);
  const [aar, setAar] = useState(0);
  const [yearsToRetireComfortably, setYearsToRetireComfortably] = useState(0);
  const [chartData, setChartData] = useState([]); // State for chart data

  const handleFormSubmit = (formValues) => {
    const { aar, results, yearsToRetireComfortably } = calculateResults(formValues);
    setAar(aar);
    setResults(results);
    setYearsToRetireComfortably(yearsToRetireComfortably);

    // Calculate chart data based on the user's input
    const data = calculateChartData(
      formValues.initialInvestment,
      formValues.prr,
      formValues.wr,
      formValues.nyr,
      formValues.eytl,
      formValues.federalTaxRate,
      formValues.stateTaxRate,
      formValues.rir,
      formValues.mwa
    );
    console.log('Generated Chart Data:', data); // Debugging line
    setChartData(data);
  };

  const formatCurrency = (value) => `$${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;

  return (
    <Container maxWidth="md">
    <Typography variant="h2" component="h1" className="app-heading" gutterBottom>
      RETIREMENT CALCULATOR
    </Typography>
    <Box sx={{ my: 4 }}>
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