import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import usernameSlice from '../store/index'

const store = configureStore({
  reducer: {
    username: usernameSlice
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
export default MyApp

