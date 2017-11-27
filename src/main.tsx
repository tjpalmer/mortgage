import * as React from 'react';
import {PureComponent} from 'react';
import {render} from 'react-dom';

addEventListener('load', main);

function main() {
  // let loan = {}
  // let calculator = new LoanCalculator(loan);
  let loan: Loan = {months: 0, payment: 0, principal: 0, rate: 0};
  render(<LoanForm loan={loan}/>, document.getElementById('root'));
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

}

class LoanField extends PureComponent<
  {label: string, name: string, step?: string}
> {

  static defaultProps = {
    step: '0.01',
  };

  change = () => {
    console.log(this.props.name, this.input.value);
  };

  input: HTMLInputElement;

  render() {
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
        />
      </td>
    </tr>;
  }

}

class LoanForm extends PureComponent<{loan: Loan}> {

  render() {
    return <div>
      <table>
        <LoanField label='Months' name='months'/>
        <LoanField label='Payment' name='payment'/>
        <LoanField label='Principal' name='principal'/>
        <LoanField label='Rate' name='rate' step='0.005'/>
      </table>
    </div>;
  }

}
