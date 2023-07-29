import React  from 'react'
import { useState,useEffect } from "react"
import { useDispatch,useSelector } from 'react-redux'
import { getDiets } from '../../redux/actions';
function Form() {
  const allDiets = useSelector((state)=>state.allDiets);
  const dispatch = useDispatch();
  const {errors,setErrors}=useState();
  const [input,setInput] = useState({
    name:"",
    image:"",
    healthScore:"",
    summary:"",
    diets:[],
    instructions:[],
    instruction:""

  })
 
  useEffect(()=>{
    dispatch(getDiets())
  },[dispatch])
  
  const handleChange= (event)=>{
    
    setInput({...input,[event.target.name]:event.target.value})
  }
  const addInstruction = (event)=>{
    event.preventDefault()
    if(input.instruction.length>0){
      const savedInstructions = input.instructions;
      savedInstructions.push({name:input.instruction})
      setInput({...input,[input.instructions]:savedInstructions})
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
  const handleChangeDiets = (id)=>{
    setInput({...input,diets:handlerCheckBox(id,[...input.diets])})
  }
  const isChecked= (id)=>{
    return input.diets.includes(id)
  }
  console.log(input)
  return (
    <form action="">
      <div>
       <input type="text" placeholder="Name: (max: 100 letters)" name="name" value={input.name} onChange={handleChange} />
       <input type="text" placeholder="image url" name="image" value={input.image} onChange={handleChange} />
       <input type="number" placeholder="HealthScore: (min:1 max:100 points )" name="healthScore" value={input.healthScore} onChange={handleChange} />
       <textarea placeholder="Summary: (max: 250 letters)" name='summary' value={input.summary} onChange={handleChange}  cols="30" rows="10"></textarea>
      </div>
      <div>
        <h3>Choose yourdiet type</h3>
        {Array.isArray(allDiets)&&allDiets.map((diet)=>(
          <div key={diet.id}>
            <input
             type="checkbox"
             id={`check-${diet.id}`}
             onChange={()=>handleChangeDiets()} // ()=> it allows that handlerDiets will be executed only when the event occurs, instead of executing it immediately.
             defaultChecked={isChecked(diet.id)} />
             <label  htmlFor={`check-${diet.id}`}>{diet.name}</label>
          </div>
        ))}
      </div>
      <div>
        <h3>Add instructions: </h3>
        <input type="text" name='instruction' value={input.instruction} onChange={handleChange} />
        <button onClick={addInstruction}>Add</button>
        {input.instructions.map((ins,index)=><input value={ins.name} key={index} disabled/>)}
      </div>
    </form>
  )
}

export default Form
