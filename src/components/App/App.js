import React from 'react';
import { Switch } from 'react-router-dom';

// Util Components
import Header from '../Header/Header';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute';

// Main Components
import DashboardRoute from '../../routes/DashboardRoute';
import GoalsRoute from '../../routes/GoalsRoute';
import GoalRoute from '../../routes/GoalRoute';
import GoalFormRoute from '../../routes/GoalFormRoute';
import CreateTransactionRoute from '../../routes/CreateTransactionRoute';
import TransactionsRoute from '../../routes/TransactionsRoute';
import TransactionRoute from '../../routes/TransactionRoute';
import AlertsRoute from '../../routes/AlertsRoute';

// Authentication & Registration Components
import LoginRoute from '../../routes/LoginRoute';
import RegistrationRoute from '../../routes/RegistrationRoute';
// import LandingRoute from '../../routes/LandingRoute';

import './App.css';

const App = () => {

  return (
    <div
      className='wrapper'
    >
      <Header />
      <main>
        <Switch>
          <PrivateRoute
            exact
            path={'/'}
            comp={DashboardRoute}
          />
    
          <PrivateRoute
            exact
            path={'/goals'}
            comp={GoalsRoute}
          />

          <PrivateRoute
            path={'/goal/add'}
            comp={GoalFormRoute}
          />

          <PrivateRoute
            path={'/goal/:type/:id'}
            comp={GoalFormRoute}
          />

          <PrivateRoute
            exact
            path={'/goal/:id'}
            comp={GoalRoute}
          />
    
          <PrivateRoute 
            path={'/alerts'}
            comp={AlertsRoute}
          />

          <PrivateRoute
            path={'/createtransaction'}
            comp={CreateTransactionRoute}
          />

          <PrivateRoute
            path={'/transactions'}
            comp={TransactionsRoute}
          />

          <PrivateRoute
            path={'/transaction/:type/:id'}
            comp={TransactionRoute}
          />

          <PublicOnlyRoute
            path={'/login'}
            comp={LoginRoute}
          />

          <PublicOnlyRoute
            path={'/register'}
            comp={RegistrationRoute}
          />

          {/* <Route
            path={'/about'}
            component={LandingRoute}
          /> */}

        </Switch>
      </main>
    </div>
  );
};

export default App;
