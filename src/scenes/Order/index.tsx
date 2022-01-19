import React, { useState } from 'react'
import c from 'classnames'
import s from './style.module.sass'
import Page from 'components/Page'
import Button from 'components/Button'
import { useDispatch, useSelector } from 'react-redux'
import makeOrder from 'store/actions/makeOrder'
import OrderCard from './OrderItem'
import { AnimatePresence } from 'framer-motion'
import SuccessModal from 'components/SuccessModal'
import { SET_ORDER } from 'store/actions/types'

const Order: React.FC = () => {
  const dispatch = useDispatch()

  const order = useSelector(({ order }: StateValue) => order)
  const [success, setSuccess] = useState(false)

  const handleSend = () => {
    setSuccess(true)
    dispatch(makeOrder())
    dispatch({ type: SET_ORDER, payload: [] })
    setTimeout(() => {
      setSuccess(false)
    }, 1000)
  }

  return (
    <Page withHeader>
      <div className={s.Order}>
        <div className={c(s.layout, 'p-1')}>
          <div className={c(s.orderList, 'scroll-y')}>
            <AnimatePresence initial={false} exitBeforeEnter={false}>
              {order.map((i) => (
                <OrderCard data={i} key={i._id} />
              ))}
            </AnimatePresence>
          </div>
          <div className={s.footer}>
            <div className='font-s-xlarge'>{`$ ${order
              .reduce((sum, current) => sum + current.discount_price, 0)
              .toFixed(1)}`}</div>
            <Button middle title='SEND' onClick={() => handleSend()} />
          </div>
        </div>
      </div>

      <AnimatePresence initial={false} exitBeforeEnter={false}>
        {success && <SuccessModal title='Successfully completed' />}
      </AnimatePresence>
    </Page>
  )
}

export default Order
