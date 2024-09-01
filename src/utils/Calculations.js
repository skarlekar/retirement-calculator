// File: Calculations.js

// Future Value (FV) function
const FV = (rate, nper, pmt, pv, type = 0) => {
  const pow = Math.pow(1 + rate, nper);
  return -((pv * pow) + (pmt * ((1 + rate * type) * (pow - 1) / rate)));
};

// Payment (PMT) function
const PMT = (rate, nper, pv, fv = 0, type = 0) => {
  if (rate === 0) return -(pv + fv) / nper;
  const pvif = Math.pow(1 + rate, nper);
  const pmt = rate / (pvif - 1) * -(pv * pvif + fv);
  return type === 1 ? pmt / (1 + rate) : pmt;
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
  const MWA = parseFloat(mwa);

  // Formulas
  const AAR = FV(PRR, nyr, -MWA * 12, -initialInvestment, 1); // Amount at Retirement
  const MRI = PMT(WR / 12, eytl * 12, -initialInvestment, 0, 1); // Monthly Retirement Income
  const CVFMI = PV(RIR, eytl, 0, -MWA * 12, 1); // Current Value of First Future Monthly Income
  const NESTEGG = AAR; // Retirement Annual Total at Retirement
  const firstYearBB = NESTEGG; // First Year Beginning Balance

  // Calculate results for each year
  let results = [];
  let beginningBalance = firstYearBB;

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

  return results;
};