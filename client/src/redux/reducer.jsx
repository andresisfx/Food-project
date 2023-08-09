import {GET_RECIPES,SEARCH_BAR,GET_DIETS,FILTER_DIET, CLEAN_FILTER, FILTER_ORIGIN, FILTER_ALPHABETIC, FILTER_SCORE,PAGINATE} from "./actions"

let initialState = {
    allRecipes:[],
    paginatedRecipes:[],
    recipesFiltered:[],
    filterPaginate:[],
    filter:false,
    allRecipesCopy:[],
    allDiets:[],
    errorState:"error",
    currentPage:0
}

function rootReducer (state = initialState,action){
  const items_per_page =10
   switch (action.type) {
    case GET_RECIPES: 
        return{ 
            ...state,
            filter:false,
            allRecipes:action.payload,
            allRecipesCopy:JSON.parse(JSON.stringify(action.payload)),
            paginatedRecipes:[...action.payload].splice(0,items_per_page)
          
            
        }
   

    case SEARCH_BAR:
        
        return {
            ...state,
            filter:false,
            paginatedRecipes:[...action.payload].splice(0,items_per_page)
        }
    case GET_DIETS:
        return {
            ...state,
         allDiets:action.payload
        }
    case FILTER_DIET:
     
    const dietName = action.payload;
    let filterOne = [];
  
    if (action.payload === "none") {
      filterOne = state.allRecipesCopy;
    } else {
      filterOne = state.allRecipesCopy.filter((recipe) => {
        if (Array.isArray(recipe.diets)) {
          return recipe.diets.some((diet) => diet.name === dietName);
        }
       
      });
    }
    return{
        ...state,
        filter:true,
        recipesFiltered:filterOne
    } 
   

    case CLEAN_FILTER:
      return{
        ...state,
        filter:false,
        paginatedRecipes:[...state.allRecipes].splice(0,items_per_page)
      } 
    case FILTER_ORIGIN:
      let originRec = []
      action.payload==="api"? originRec=[...state.allRecipesCopy].filter(recipe=>!recipe.hasOwnProperty("createdDb")):
      originRec=[...state.allRecipesCopy].filter(recipe=>recipe.hasOwnProperty("createdDb"))
      return{
        ...state,
        filter:true,
        recipesFiltered: originRec
      }     
    case FILTER_ALPHABETIC:
      let filteredRec=[]
      action.payload==="A"?filteredRec=[...state.allRecipesCopy].sort((a,b)=>a.name.toLowerCase().localeCompare(b.name.toLowerCase())):
      filteredRec=[...state.allRecipesCopy].sort((a,b)=>b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
      return{
        ...state,
        filter:true,
        recipesFiltered:filteredRec,
        filterPaginate:[...filteredRec].splice(0,items_per_page)
      }
  
    case FILTER_SCORE:                                                             
      const scoreFiltered= action.payload==="up"? [...state.allRecipesCopy].sort((a,b)=>a.healthScore-b.healthScore):
      [...state.allRecipesCopy].sort((a,b)=>b.healthScore-a.healthScore)
      return{
        ...state,
       filter:true,
        recipesFiltered:scoreFiltered
      }
    case PAGINATE:
     
      const next_page =  state.currentPage + 1
      let prev_page = state.currentPage<0?-1:state.currentPage - 1
      const firstIndex = action.payload==="prev"? prev_page* items_per_page:next_page* items_per_page
      if(state.filter){
          if(firstIndex>=[...state.recipesFiltered].length){return{...state}}
          else if(prev_page<0){return{...state}}
          else{
           return {
            ...state,
            filterPaginate:state.recipesFiltered.slice(firstIndex,firstIndex+items_per_page),
            currentPage:action.payload==="next"?next_page:prev_page,
           
           }  
          }
      }
      if(action.payload==="next"&& firstIndex>=state.allRecipesCopy.length){return{...state}}
       else if(action.payload==="prev"&&prev_page<0){ return{...state}}
          else{
            return{
              ...state,
             paginatedRecipes:[...state.allRecipesCopy].splice(firstIndex,items_per_page),
             currentPage:action.payload==="next"?next_page:prev_page
            }
          }       
        default:
          
        return {
        ...state
       } 
   }
  
}

export default rootReducer;