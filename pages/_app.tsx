import '../styles/globals.sass'
import type { AppProps } from 'next/app'
import { storeWrapper } from '../src/store'
import { AnimateSharedLayout } from "framer-motion"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AnimateSharedLayout>
      <Component {...pageProps} />
    </AnimateSharedLayout>
  )
}

export default storeWrapper.withRedux(MyApp)
