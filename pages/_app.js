import '../styles/globals.css'
import {NextQueryParamProvider} from 'next-query-params'
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
      <NextQueryParamProvider>
          <Layout>
              <Component {...pageProps} />
          </Layout>
      </NextQueryParamProvider>
  )
}

export default MyApp
