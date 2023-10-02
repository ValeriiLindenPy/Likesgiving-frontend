


import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  likeStatus: "",
}

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    Reset: () => {
      return initialState;
    },
    SetStatus: (state, action) => {
      state.likeStatus = action.payload;
    },



  },
})

// Action creators are generated for each case reducer function
export const { Reset, SetStatus } = auth.actions

export default auth.reducer