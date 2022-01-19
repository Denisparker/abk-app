import React, { useState } from 'react'
import s from './style.module.sass'
import c from 'classnames'
import Button from 'components/Button'
import { motion } from 'framer-motion'

interface I {
  data: Salad
  onClick: () => void
}

const SaladCard: React.FC<I> = ({ data, onClick }) => {
  return (
    <motion.div
      initial={{y: 300, opacity: 0}}
      animate={{y: 0, opacity: 1}}
      transition={{ duration: 0.5 }}
      className={s.SaladCard}
      onClick={onClick}
    >
      <div className={s.picture}>
        <img src='https://cdn-icons-png.flaticon.com/512/129/129187.png'></img>
      </div>
      <div className={c(s.description, 'p-2')}>
        <p className='font-s-xlarge font-w-400'>{data.title}</p>
        <p className='font-s-large font-w-400 pv-1'>
          {data.description.length < 200
            ? data.description
            : `${data.description.slice(0, 195)}...`}
        </p>
        <div className={c(s.order)}>
          <div className={c(s.priceBlock, 'font-s-xlarge font-w-400')}>
            {data.discount_price ? (
              <div className={c(s.price)}>
                <p>{`$${data.discount_price.toFixed(1)}`}</p>
                <p className='font-s-small ph-05 text-decoration-line'>{`$${data.price.toFixed(1)}`}</p>
              </div>
            ) : (
              <div>{`$${data.price.toFixed(1)}`}</div>
            )}
          </div>
          <Button title='Order' middle />
        </div>
      </div>
    </motion.div>
  )
}

export default SaladCard
