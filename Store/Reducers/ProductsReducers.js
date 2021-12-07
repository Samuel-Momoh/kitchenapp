
import axios from "axios";

const initialState = {
    products : [],

} 

const options = {
    method: 'GET',
    url: 'https://edamam-food-and-grocery-database.p.rapidapi.com/parser',
    params: {ingr: 'pizza'},
    headers: {
      'x-rapidapi-host': 'edamam-food-and-grocery-database.p.rapidapi.com',
      'x-rapidapi-key': '53c17c2c63msh0a32472752defc0p19ae38jsn317278ed60b3'
    }
  };
  
  axios.request(options).then(function (response) {
      console.log(response.data);
  }).catch(function (error) {
      console.error(error);
  });


export default (state = initialState, action)=>{
    
        return state;
}





