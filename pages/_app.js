import '../styles/globals.css'
import {Provider} from "react-redux"
import {store} from "../store/store"
import {NextQueryParamProvider} from 'next-query-params'

function MyApp({ Component, pageProps }) {
  return (
      <NextQueryParamProvider>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
      </NextQueryParamProvider>
  )
}

export default MyApp
