export const ADD_CART = (payload) => {
    return{
        type:'ADD_TO_CART',
        payload: payload
    }
}
export const SUB_ITEM = (payload) => {
    return{
        type:'REMOVE_ITEM',
        payload: payload
    }
}
export const ADD_QTY = (payload) => {
    return{
        type:'ADD_QUANTITY',
        payload: payload
    }
}
export const SUB_QTY = (payload) => {
    return{
        type:'SUB_QUANTITY',
        payload: payload
    }
}
export const ADD_WSH = (payload) => {
    return{
        type:'ADD_TO_WISH',
        payload: payload
    }
}
export const RM_WSH = (payload) => {
    return{
        type:'REMOVE_WISH_ITEM',
        payload: payload
    }
}
export const MV_WSH = (payload) => {
    return{
        type:'MOVE_WISH_ITEM',
        payload: payload
    }
}
export const LOAD_USER = (payload) => {
    return{
        type:'LOAD_USER_DETAILS',
        payload: payload
    }
}
export const EDIT_USER = (payload) => {
    return{
        type:'EDIT_USER_DETAILS',
        payload: payload
    }
}
export const UPLOAD_IMG = (payload) => {
    return{
        type:'UPLOAD_IMG',
        payload: payload
    }
}
export const LOAD_IMG = (payload) => {
    return{
        type:'LOAD_IMG',
        payload: payload
    }
}
export const LOAD_ADDR = (payload) => {
    return{
        type:'LOAD_ADDR',
        payload: payload
    }
}
export const EDIT_ADDR = (payload) => {
    return{
        type:'EDIT_ADDR',
        payload: payload
    }
}
export const CLEAR_ITEM = () => {
    return{
        type:'CLEAR_ITEM'
    }
}
export const LOAD_ORDERS = (payload) => {
    return{
        type:'LOAD_ORDERS',
        payload: payload
    }
}