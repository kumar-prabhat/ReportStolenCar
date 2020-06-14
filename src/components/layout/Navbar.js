import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-car'></i> SquadCast
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/addcase'>Register Stolen Case</Link>
        </li>
        <li>
          <Link to='/pending'>Pending Cases</Link>
        </li>
        <li>
          <Link to='/resolved'>Resolved Cases</Link>
        </li>
        <li>
          <Link to='/addpolice'>Add Police</Link>
        </li>
        <li>
          <Link to='/allpolice'>All Police</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
