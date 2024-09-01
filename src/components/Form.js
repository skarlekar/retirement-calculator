// File: Form.js
import React, { useState } from 'react';

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
      <input type="number" step="0.01" name="initialInvestment" placeholder="Initial Investment" onChange={handleChange} required />
      <input type="number" step="0.01" name="prr" placeholder="Pre-retirement Rate of Return (%)" onChange={handleChange} required />
      <input type="number" step="0.01" name="wr" placeholder="Annual Withdrawal Rate (%)" onChange={handleChange} required />
      <input type="number" name="nyr" placeholder="Years to Retirement" onChange={handleChange} required />
      <input type="number" name="eytl" placeholder="Expected Years to Live After Retirement" onChange={handleChange} required />
      <input type="number" step="0.01" name="federalTaxRate" placeholder="Federal Tax Rate (%)" onChange={handleChange} required />
      <input type="number" step="0.01" name="stateTaxRate" placeholder="State Tax Rate (%)" onChange={handleChange} required />
      <input type="number" step="0.01" name="rir" placeholder="Retirement Interest Rate (%)" onChange={handleChange} required />
      <input type="number" step="0.01" name="mwa" placeholder="Monthly Withdrawal Amount" onChange={handleChange} required />
      <button type="submit">Calculate</button>
    </form>
  );
};

export default Form;