import React  from 'react'
import { useState,useEffect } from "react"
import { useDispatch,useSelector } from 'react-redux'
import { getDiets } from '../../redux/actions';
import { Link } from 'react-router-dom';
function Form() {
  const allDiets = useSelector((state)=>state.allDiets);
  const dispatch = useDispatch();
  const [errors,setErrors]=useState({
    name:"",
    image:"",
    healthScore:"",
    summaryOfDish:"",
    diets:[],
    stepByStep:[]
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
  const addInstruction = (event)=>{
    event.preventDefault()
    if(input.instruction.length>0){
      const savedstepByStep = input.stepByStep;
      savedstepByStep.push({name:input.instruction})
      setInput({...input,[input.stepByStep]:savedstepByStep})
      setInput({...input,instruction:""})

    }
  }
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
  const handleChangeDiets = (name)=>{
    setInput({...input,diets:handlerCheckBox(name,[...input.diets])})
  }
  const isChecked= (name)=>{
    return input.diets.includes(name)
  }
  const validate=(event)=>{
    const value= event.target.value
    const property = event.target.name
    if(property=== "name"){
      const regex=/^[A-Za-z\s]+$/;
      if(!regex.test(value)){
        setErrors({...errors,name:"only leters are allowed"})
      }
     
      }
      if(property=== "image"){
        const regex=/^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/;
        if(!regex.test(value)){
          setErrors({...errors,image:"invalid URL"})
        }
       
        }
        if(property=== "healthScore"){
          
          if(Number.isInteger(value)){
            setErrors({...errors,image:"invalid URL"})
          }
         
          }
    }
    
    
  
   
  // const onSubmit=(event)=>{
  //  event.preventDefault();

  // }
  console.log(errors)
  return (
    <form action="">
      <div>
       <input type="text" placeholder="Name: (max: 100 letters)" name="name" value={input.name} onChange={handleChange} />
       <input type="text" placeholder="image url" name="image" value={input.image} onChange={handleChange} />
       <input type="number" placeholder="HealthScore: (min:1 max:100 points )" name="healthScore" value={input.healthScore} onChange={handleChange} />
       <textarea placeholder="summaryOfDish: (max: 250 letters)" name='summaryOfDish' value={input.summaryOfDish} onChange={handleChange}  cols="30" rows="10"></textarea>
      </div>
      <div>
        <h3>Choose yourdiet type</h3>
        {Array.isArray(allDiets)&&allDiets.map((diet)=>(
          <div key={diet.name}>
            <input
             type="checkbox"
             id={`check-${diet.name}`}
             onChange={()=>handleChangeDiets(diet.name)} // ()=>  handlerDiets will be executed only when the event occurs, instead of executing it immediately.
             defaultChecked={isChecked(diet.name)} />
             <label  htmlFor={`check-${diet.name}`}>{diet.name}</label>
          </div>
        ))}
      </div>
      <div>
        <h3>Add stepByStep: </h3>
        <input type="text" name='instruction' value={input.instruction} onChange={handleChange} />
        <button onClick={addInstruction}>Add</button>
        {input.stepByStep.map((ins,index)=><input value={ins.name} key={index} disabled/>)}
      </div>
      <div>
        <Link to="/home">
          <button>Back home</button>
        </Link>
          <button>Create recipe</button> 
      </div>
    </form>
  )
}

export default Form
