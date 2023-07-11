import React, { useState } from 'react';
import './Emi.css';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';


Chart.register(ArcElement);

const Emi = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [interestType, setInterestType] = useState('monthly');

  const [emiMonthly, setEmiMonthly] = useState('');
  const [totalPaymentMonthly, setTotalPaymentMonthly] = useState('');
  const [totalInterestMonthly, setTotalInterestMonthly] = useState('');

  const [emiYearly, setEmiYearly] = useState('');
  const [totalPaymentYearly, setTotalPaymentYearly] = useState('');
  const [totalInterestYearly, setTotalInterestYearly] = useState('');

  const data = {
    labels: ['Loan Amount', 'Total Interest Payable', 'Total Payments Made'],
    datasets: [
      {
        data: [loanAmount, totalInterestMonthly, totalPaymentMonthly],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      },
    ],
  };

  const calculateEmi = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100;
    const time = parseFloat(loanTenure);

    const monthlyRate = rate / 12;
    const monthlyTime = time * 12;

    const emiMonthly =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, monthlyTime)) /
      (Math.pow(1 + monthlyRate, monthlyTime) - 1);

    const totalPaymentMonthly = emiMonthly * monthlyTime;
    const totalInterestMonthly = totalPaymentMonthly - principal;

    const emiYearly =
      (principal * rate * Math.pow(1 + rate, time)) /
      (Math.pow(1 + rate, time) - 1);

    const totalPaymentYearly = emiYearly * time;
    const totalInterestYearly = totalPaymentYearly - principal;

    setEmiMonthly(emiMonthly.toFixed(2));
    setTotalPaymentMonthly(totalPaymentMonthly.toFixed(2));
    setTotalInterestMonthly(totalInterestMonthly.toFixed(2));

    setEmiYearly(emiYearly.toFixed(2));
    setTotalPaymentYearly(totalPaymentYearly.toFixed(2));
    setTotalInterestYearly(totalInterestYearly.toFixed(2));
  };

  const handleInterestTypeChange = (e) => {
    setInterestType(e.target.value);
  };

  return (
    <div className="container-fluid" id="main">
      <div className="card" id="main-card">
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <div className="form-container">
            <br/>
                <br/>
              <h2 className="text-center">EMI Calculator</h2>
              <br/>
                <br/>
                <div className="form-group">
                  <label htmlFor="loanAmount" id=''>Loan Amount:</label>
                  <br/>
                  <input
                    type="number"
                    id="loanAmount"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="form-control"
                    aria-describedby="emailHelp"
                  />
                   <br/>
                
                </div>
                <div className="form-group">
                
                
                  <label htmlFor="interestRate">Interest Rate:</label>
                  <br/>
               
                  <input
                    type="number"
                    id="interestRate"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="form-control"
                    aria-describedby="emailHelp"
                  />
                   <br/>
                
                </div>
                <div className="form-group">
                
               
                  <label htmlFor="loanTenure">Loan Tenure (in years):</label>
                  <br/>
                
                  <input
                    type="number"
                    id="loanTenure"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(e.target.value)}
                    className="form-control"
                    aria-describedby="emailHelp"
                  />
                   <br/>
                </div>
                <div className="form-group">
                
                
                  <label htmlFor="interestType">Interest Type:</label>
                  <br/>
                
                  <select
                    id="interestType"
                    value={interestType}
                    onChange={handleInterestTypeChange}
                    className="form-select"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                  <br/>
                </div>
                
                <br/>
                <br/>
                <div className="text-center">
                  <button className="btn btn-info"  onClick={calculateEmi}>
                    Calculate EMI
                  </button>
                </div>
             
            </div>
          </div>
          <div className="col-md-6 text-center" id='chart1' >
            <div  id="chart">
              <div  >
              <ul id='c1'>
               <div className="card" style={{backgroundColor:"#36A2EB",marginRight:"5px",padding:"2px 2px 2px 2px"}}><li>Loan Amount</li></div> 
               <div className="card" style={{backgroundColor:"#FF6384",marginRight:"5px",padding:"2px 2px 2px 2px"}}><li>Interest Rate</li></div>
               <div className="card" style={{backgroundColor:"#FFCE56",marginRight:"5px",padding:"2px 2px 2px 2px"}}><li>Loan Tenure</li></div>
              </ul>
              </div>
              <div id='d1'>
              <Doughnut data={data} />
              </div>
            </div>
          <div >
            <div className="result-container text-center">
               
              {interestType === 'monthly' && emiMonthly && (
                
                <div className="card" id='cardyear'>
                  <h3>Monthly EMI: {emiMonthly}</h3>
                  <p>Total Payment (Monthly): {totalPaymentMonthly}</p>
                  <p>Total Interest (Monthly): {totalInterestMonthly}</p>
                </div>
               
              )}
              {interestType === 'yearly' && emiYearly && (
              
                <div className="card" id='cardyear'>
                  <h3>Yearly EMI: {emiYearly}</h3>
                  <p>Total Payment (Yearly): {totalPaymentYearly}</p>
                  <p>Total Interest (Yearly): {totalInterestYearly}</p>
                </div>
               
              )}
            </div>
          </div>  
          </div>
        </div>
        </div>  
      </div>
    </div>
  );
};

export default Emi;
