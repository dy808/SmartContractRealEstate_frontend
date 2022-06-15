import React, { useContext, useEffect } from 'react'

import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { auth } from '../Config/Config'

export const Welcome =  () => {

  
    

    return (
        <>

        <div className='Welcome'>
           
                        <Link to='/Home' className='cashout-link'>
                            <button className='btn btn-success btn-md'>
                                Continue
                        </button>
                        </Link>
                        </div>
        </>
    )
}