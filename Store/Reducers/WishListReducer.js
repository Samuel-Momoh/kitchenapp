import foods from '../../src/consts/foods';
const initState = {
    items: foods,
    wishedItems:[],

}

const WishReducers = (state = initState, action) => {

    switch(action.type) {
        case "ADD_TO_WISH":
            let addedItem = state.items.find(item=> item.id === action.payload)
                    //check if the action id exists in the wishedItems
         let existed_item= state.wishedItems.find(item=> action.payload === item.id)
            
         if(existed_item)
         {
            let new_items = state.wishedItems.filter(item=> action.payload !== item.id)
            console.log(state.wishedItems)
             return{
                ...state,
                wishedItems: new_items,
                  }
        }
         else{
            console.log(state.wishedItems)
            return{
                ...state,
                wishedItems: [...state.wishedItems, addedItem],
            }
        }
        case "REMOVE_WISH_ITEM":
            let itemToRemove= state.wishedItems.find(item=> action.payload=== item.id)
            let new_items = state.wishedItems.filter(item=> action.payload !== item.id)
            
            console.log(itemToRemove)
            return{
                ...state,
                wishedItems: new_items,
            }    
        default:
            return state;
    }
}

export default WishReducers;