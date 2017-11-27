import * as React from 'react';
import {render} from 'react-dom';

addEventListener('load', main);

function main() {
  // let loan = {}
  // let calculator = new LoanCalculator(loan);
  render(<div>Hello, world!</div>, document.getElementById('root'));
}

interface Loan {
  months: number;
  payment?: number;
  principal: number;
  rate: number;
}

class LoanCalculator {

  constructor(loan: Loan) {
    this.loan = loan;
  }

  loan: Loan;

}
