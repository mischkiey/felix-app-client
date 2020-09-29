import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import TokenService from '../../services/token-service';

import './Header.css';

const Header = () => {
  const { isUserLoggedIn, handleUserLog } = useContext(UserContext);

  // Render logged in state
  // When isUserLoggedIn in UserContext is false
  const renderLoggedInNav = () => {
    return (
      <nav className='headerNav'>
        <Link
          to='/about'
        >
          About
        </Link>
        <Link
          to='/'
        >
          Dashboard
        </Link>
        <Link to='/alerts'>
          Alerts
        </Link>
        <Link
          onClick={() => {
            handleUserLog();
          }}
          to='/'
        >
          Log Out
        </Link>
      </nav>
    )
  }

  // Render logged out state
  // When isUserLoggedIn in UserContext is false
  // const renderLoggedOutNav = () => {
  //   return (
  //     <nav className='headerNav'>
  //       <Link
  //         to='/about'
  //       >
  //         About
  //       </Link>
  //       <Link
  //         to='/login'
  //       >
  //         Log In
  //       </Link>
  //       <Link
  //         to='/register'
  //       >
  //         Signup
  //       </Link>
  //     </nav>
  //   )
  // }

  return (
    <>
      <header
        className='header-group'
      >
        <h1
          className=''
        >
          felix
        </h1>
        <h2
          className=''
        >
          Personal Finance Assistant
        </h2>
        {
          (isUserLoggedIn || TokenService.hasAuthToken())
            ? renderLoggedInNav()
            : ''
        }
      </header>
    </>
  );
}

export default Header;