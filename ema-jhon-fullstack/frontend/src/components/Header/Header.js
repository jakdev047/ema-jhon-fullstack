import React, {  } from 'react';

import logo from '../../images/logo.png';

import './Header.css';
import Auth from '../Login/useAuth';

const Header = () => {
  // context api use
  const auth = Auth();
  return (
    <div className="header">
      <img src={logo} alt="logo"/>
      <nav>
        <a href="/shop">Shop</a>
        <a href="/review">Order Review</a>
        <a href="/inventory">Inventory</a>
        {
          auth.user && <span style={{color:'#eb1b33'}}>{auth.user.name}</span> 
        }

        {
          auth.user ? <a href="/login">Sign Out</a> : <a href="/login">SignIn</a>
        }
      </nav>
    </div>
  );
}

export default Header;