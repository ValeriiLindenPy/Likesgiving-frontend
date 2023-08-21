

import { configureStore } from '@reduxjs/toolkit'
import auth from './features/auth-slice'

export const store = configureStore({
  reducer: {
  	auth,
  },
})