// File: src/components/Form.js
import React, { useState } from 'react';
import { TextField, Button, Grid, Box } from '@mui/material';

const Form = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState({
    initialInvestment: '',
    prr: '',
    wr: '',
    nyr: '',
    eytl: '',
    federalTaxRate: '',
    stateTaxRate: '',
    rir: '',
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
              label="Initial Investment"
              type="number"
              step="0.01"
              name="initialInvestment"
              placeholder="Initial Investment"
              onChange={handleChange}
              value={formValues.initialInvestment}
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
              label="Expected Years to Live After Retirement"
              type="number"
              name="eytl"
              placeholder="Expected Years to Live After Retirement"
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