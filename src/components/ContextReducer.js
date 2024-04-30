import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state,action) => {
    switch(action.type){
        case "ADD" :
                return [...state,{
                    id: action.id,
                    name: action.name,
                    price: action.price,
                    img: action.img,
                    size: action.size,
                    qty: action.qty
                }]
        case "REMOVE":
            // For remove we have to create a array fist to store the state then we can delete from there
            let newCartItems= [...state];
            newCartItems.splice(action.index, 1);
            return newCartItems;
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if(food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index]= {...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price, }
                }
                return arr
            })
            return arr;
        case "DROP":
            let empArray = [];
            return empArray;
        default: return state; 
    }
}

export const CartProvider= ({children}) => {
    // Use Reducer
    const [state,dispatch]= useReducer(reducer,[])
    return(
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

// Use Context
export const useCart = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
