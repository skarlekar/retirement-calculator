// File: src/components/Form.js
import React, { useState } from 'react';
import { TextField, Button, Grid, Box } from '@mui/material';

const Form = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState({
    initialInvestment: '',
    amp: '',
    prr: '5',  // Default value: 5
    wr: '4',   // Default value: 4
    nyr: '5',  // Default value: 5
    eytl: '20', // Default value: 20
    federalTaxRate: '25', // Default value: 25
    stateTaxRate: '6',   // Default value: 6
    rir: '3',  // Default value: 3
    mwa: ''
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Current Savings"
              type="number"
              step="0.01"
              name="initialInvestment"
              placeholder="Current Savings for Retirement"
              onChange={handleChange}
              value={formValues.initialInvestment}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Additional Monthly Payment"
              type="number"
              step="0.01"
              name="amp"
              placeholder="Additional Monthly Payment"
              onChange={handleChange}
              value={formValues.amp}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Pre-retirement Rate of Return (%)"
              type="number"
              step="0.01"
              name="prr"
              placeholder="Pre-retirement Rate of Return (%)"
              onChange={handleChange}
              value={formValues.prr}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Annual Withdrawal Rate (%)"
              type="number"
              step="0.01"
              name="wr"
              placeholder="Annual Withdrawal Rate (%)"
              onChange={handleChange}
              value={formValues.wr}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Years to Retirement"
              type="number"
              name="nyr"
              placeholder="Years to Retirement"
              onChange={handleChange}
              value={formValues.nyr}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Expected No. of Years to Enjoy Retirement Savings"
              type="number"
              name="eytl"
              placeholder="Expected No. of Years to Enjoy Retirement Savings"
              onChange={handleChange}
              value={formValues.eytl}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Federal Tax Rate (%)"
              type="number"
              step="0.01"
              name="federalTaxRate"
              placeholder="Federal Tax Rate (%)"
              onChange={handleChange}
              value={formValues.federalTaxRate}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="State Tax Rate (%)"
              type="number"
              step="0.01"
              name="stateTaxRate"
              placeholder="State Tax Rate (%)"
              onChange={handleChange}
              value={formValues.stateTaxRate}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Retirement Interest Rate (%)"
              type="number"
              step="0.01"
              name="rir"
              placeholder="Retirement Interest Rate (%)"
              onChange={handleChange}
              value={formValues.rir}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Monthly Withdrawal Amount"
              type="number"
              step="0.01"
              name="mwa"
              placeholder="Monthly Withdrawal Amount"
              onChange={handleChange}
              value={formValues.mwa}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Calculate
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default Form;