import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" type="image/png" href={ `${ process.env.NEXT_PUBLIC_ASSETS_URI }/favicon.png` }/>
        </Head>
        <body>
          <Main/>
          <div id="Modal" />
          <NextScript/>
        </body>
      </Html>
    )
  }
}

export default CustomDocument
