import React from 'react'
import { useEffect } from 'react'
import { getRecipes } from '../../redux/actions'
import {useDispatch,useSelector} from "react-redux"
import Container from '../../components/container/Container';
import SearchBar from '../../components/searchBar/SearchBar';

function Home({onSearch}) {

  const recipes = useSelector((state)=> state.allRecipes);
  const dispatch = useDispatch();
 
 useEffect  (()=>{
  dispatch(getRecipes())
 },[])

  return (
    <div> 
      <div>
        <SearchBar onSearch={onSearch}/>
      </div>
      <div>
      <Container recipes={recipes}/>
      </div>
    </div>
  )
}

export default Home