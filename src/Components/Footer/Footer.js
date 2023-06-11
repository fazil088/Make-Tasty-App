import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <div className='footer'>
      <h6>
        ©️ {new Date().getFullYear()} | Delecious Food.All rights reserved.
      </h6>
    </div>
  )
}

export default Footer
