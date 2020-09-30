import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import TokenService from '../../services/token-service';

import './Header.css';

const Header = () => {
  const { isUserLoggedIn, handleUserLog } = useContext(UserContext);

  // Render logged in state
  // When isUserLoggedIn in UserContext is false
  const renderLoggedInHeader = () => {
    return (
      <header
        className='header-group'
      >
        <h1
          className='logged-in-h1'
        >
          felix
        </h1>
        <nav
          className='nav-group'
        >
          <Link
            to='/'
          >
            dashboard
          </Link>
          <Link to='/alerts'>
            alerts
          </Link>
          <Link
            to='/about'
          >
            about
          </Link>
          <Link
            onClick={() => {
              handleUserLog();
            }}
            to='/'
          >
            logout
          </Link>
        </nav>
      </header>
    )
  }

  // Render logged out state
  // When isUserLoggedIn in UserContext is false
  const renderLoggedOutHeader = () => {
    return (
      <header
        className='header-group header-padding-top'
      >
        <h1
          className='logged-out-h1'
        >
          felix
        </h1>
        <h2
          className='tagline'
        >
          Personal Finance Assistant
        </h2>
        {/* <nav className='headerNav'>
          <Link
            to='/about'
          >
            About
          </Link>
          <Link
            to='/login'
          >
            Log In
          </Link>
          <Link
            to='/register'
          >
            Signup
          </Link>
        </nav> */}
      </header>
    )
  }

  return (
    <>
      {
        (isUserLoggedIn || TokenService.hasAuthToken())
          ? renderLoggedInHeader()
          : renderLoggedOutHeader()
      }
    </>
  );
}

export default Header;