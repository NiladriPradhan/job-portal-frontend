// store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from '../redux/userSlice'
import jobsReducer from '../redux/jobsSlice'
import companyReducer from '../redux/companySlice'
import applicantsReducer from '../redux/applicationSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  jobs: jobsReducer,
  company: companyReducer,
  applicants: applicantsReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'jobs'] // persist jobs also
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ignore redux-persist action types (use constants)
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
