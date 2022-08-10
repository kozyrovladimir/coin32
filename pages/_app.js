import '../styles/globals.css'
import {NextQueryParamProvider} from 'next-query-params'

function MyApp({ Component, pageProps }) {
  return (
      <NextQueryParamProvider>
            <Component {...pageProps} />
      </NextQueryParamProvider>
  )
}

export default MyApp
