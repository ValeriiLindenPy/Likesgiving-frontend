


import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuth: false,
  token: "",
  email: "",
  username: "",
}

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  	logOut: () => {
  		return initialState;
  	},
  	logIn: (state, action) => {
  		state.token = action.payload;
  		state.isAuth = true;
  	},
    

    
  },
})

// Action creators are generated for each case reducer function
export const { logOut, logIn } = auth.actions

export default auth.reducer