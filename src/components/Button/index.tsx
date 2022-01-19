import React, { Children } from 'react'
import c from 'classnames'
import s from './style.module.sass'

interface I {
  title: string
  small?: boolean
  middle?: boolean
  large?: boolean
  onClick?: () => void
}

const Button: React.FC<I> = ({ title, small, middle, large, onClick }) => {
  return (
    <div
      className={c(s.Button, {
        [s.small]: small,
        [s.middle]: middle,
        [s.large]: large,
      }, 'font-w-700 fint-s-large select-none')}
      onClick={onClick}
    >
      {title}
    </div>
  )
}

export default Button
