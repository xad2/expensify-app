import React from 'react';
import {Link, NavLink} from 'react-router-dom';
const Header = () => (
    <header>
      <h1>Expensify</h1>
      <ul>
        <li><NavLink to="/" activeClassName="is-active" exact>Home</NavLink></li>
        <li><NavLink to="/create" activeClassName="is-active">Create Expense</NavLink></li>
        <li><NavLink to="/help" activeClassName="is-active">Help</NavLink></li>
      </ul>
    </header>
  );

export default Header;