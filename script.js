document.addEventListener("DOMContentLoaded", function () {
    // Select DOM Elements
    const elements = {
      mortgageAmount: document.getElementById("mortgage-amount"),
      mortgageTerm: document.getElementById("mortgage-term"),
      interestRate: document.getElementById("interest-rate"),
      repaymentType: document.getElementsByName("mortgage-type"),
      calcButton: document.getElementById("calc-repayments"),
      clearButton: document.getElementById("clear-all"),
      resultDisplay: document.querySelector(".results-after")
    };
  
    /** Utility Functions */
    const calculateRepaymentMortgage = (loanAmount, rate, years) => {
      const months = years * 12;
      const monthlyRate = rate / 12;
      return (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    };
  
    const calculateInterestOnlyMortgage = (loanAmount, rate) => loanAmount * rate / 12;
  
    const getSelectedMortgageType = () => {
      for (const type of elements.repaymentType) {
        if (type.checked) return type.value;
      }
      return null;
    };
  
    /** Handle Mortgage Calculation */
    const handleCalculation = () => {
      const loanAmount = parseFloat(elements.mortgageAmount.value) || 0;
      const termYears = parseInt(elements.mortgageTerm.value) || 0;
      const rate = parseFloat(elements.interestRate.value) / 100 || 0;
  
      const selectedType = getSelectedMortgageType();
  
      if (!selectedType) {
        alert("Please select a mortgage type before calculating!");
        return;
      }
  
      if (loanAmount <= 0 || termYears <= 0 || rate <= 0) {
        alert("Please enter valid mortgage amount, term, and rate values.");
        return;
      }
  
      if (selectedType === "repayment") {
        const monthlyRepayment = calculateRepaymentMortgage(loanAmount, rate, termYears);
  
        elements.resultDisplay.innerHTML = `
          <div class="results-calculation">
            <h3>Repayment Mortgage</h3>
            <p><strong>Loan Amount:</strong> $${loanAmount.toFixed(2)}</p>
            <p><strong>Term:</strong> ${termYears} years</p>
            <p><strong>Interest Rate:</strong> ${rate * 100}%</p>
            <p><strong>Monthly Repayment:</strong> $${monthlyRepayment.toFixed(2)}</p>
          </div>
        `;
      } else if (selectedType === "interest-only") {
        const monthlyInterest = calculateInterestOnlyMortgage(loanAmount, rate);
  
        elements.resultDisplay.innerHTML = `
          <div class="results-calculation">
            <h3>Interest-Only Mortgage</h3>
            <p><strong>Loan Amount:</strong> $${loanAmount.toFixed(2)}</p>
            <p><strong>Interest Rate:</strong> ${rate * 100}%</p>
            <p><strong>Monthly Interest Payment:</strong> $${monthlyInterest.toFixed(2)}</p>
          </div>
        `;
      }
  
      elements.resultDisplay.style.display = "block";
    };
  
    /** Handle Clearing the Form */
    const clearForm = () => {
      elements.mortgageAmount.value = "";
      elements.mortgageTerm.value = "";
      elements.interestRate.value = "";
      for (const type of elements.repaymentType) {
        type.checked = false;
      }
  
      elements.resultDisplay.innerHTML = `
        <p>Results cleared. Please fill out the form and click "Calculate Repayments" to calculate again.</p>
      `;
      elements.resultDisplay.style.display = "none";
    };
  
    /** Add Event Listeners */
    const addEventListeners = () => {
      elements.calcButton.addEventListener("click", (e) => {
        e.preventDefault();
        handleCalculation();
      });
  
      elements.clearButton.addEventListener("click", () => {
        clearForm();
      });
    };
  
    /** Initialize */
    const init = () => {
      addEventListeners();
      elements.resultDisplay.style.display = "none"; // Start with no visible results
    };
  
    init();
  });
  