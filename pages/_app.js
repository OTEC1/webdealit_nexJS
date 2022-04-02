import '../styles/globals.css'
import { Provider } from 'react-redux';
import store from '../store'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'



function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
