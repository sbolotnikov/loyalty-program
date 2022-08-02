import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
       addToBasket: (state, action)=>{
          let activeIndex=state.items.findIndex(x => x.uid === action.payload.uid);
          console.log(activeIndex)
          if (activeIndex ==-1) state.items = [...state.items, action.payload]
          else {
            let arrCopy=state.items
            if (action.payload.amount===0) { arrCopy.splice(activeIndex, 1) }
             else arrCopy[activeIndex].amount=action.payload.amount
            state.items =[...arrCopy]
            console.log(state.items) 
          }
       },
       removeFromBasket: (state, action)=>{

       }
  },
})

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket} = basketSlice.actions
export const selectItems = (state) => state.basket.items.reduce((total, item) => total + item.amount, 0);
export const selectTotal =(state) => state.basket.items.reduce((total, item) => total + (item.price*item.amount), 0);
export const selectBasketItems = (state) => state.basket.items;
export default basketSlice.reducer