import React  from 'react'
import { useState,useEffect } from "react"
import { useDispatch,useSelector } from 'react-redux'
import { getDiets } from '../../redux/actions';
import { Link } from 'react-router-dom';
import axios from 'axios';
import style from "./Form.module.css"
function Form() {
  const allDiets = useSelector((state)=>state.allDiets);
  const dispatch = useDispatch();
  const [errors,setErrors]=useState({
    name:"please fiil the field",
    image:"please fiil the field",
    healthScore:"please fiil the field",
    summaryOfDish:"please fiil the field",
    diets:"select at least a diet",
    stepByStep:"at least one instruction is required"
  });
  const [input,setInput] = useState({ 
    name:"",
    image:"",
    healthScore:"",
    summaryOfDish:"",
    diets:[],
    stepByStep:[],
    instruction:""

  })
 
  useEffect(()=>{
    dispatch(getDiets())
  },[dispatch])
  
  const handleChange= (event)=>{
    
    setInput({...input,[event.target.name]:event.target.value})
    validate(event)
  }
 
  const addInstruction = (event) => {
    event.preventDefault();
    if (input.instruction.trim().length > 0) {
      setInput((prevInput) => ({
        ...prevInput,
        stepByStep: [...prevInput.stepByStep, {name:input.instruction.trim()}],
        instruction: "",
      }));
  
      setErrors((errors) => ({
        ...errors,
        stepByStep: "",
      }));
    } else {
      setErrors((errors) => ({
        ...errors,
        stepByStep: "at least one instruction is required",
      }));
    }
  };
  
  const handlerCheckBox =(id,checked)=>{
    const findIndex =checked.indexOf(id)
    if(findIndex>-1){
      checked.splice(findIndex,1)
    }
    else{
      checked.push(id)
    }
    return checked
  }
 
  const handleChangeDiets = (name) => {
    setInput((prevInput) => {
      const updatedDiets = handlerCheckBox(name, [...prevInput.diets]);
  
      if (updatedDiets.length) {
        setErrors((prevErrors) => ({ ...prevErrors, diets: "" }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, diets: "Select a diet" }));
      }
  
      return { ...prevInput, diets: updatedDiets };
    });
  };


  
  const isChecked= (name)=>{
    
    return input.diets.includes(name)
  }
  const validate=(event)=>{
    const value= event.target.value
    const property = event.target.name
    if(property=== "name"){
      const regex=/^(?!\s*$).+/;
      
      if(!regex.test(value)){
        setErrors((prevErrors)=>({...prevErrors,name:"Only leters are allowed"}))
      }
      else{
        setErrors((prevErrors)=>({...prevErrors,name:""}))
      }     
      }
      if(property=== "image"){
        const regex=/^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/;
        if(!regex.test(value)){
          setErrors((prevErrors)=>({...prevErrors,image:"Invalid URL"}))
        }
        else{
          setErrors((prevErrors)=>({...prevErrors,image:""}))
        }       
        }
       if (property === "healthScore") {
          const valueNum = parseInt(value)
          if (valueNum < 1 || valueNum > 100||!valueNum) {
            setErrors((prevErrors) => ({ ...prevErrors, healthScore: "only numbers from 1 to 100 are allowed" }));
          } else {
            setErrors((prevErrors) => ({ ...prevErrors, healthScore: "" }));
          }
        }
       if(property=== "summaryOfDish"){
          const regex = /^(?!\s*$).+/;
        if(!regex.test(value)){
         setErrors((prevErrors)=>({...prevErrors,summaryOfDish:"This field is required"}))
           }
         else{
            setErrors((prevErrors)=>({...prevErrors,summaryOfDish:""}))
           }
        }
    }
    
    
  
   
  const handleSubmit=(event)=>{
   event.preventDefault();
 
   if(errors.name||
      errors.image||
      errors.healthScore||
      errors.summaryOfDish||
      errors.diets||
      errors.stepByStep){
    alert("please verify your information")
    return;
   }
   console.log(input)
   axios.post("http://localhost:3001/recipes",{
    name:input.name,
    stepByStep:input.stepByStep.map((instruction) => instruction.name),
    image:input.image,
    healthScore:input.healthScore,
    summaryOfDish:input.summaryOfDish,
    diets:input.diets
  }) 
   .then((res)=>{
    alert("recipe registered succesfully")
  
   })
   .catch((error)=>{
    if(error.response){
      console.error("Error processing the request:",error.response.data)
    }
    else{
      console.error("Error processing the request: ",error.message)
    }
   })
   .finally(() => {
    setInput({
      name:"",
      image:"",
      healthScore:"",
      summaryOfDish:"",
      diets:[],
      stepByStep:[],
      instruction: "",
    });
    setErrors({
      name:"please fiil the field",
      image:"please fiil the field",
      healthScore:"please fiil the field",
      summaryOfDish:"please fiil the field",
      diets:"select at least a diet",
      stepByStep:"at least one instruction is required"
    })
  });
   

  }
 
 
  console.log(input)
  return (
    <form onSubmit={handleSubmit}>
      <div>
       <input type="text" placeholder="Name: (max: 100 letters)" name="name" value={input.name} onChange={handleChange} />
       {errors.name&&<p className={style.errorText}>{errors.name}</p>}
       <input type="text" placeholder="image url" name="image" value={input.image} onChange={handleChange} />
       {errors.image&&<p className={style.errorText}>{errors.image}</p>}
       <input type="number" placeholder="HealthScore: (min:1 max:100 points )" name="healthScore" value={input.healthScore} onChange={handleChange} />
       {errors.healthScore&&<p className={style.errorText}>{errors.healthScore}</p>}
       <textarea placeholder="summaryOfDish: (max: 500 characters)" name='summaryOfDish' value={input.summaryOfDish} onChange={handleChange}  cols="30" rows="10"></textarea>
       {errors.summaryOfDish&&<p className={style.errorText}>{errors.summaryOfDish}</p>}
      </div>
      <div>
        <h3>Choose yourdiet type</h3>
        {Array.isArray(allDiets)&&allDiets.map((diet)=>(
          <div key={diet.name}>
            <input
             type="checkbox"
             id={`check-${diet.name}`}
             name='diets'
             onChange={()=>handleChangeDiets(diet.name)} // ()=>  handlerDiets will be executed only when the event occurs, instead of executing it immediately.
             checked={isChecked(diet.name)} />
             <label  htmlFor={`check-${diet.name}`}>{diet.name}</label>
          </div>
        ))}
        {errors.diets&&<p className={style.errorText}>{errors.diets}</p>}
      </div>
      <div>
        <h3>Add stepByStep: </h3>
        <input type="text" name='instruction' value={input.instruction} onChange={handleChange} />
        <button onClick={addInstruction}>Add</button>
        {input.stepByStep.map((ins,index)=><input value={ins.name} key={index} disabled/>)}
        {errors.stepByStep&&<p className={style.errorText}>{errors.stepByStep}</p>}
      </div>
      <div>
        <Link to="/home">
          <button>Back home</button>
        </Link>
          <button type='submit'>Create recipe</button> 
      </div>
    </form>
  )
}

export default Form
