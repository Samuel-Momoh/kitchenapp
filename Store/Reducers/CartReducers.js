
import foods from '../../src/consts/foods';
const initState = {
    items: foods,
    addedItems: [],
    total: 0

}

const CartReducers = (state = initState, action) => {

    switch(action.type) {
        case "ADD_TO_CART":
            let addedItem = state.items.find(item=> item.id === action.payload)
                    //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.payload === item.id)
            
         if(existed_item)
         {
            addedItem.quantity += 1 
            console.log(state.addedItems)
            
             return{
                ...state,
                 total: state.total + addedItem.price 
                  }
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price 
            console.log(state.addedItems)
           
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
        }
        case "REMOVE_ITEM":
            let itemToRemove= state.addedItems.find(item=> action.payload=== item.id)
            let new_items = state.addedItems.filter(item=> action.payload !== item.id)
            
            //calculating the total
            let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
            console.log(itemToRemove)
          
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
            case "CLEAR_ITEM":
              
                return{
                    ...state,
                    addedItems: [],
                    total: 0
                }
            case "ADD_QUANTITY":
                 addedItem = state.items.find(item=> item.id === action.payload)
                addedItem.quantity += 1 
                 newTotal = state.total + addedItem.price
               
                return{
                    ...state,
                    total: newTotal
                }
            case "SUB_QUANTITY":
                 addedItem = state.items.find(item=> item.id === action.payload) 
                //if the qt == 0 then it should be removed
                if(addedItem.quantity === 1){
                    let new_items = state.addedItems.filter(item=>item.id !== action.payload)
                    let newTotal = state.total - addedItem.price
              
                    return{
                        ...state,
                        addedItems: new_items,
                        total: newTotal
                    }
                }
                else {
                    addedItem.quantity -= 1
                    let newTotal = state.total - addedItem.price
             
                    return{
                        ...state,
                        total: newTotal
                    }
                }
                
        default:
            return state;
    }
}

export default CartReducers;