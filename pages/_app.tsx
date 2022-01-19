import '../styles/globals.sass'
import type { AppProps } from 'next/app'
import { storeWrapper } from '../src/store'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default storeWrapper.withRedux(MyApp)
