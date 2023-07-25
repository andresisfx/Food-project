import React from 'react'
import { useEffect } from 'react'
import { getRecipes } from '../../redux/actions'
import {useDispatch,useSelector} from "react-redux"
import Container from '../../components/container/Container';

function Home() {

  const recipes = useSelector((state)=> state.allRecipes);
  const dispatch = useDispatch();

 useEffect  (()=>{
  dispatch(getRecipes())
 },[])
 console.log(recipes)
  return (
    <div>
      <Container recipes={recipes}/>
    </div>
  )
}

export default Home