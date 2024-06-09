import React,{useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import './nav.css'
import axios from 'axios';

const userLogout=()=>{
  axios.get('/user/logout')
  .then(res=>{
    console.log(res)
    window.location.reload()
  })
  .catch((err)=>console.log(err))
}

const Navbar = ({name}) => {
  const [open,setOpen]=useState(false)
  return (
    <>
    <nav>
      <NavLink to="/" style={({ isActive }) => { return isActive ? { color: "aquamarine" } : {}; }}>
        <h5>Vault</h5>
      </NavLink>
      <NavLink to="/add" style={({ isActive }) => { return isActive ? { color: "aquamarine" } : {}; }}>
        Add Accounts
      </NavLink>
      <NavLink to="/edit" style={({ isActive }) => { return isActive ? { color: "aquamarine" } : {}; }}>
        Edit Accounts
      </NavLink>
      <NavLink onClick={()=>userLogout()} >
        {name}
      </NavLink>
    </nav>
    </>
  );
};

export default Navbar;