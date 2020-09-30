import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import UserService from '../../services/user-service';
import './Overview.css';

class UserOverview extends Component {
  static contextType = UserContext;

  async componentDidMount() {
    try {
      const user = await UserService.getUser();
      this.context.setUser(user);
    }
    catch({ error }) {
      this.context.setError(error);
    }
  }

  render() {
    const { user = {} } = this.context;

    return (
      <section 
        className='main-overview-group'
      >
        <h2
          className=''>
          Balance:
        </h2>
        <p
          className='center'
        >
          $ {user.balance}  
        </p>      
        <h2
          className=''>
          Allowance:
        </h2>
        <p
          className='center'
        >
          $ {user.allowance}  
        </p>
      </section>
    );
  }
}

export default UserOverview;