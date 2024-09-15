import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ticketReducer from './ticketReducer.tsx';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
const store = configureStore({
  reducer: {
    ticketReducer
  }
})
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
