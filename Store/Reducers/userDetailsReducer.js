

const initState = {
    users: [],
    userImg: '',
    address: [],
    orders: null,

}


const UserReducer = (state=initState,action) =>{

    switch(action.type){
        case "LOAD_USER_DETAILS":
            return {
                ...state,
                users:[action.payload]
            }
            case "EDIT_USER_DETAILS":
                return {
                    ...state,
                    users:[action.payload]
                }
            case "UPLOAD_IMG":
                return {
                        ...state,
                        userImg: action.payload
                    }
                    case "LOAD_IMG":
                        return {
                                ...state,
                                userImg: action.payload
                            }
                            case "LOAD_ADDR":
                                return {
                                        ...state,
                                        address: [action.payload]
                                    }
                                    case "EDIT_ADDR":
                                        return {
                                                ...state,
                                                address: [action.payload]
                                            }
                                            case "LOAD_ORDERS":
                                                return {
                                                        ...state,
                                                        orders: action.payload
                                                    }
        default:
            return state
    }
}
export default UserReducer