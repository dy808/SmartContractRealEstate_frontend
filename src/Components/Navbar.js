import React, { useContext } from 'react'
import logo from '../images/home.png'
import { Link } from 'react-router-dom'
import { auth } from '../Config/Config'
import { Icon } from 'react-icons-kit'
import { cart } from 'react-icons-kit/entypo/cart'
import {home} from 'react-icons-kit/ionicons/home';
import { useHistory } from 'react-router-dom'
import { CartContext } from '../Global/CartContext'

export const Navbar = ({ user }) => {

    const history = useHistory();
    const { totalQty } = useContext(CartContext);

   

    return (
        <div className='navbox'>
            <div className='leftside'>
                <img src={logo} alt="" />
            </div>
            
            {<div className='rightside'>
              
                <span><Link to="/addProducts" className='navlink'><Icon icon={home} /></Link></span>
                
              
            </div>}
        </div>
    )
}
