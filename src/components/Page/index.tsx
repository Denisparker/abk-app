import React, { Children } from 'react'
import c from 'classnames'
import s from './style.module.sass'

interface I {
  withHeader?: boolean
}

const Page: React.FC<I> = ({ withHeader, children }) => {
  return (
    <div className={s.Page}>
      {withHeader && <div className={s.header}></div>}
      <div className={s.content}>{children}</div>
    </div>
  )
}

export default Page
