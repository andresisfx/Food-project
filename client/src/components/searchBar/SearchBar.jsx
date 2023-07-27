import React from 'react'
import { useEffect,useState } from 'react'
import { useDispatch } from 'react-redux'
import { getRecipes, searchName } from '../../redux/actions'

function SearchBar() {
 const dispatch = useDispatch()
 const [recipeName,setRecipename]= useState("");
 const [errors,setErrors] = useState();



  const handlerSubmit =(event)=>{
    event.preventDefault();
    dispatch(searchName(recipeName))
    setRecipename("")
 }
  const handleChange = (event)=>{
   setRecipename(event.target.value)
  }
 
  return (
    <div>
     <form onSubmit={handlerSubmit}>
      <input 
      type="text"
      placeholder='Search recipe'
      value={recipeName}
      onChange={handleChange}
       />
       <button type='submit'>Search</button>
     </form>
    </div>
  )
}

export default SearchBar