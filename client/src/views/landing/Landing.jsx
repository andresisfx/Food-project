import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div>
      welcome to countries app
      <div>
        <Link to="/home"><p>Home</p></Link>
      </div>
    </div>
  )
}

export default Landing