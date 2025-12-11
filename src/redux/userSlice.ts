import { createSlice } from '@reduxjs/toolkit'

const savedUser = localStorage.getItem('user')
const initialState = {
  loading: false,
  user: savedUser ? JSON.parse(savedUser) : null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.user = null
      localStorage.removeItem('user')
    }
  }
})

export default authSlice.reducer
export const { setLoading, setUser, logout } = authSlice.actions
