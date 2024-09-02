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
    mwa,
    amp  // Include AMP in calculation
  } = values;

  // Convert percentage inputs to decimals
  const PRR = parseFloat(prr) / 100;
  const WR = parseFloat(wr) / 100;
  const FTR = parseFloat(federalTaxRate) / 100;
  const STR = parseFloat(stateTaxRate) / 100;
  const RIR = parseFloat(rir) / 100;
  const II = parseFloat(initialInvestment);
  const MWA = parseFloat(mwa);
  const AMP = parseFloat(amp);

  // Calculate Amount at Retirement (AAR) using AMP
  const AAR = FV(PRR, nyr, -12 * AMP, -II, 1);

  // Calculate Monthly Retirement Income (MRI)
  const MRI = PMT(WR / 12, eytl * 12, -II, 0, 1);

  let results = [];
  let beginningBalance = AAR;
  let yearsToRetireComfortably = 0;

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

    if (endingBalance > 0) {
      yearsToRetireComfortably = year;
    } else {
      break;
    }

    beginningBalance = endingBalance;
  }

  return {
    aar: AAR,
    results,
    yearsToRetireComfortably
  };
};


export const calculateChartData = (initialInvestment, prr, wr, nyr, eytl, federalTaxRate, stateTaxRate, rir, mwa) => {
  const data = [];
  const maxAMP = 5000; // Define a maximum AMP value for chart purposes
  const increment = 500; // Increment AMP by $500 for each data point

  for (let amp = 0; amp <= maxAMP; amp += increment) {
    let remainingFunds = initialInvestment;
    let totalNeeded = 0;
    let year = 0;
    let canRetire = true;

    while (year < eytl && canRetire) {
      const annualGrowth = FV(rir / 100, 1, 0, -remainingFunds) - remainingFunds;
      const taxes = (federalTaxRate / 100 + stateTaxRate / 100) * annualGrowth;
      const annualWithdrawal = mwa * 12;
      const endingBalance = remainingFunds + annualGrowth - taxes - annualWithdrawal - (amp * 12);

      // Check if calculations result in negative or NaN values
      if (isNaN(annualGrowth) || isNaN(taxes) || isNaN(annualWithdrawal) || isNaN(endingBalance)) {
        canRetire = false;
        break;
      }

      // Update funds and check if they are exhausted
      if (endingBalance <= 0) {
        canRetire = false;
        break;
      }

      remainingFunds = endingBalance; // Update remaining funds for next iteration
      totalNeeded += annualWithdrawal + taxes; // Accumulate total needed per year
      year++;
    }

    data.push({
      amp, // Additional monthly payment
      yearsOfRetirement: year, // Years the funds will last
      totalNeeded: year > 0 ? totalNeeded : 0 // Total amount needed to last the lifetime
    });
  }

  return data;
};