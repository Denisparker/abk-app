import React from 'react'
import NextLink from 'next/link'

interface I {
  to: string
  transparent?: boolean
}

const Link: React.FC<I> = ({ to, transparent, children }) => {
  if (transparent) {
    return <>{children}</>
  }
  return (
    <NextLink href={to}>
      <a>{children}</a>
    </NextLink>
  )
}

export default Link
