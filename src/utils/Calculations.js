// File: src/utils/Calculations.js

// Future Value (FV) function
const FV = (rate, nper, pmt, pv, type = 0) => {
  const pow = Math.pow(1 + rate, nper);
  return -((pv * pow) + (pmt * ((1 + rate * type) * (pow - 1) / rate)));
};

// Payment (PMT) function
const PMT = (rate, nper, pv, fv = 0, type = 0) => {
  if (rate === 0) return -(pv + fv) / nper;
  const pvif = Math.pow(1 + rate, nper);
  return (rate * (pv * pvif + fv)) / ((pvif - 1) * (1 + rate * type));
};

// Present Value (PV) function
const PV = (rate, nper, pmt, fv = 0, type = 0) => {
  if (rate === 0) return -(fv + pmt * nper);
  const pvif = Math.pow(1 + rate, nper);
  return -(fv + pmt * (1 + rate * type) * (pvif - 1) / rate) / pvif;
};

// Calculation functions
export const calculateResults = (values) => {
  const {
    initialInvestment,
    prr,
    wr,
    nyr,
    eytl,
    federalTaxRate,
    stateTaxRate,
    rir,
    mwa
  } = values;

  // Convert percentage inputs to decimals
  const PRR = parseFloat(prr) / 100;
  const WR = parseFloat(wr) / 100;
  const FTR = parseFloat(federalTaxRate) / 100;
  const STR = parseFloat(stateTaxRate) / 100;
  const RIR = parseFloat(rir) / 100;
  const II = parseFloat(initialInvestment);
  const MWA = parseFloat(mwa);

  // Calculate Amount at Retirement (AAR)
  const AAR = FV(PRR, nyr, 0, -II, 1);

  // Calculate Monthly Retirement Income (MRI)
  const MRI = PMT(WR / 12, eytl * 12, -II, 0, 1);

  // Calculate results for each year
  let results = [];
  let beginningBalance = AAR;

  for (let year = 1; year <= eytl; year++) {
    const annualGrowth = FV(RIR, 1, 0, -beginningBalance) - beginningBalance;
    const taxes = (FTR + STR) * annualGrowth;
    const annualWithdrawal = MWA * 12;
    const endingBalance = beginningBalance + annualGrowth - taxes - annualWithdrawal;
    const incomeInHand = annualWithdrawal - taxes;

    results.push({
      year,
      beginningBalance,
      annualGrowth,
      taxes,
      annualWithdrawal,
      endingBalance,
      incomeInHand
    });

    beginningBalance = endingBalance;
  }

  return {
    aar: AAR,
    results
  };
};