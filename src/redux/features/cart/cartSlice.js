import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: false,
};
const url = 'https://course-api.com/react-useReducer-cart-project';
export const getCartItems = createAsyncThunk(
    'cart/getCartItems',
    async (name, thunkAPI) => {
      try {
        // console.log(name);
        // console.log(thunkAPI);

        // thunkApi is optional param which we can access state and dispatch any actions which is not specific to this reducer
        // console.log(thunkAPI.getState());

        // using thunk Api we can dispatch any actions which is not specific to this reducer/feature
        // thunkAPI.dispatch(openModal());
        
        const resp = await axios(url);
  
        return resp.data;
      } catch (error) {
        
        // it is used to throw the custom error (error.message)

        return thunkAPI.rejectWithValue('something went wrong');
      }
    }
  );

  //...............BASIC ASYNC EXAMPLE....................//

    // export const getCartItems=createAsyncThunk('cart/getCartItems',()=>{
    //     return fetch(url).then((resp)=>resp.json()).catch((err)=>console.log(err))
    // })


  //...............BASIC ASYNC EXAMPLE....................//

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      // If we return newState it will override
      //the existing properties so pls be aware of  it
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers:{
      [getCartItems.pending]:(state) => {
            state.isLoading=true
      },
      [getCartItems.fulfilled]:(state,action) => {
          console.log(action)
            state.isLoading=false
            state.cartItems=action.payload
      },
      [getCartItems.rejected]:(state) => {
            state.isLoading=false
      }
  }
});

console.log(cartSlice);

//   ACTIONS

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;
 
export default cartSlice.reducer;
