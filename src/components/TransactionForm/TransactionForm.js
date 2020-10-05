import React, { Component } from 'react';
import TransactionsContext from '../../contexts/TransactionsContext';
import TransactionsService from '../../services/transactions-service';

class TransactionForm extends Component {
  static contextType = TransactionsContext;

  state = {
    error: null,
  }

  async componentDidMount() {
    const { type, id } = this.props.match.params;
    if(type.includes('edit')) {
      console.log(type.slice(5, type.length))
      try {
        const transaction = await TransactionsService.getSingleTransaction(type.slice(5, type.length), id);
        console.log(transaction);
        this.context.setTransaction(transaction);
      } catch(e) {
        console.log(e);
      }
    }
  }

  // name, description, category, type, amount

  render () {
    const { transaction = {} } = this.context;
    const { type, id } = this.props.match.params;

    return (
      <>
        <h2
          className='capitalize center'
        >
          {type} Transaction
        </h2>
        <form
          className='stretch'
          onSubmit={(e) =>
            console.log(e)
            // handleSubmitForm(e)
          }
        >
        {this.state.error &&
          <div
            className='error'
            role='alert'
          >
            <p>
              {this.state.error}
            </p>
          </div>
        }
        <label
          htmlFor='transaction_name'
        >
          Transaction Name
        </label>
        <input
          aria-label='transaction name'
          className=''
          defaultValue={
            (type.includes('edit'))
            ? transaction.name
            : ''
          }
          id='transaction_name'
          onChange={(e) => {
            console.log(e);
          }}
          placeholder='Input Transaction Name'
          type='text'
          required
        />
        <label
          htmlFor='transaction_amount'
        >
          Transaction Amount
        </label>
        <input
          aria-label='transaction amount'
          className=''
          defaultValue={
            (type.includes('edit'))
            ? transaction.amount
            : ''
          }
          id='transaction_amount'
          min='0'
          onChange={(e) =>
            console.log(e)
          }
          placeholder='Input Transaction Amount'
          // step='0.1'
          type='number'
          required
        />
        <label
          htmlFor='transaction_description'
        >
          Transaction Description
        </label>
        <input
          aria-label='transaction description'
          className=''
          defaultValue={
            (type.includes('edit'))
            ? transaction.description
            : ''
          }
          id='transaction_description'
          onChange={(e) => {
            console.log(e);
          }}
          placeholder='Input Transaction Description'
          type='text'
          required
        />
        
        <button
          className='center greybox-button'
        >
          SUBMIT
        </button>
        <button
          className='center greybox-button'
          onClick={() =>
            this.props.history.push('/')
          }
        >
          CANCEL
        </button>
    </form>
      </>
    )
  }
}

export default TransactionForm;

// export default class TransactionForm extends React.Component {

//   static defaultProps = {
//     handleCancel: () => {},
//     handleSubmit: () => {},
//     editing: false,
//     transaction: {
//       amount: "",
//       category: "",
//       description: "",
//       name: "",
//       type: "",
//     }
//   }; 

// 	state = {
//     amount: "",
//     category: "",
//     description: "",
//     name: "",
//     type: "",
//   };

//   componentDidMount() {
//     if (this.props.transaction) {
//       this.setState({...this.props.transaction})
//     }
//   };

//   handleChange = event => {
//     event.preventDefault();
//     const {name , value} = event.target;
//     this.setState({
//       ...this.state,
//       [name]: event.target.type === 'number' ? parseFloat(value) : value
//     });
//   };

//   renderOptions = arr =>{
//     if(arr.length){
//       return arr.map((item, i) => {
//         return (
//           <option
//           key={i}
//           name={item}
//           value={item}
//           >
//           {item}
//           </option>
//         );
//       });
//     };
//   };



//     render(){
//       //const {name, description, amount, category, type } = this.state 
//       //Unused variables that were previously used to set name={name} of inputs. This was throwing a strange "uncontrolled input/requires defaultValues" error that we haven't fully figured out yet, so I'm leaving them here until then.
//       const { type, name , category, description, amount} = this.state; 
//        //For now this is all we need
//        const optionForType = 
//         type === 'income'
//         ?
//         ['paycheck', 'freelance', 'side_gig', 'other']
//         :
//         ['bills', 'transportation', 'food', 'entertainment', 'other']
//         ;

//         return(
//           <>
//             <h2
//               className='center'
//             >
//               Add/Edit Transaction Form
//             </h2>
//             <form
//               className='transaction_form' 
//               onChange={e => this.handleChange(e)}
//               onSubmit={e => this.props.handleSubmit(e, this.state)}
              
//             >
//                 {
//                   !this.props.editing 
//                   && 
//                   <>
//                     <label htmlFor='transactionType'></label>
//                     <select
//                       onChange={e => this.handleChange(e)}
//                       name='type'
//                       className='transaction_selector transaction__form_type'
//                       required>
//                         <option value=''>select</option>
//                       {this.renderOptions(['income','expenses'])}
//                     </select> 
//                   </>
//                 }
//                 <input 
//                   name='name'
//                   maxLength='50' //lol get dunked in 
//                   placeholder='name'
//                   defaultValue={name}
//                   required
//                   className='transaction_input name_input'/>
//                 <select 
//                   onChange={e => this.handleChange(e)}
//                   name='category'
//                   value={category}
//                   className='transaction_selector transaction__form_category'
//                   required>
//                     <option value=''>select</option>
//                     {this.renderOptions(optionForType)}
//                 </select>
//                 <input
//                   name='description'
//                   maxLength='500'
//                   placeholder='description'
//                   defaultValue={description}
//                   className='transaction_input description_input'/>
//                 <input
//                   name='amount'
//                   type='number'
//                   min='-9999999999'
//                   max='9999999999'
//                   className='transaction_input amount_input'
//                   placeholder='amount'
//                   defaultValue={amount}
//                   step={0.01} precision={2}
//                   required/>
//                   <button
//                   type='submit' 
//                   className='transaction_submit btn secondaryBtnALT'>
//                     Submit
//                   </button>

//                   <button
//                   onClick={this.props.handleCancel} 
//                   className='transaction_form_cancel red_button btn secondaryBtnALT'>
//                     Cancel
//                   </button>
//             </form>
//           </>
//         );
//     };
// };
