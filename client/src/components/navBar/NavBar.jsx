import React from 'react'
import { Link } from 'react-router-dom'
import style from "./NavBar.module.css"

function NavBar() {
  return (
    <div className={style.navContent}>
        <div className={style.navButton}>
         <Link className={style.link} to="/"><p>Landing page</p></Link>
         <Link className={style.link} to="/home"><p>Home</p></Link>
         <Link className={style.link} to="/create"><p>Create activity</p></Link>
        </div>
    </div>
  )
}

export default NavBar