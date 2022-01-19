import React from 'react'
import c from 'classnames'
import s from './style.module.sass'
import Link from 'components/Link'
import { useRouter } from 'next/router'
import { navigation } from 'consts'
import { motion } from 'framer-motion'

interface I {
  withHeader?: boolean
}

const Page: React.FC<I> = ({ withHeader, children }) => {
  const router = useRouter()

  return (
    <div className={s.Page}>
      {withHeader && (
        <div className={c(s.header, 'ph-4 select-none')}>
          <Link to='/'>
            <h3 className='letter-spacing-02'>STORE LOUIS</h3>
          </Link>
          <div className={c(s.links, 'font-w-600 font-s-large')}>
            {navigation.map((i) => {
              const isActive = i.url === router.asPath
              return (
                <Link to={i.url} key={i.url} transparent={isActive}>
                  <h5 className={c(s.link, 'letter-spacing-02')}>{i.title}</h5>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={s.content}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default Page
