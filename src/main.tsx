import * as React from 'react';
import {Component} from 'react';
import {render} from 'react-dom';

addEventListener('load', main);

function main() {
  // let loan = {}
  // let calculator = new LoanCalculator(loan);
  let loan: Loan = JSON.parse(localStorage.getItem('mortgage.loan')!) || {
    months: 0, payment: 0, principal: 0, rate: 0,
  };
  let store = new Store(loan, document.getElementById('root')!);
  store.update();
}

interface Loan {
  months: number;
  payment: number;
  principal: number;
  rate: number;
}

class LoanCalculator {

  constructor(loan: Loan) {
    this.loan = loan;
  }

  loan: Loan;

  updateAmortization() {
    let {loan} = this;
    let {principal, rate} = loan;
    rate /= 12 * 100;
    let payments: Payment[] = [];
    for (let month = 0; month < loan.months; ++month) {
      //
    }
  }

  updatePayment() {
    let {loan} = this;
    let {principal, months, rate} = loan;
    rate /= 12 * 100;
    let payment = principal * rate / (1 - (1 + rate) ** -months);
    payment = Math.ceil(payment * 100) / 100;
    loan.payment = payment;
  }

}

interface Payment {

  interest: number;
  
  principal: number;

}

class Store {

  constructor(loan: Loan, root: HTMLElement) {
    this.loan = loan;
  }

  loan: Loan;

  update() {
    let calculator = new LoanCalculator(this.loan);
    calculator.updatePayment();
    localStorage.setItem('mortgage.loan', JSON.stringify(this.loan));
    render(<LoanForm store={this}/>, document.getElementById('root'));
  }

}

class LoanField extends Component<
  {label: string, name: string, step: number, store: Store}
> {

  change = () => {
    let {name, store} = this.props;
    (store.loan as any)[name] = +this.input.value;
    store.update();
  };

  input: HTMLInputElement;

  render() {
    let {store} = this.props;
    return <tr>
      <td><label>{this.props.label}</label></td>
      <td>
        <input
          min='0'
          onChange={this.change}
          ref={input => this.input = input!}
          name={this.props.name}
          step={this.props.step}
          type='number'
          value={(store.loan as any)[this.props.name]}
        />
      </td>
    </tr>;
  }

}

class LoanForm extends Component<{store: Store}> {

  render() {
    let {store} = this.props;
    return <div>
      <table>
        <LoanField label='Months' name='months' step={1} store={store}/>
        <LoanField label='Payment' name='payment' step={0.01} store={store}/>
        <LoanField
          label='Principal' name='principal' step={0.01} store={store}
        />
        <LoanField label='Rate' name='rate' step={0.125} store={store}/>
      </table>
    </div>;
  }

}
