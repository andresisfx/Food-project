import React from 'react'
import { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { searchName } from '../../redux/actions'
import style from "./SearchBar.module.css"
function SearchBar() {
 const dispatch = useDispatch()
 const errorState= useSelector((state)=>state.errorState)
 const [recipeName,setRecipename]= useState("");
 const [errors,setErrors] = useState();

 

  const handlerSubmit =(event)=>{
    event.preventDefault();
    dispatch(searchName(recipeName))
    setRecipename("")
   }
  const handleChange = (event)=>{
   setRecipename(event.target.value)
   validate(event.target.value)
   !event.target.value&& setErrors("")
   
   }

  const validate = (text)=>{
    const regex = new RegExp(/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/);
   !regex.test(text)?setErrors("only leters are allowed"):setErrors("") 
  }
  
 
  return (
    <div>
     <form onSubmit={handlerSubmit}>
      <input
      className={style.input} 
      type="text"
      placeholder='Search recipe'
      value={recipeName}
      onChange={handleChange}
       />
       {errors&&<p className={style.message}>{errors}</p>}
       <button type='submit'>Search</button>
     </form>
    </div>
  )
}

export default SearchBar