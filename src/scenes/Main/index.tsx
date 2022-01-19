import React from 'react'
import c from 'classnames'
import s from './style.module.sass'
import Page from 'components/Page'
import { motion } from 'framer-motion'

const Main: React.FC = () => {
  return (
    <Page withHeader>
      <div className={c(s.welcome, 'font-s-xlarge font-w-400')}>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1 }}
        >
          <h2>
            Welcome to Louis store.
          </h2>
          <div>
            Here you can assemble a salad from the proposed ingredients.
            <br /> You can also choose any of our salads.
          </div>
        </motion.div>
      </div>
    </Page>
  )
}

export default Main
