import React, { useEffect, useState } from 'react'
import c from 'classnames'
import s from './style.module.sass'
import { useDispatch, useSelector } from 'react-redux'
import { SET_ORDER } from 'store/actions/types'
import { motion } from 'framer-motion'

interface I {
  data: OrderSalad
}

const OrderCard: React.FC<I> = ({ data }) => {
  const dispatch = useDispatch()

  const order = useSelector(({ order }: StateValue) => order)
  const [newOrder, setNewOrder] = useState(order)

  useEffect(() => {}, [order])

  const handleRemove = () => {
    dispatch({
      type: SET_ORDER,
      payload: order.filter((i) => i._id !== data._id),
    })
  }

  return (
    <motion.div
      className={c(s.OrderCard, 'p-1 mt-1')}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: .2 }}
    >
      <div className={s.salad}>
        <div className={c(s.description, 'font-s-xlarge')}>
          <p>{data.title}</p>
          {data.discount_price ? (
            <div className={c(s.price)}>
              <p>{`$${data.discount_price.toFixed(1)}`}</p>
              <p className='font-s-small ph-05 text-decoration-line'>{`$${data.price.toFixed(
                1
              )}`}</p>
            </div>
          ) : (
            <div>{`$${data.price.toFixed(1)}`}</div>
          )}
        </div>
        <div className={s.remove}>
          <p>{`Amount: ${data.number}`}</p>
          <div
            className={c(s.removeBlock, 'font-s-large')}
            onClick={() => handleRemove()}
          >
            <img src='/images/recycle.png' />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default OrderCard
