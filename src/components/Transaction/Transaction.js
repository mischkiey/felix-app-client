import React, { Component } from 'react';
import TransactionsContext from '../../contexts/TransactionsContext';
import TransactionsService from '../../services/transactions-service';
import moment from 'moment';

// import TransactionForm from '../TransactionForm/TransactionForm'

export default class Transaction extends Component {
  static contextType = TransactionsContext;

  async componentDidMount() {
    try {
      const { type, id } = this.props.match.params;
      const transaction = await TransactionsService.getSingleTransaction(type, id);
      console.log(transaction)
      this.context.setTransaction(transaction);
    } 
    catch(error) {
      console.log(error);
    }
  }

  render() {
    const { transaction = {} } = this.context;

    return (
      <article
        className='overview-group'
      >
        <h2
          className='capitalize center'
        >
          {transaction.name}
        </h2>
        <ul
          className='list-group'
        >
          <li
            className='list-item-group no-border'
          >
            <span
              className=''
            >
              Transaction Amount:
            </span>
            <span
              className=''
            >
              $ {transaction.amount}
            </span>
          </li>
          <li
            className='list-item-group no-border'
          >
            <span
              className=''
            >
              Transaction Type:
            </span>
            <span
              className=''
            >
              {transaction.category}
            </span>
          </li>
          <li
            className='list-item-group no-border'
          >
            <span
              className=''
            >
              Transaction Description:
            </span>
            <span
              className=''
            >
              {transaction.description}
            </span>
          </li>
          <li
            className='list-item-group no-border'
          >
            <span
              className=''
            >
              Transaction Date:
            </span>
            <span
              className=''
            >
              {moment(transaction.date_created).format('MM/DD/YYYY')}
            </span>
          </li>
        </ul>
      <button
        className='center greybox-button'
        onClick={() =>
          console.log('Edit')
          // props.history.push(`/goal/edit/${goal.id}`)
        }
      >
        EDIT
      </button>
      <button
        className='center greybox-button'
        onClick={() =>
          console.log('Delete')
          // handleDeleteGoal()
        }
      >
        DELETE
      </button>
    </article>
    )
  }
}

// export default class Transaction extends React.Component {  

//   state = {
//     edit: false,
//   }

//   static defaultProps = {
//     transaction : {
//       amount: "",
//       category: "",
//       date_created: "",
//       description: "",
//       id: 0,
//       name: "",
//       type: "",
//     },
//     handleChange : () => {},
//     history : {
//       push : () => {}
//     },
//     match : {
//       params : {
//         type : '',
//         id : 0
//       }
//     }
//   }

//   toggleEdit = () => {
//     this.setState({ edit: !this.state.edit })
//   }

//   handleDelete = async () => {
//     const {type, id} = this.props.match.params;
//     await TransactionsService.deleteSingleTransaction(type,id)
//     this.props.history.push('/')
//   }

//   handleSubmit = (ev, data) => {
//     ev.preventDefault();
//     this.props.handleChange(data)
//     if (data.type === 'expenses') data.amount *= -1;
//     TransactionsService.updateSingleTransaction(data);
//     this.toggleEdit();
//   }

//   handleCancel = ev => {
//     ev.preventDefault();
//     this.toggleEdit();
//   }

//   renderTransaction = () => {
//     const {name, date_created, amount, category, description } = this.props.transaction;
//     const {type} = this.props.match.params; 
//     return(
//       !this.state.edit ?
//       (
//       <div className='transaction_wrapper'>
//         <div className='transactionInfo_wrapper'>
//           <div className='text_info_divider'>
//           <p className='transaction name'>{name}</p>
//           <p className='transaction date'>{moment(date_created).format('MM/DD/YYYY')}</p>
//           <p className='transaction category'>{category}</p>
//           <p className='transaction description'>{description}</p>
//           </div>
//           <div className='amount_wrapper'>
//             <p className={`transaction ${type} amount`}>${amount}</p>
//           </div>
//         </div>
//         <div className='button_wrapper'>
//           <button
//             onClick={this.toggleEdit}
//             className='btn secondaryBtnALT'
//           >
//             Edit
//           </button>
//           <button
//             onClick={this.handleDelete}
//             className='btn cancel secondaryBtnALT'
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//         )
//         :
//         (
//           <>
//             <TransactionForm
//               handleCancel = {this.handleCancel}
//               handleChange = {this.props.handleChange} 
//               handleSubmit = {this.handleSubmit}
//               transaction = {this.props.transaction} //remove date from props
//               editing = {true}
//             />
//           </>
//         )
//     )
//   }

  
//   render(){
//     return (
//       <div className='formContainer'>
//         {this.renderTransaction()}
//       </div>
//     );
//   }
// }