import React, { useEffect, useState } from 'react'
import s from './style.module.sass'
import c from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'components/Modal'
import { SET_CURRENT_SALAD } from 'store/actions/types'
import getCurrentSalad from 'store/actions/getCurrentSalad'
import Button from 'components/Button'
import setOrder from 'store/actions/setOrder'
import { motion } from 'framer-motion'

interface I {
  onClose: () => void
  saladId: string
}

const SaladModal: React.FC<I> = ({ onClose, saladId }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrentSalad(saladId))
    return () => {
      dispatch({ type: SET_CURRENT_SALAD, payload: null })
    }
  }, [])

  const loading = useSelector(({ loadings }: StateValue) => loadings[0])
  const data = useSelector(({ currentSalad }: StateValue) => currentSalad)

  const [success, setSuccess] = useState(false)

  const handleClick = () => {
    if (data) {
      dispatch(setOrder(data))
      setSuccess(true)
      setTimeout(() => {
        onClose()
      }, 1000)
    }
  }

  return (
    <Modal loading={loading === 'getCurrentSalad' ? true : false}>

        {success ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={s.Success}
          >
            <div>&#10003;</div>
            <p className='font-s-xlarge font-w-600 pt-2'>Successfully added</p>
          </motion.div>
        ) : (
          <>
            <div className={c(s.header, 'ph-1 font-w-400 font-s-large')}>
              <p className='font-s-xlarge font-w-400'>{data?.title}</p>
              <div className='cursor-pointer' onClick={onClose}>
                &#10006;
              </div>
            </div>
            <div className={c(s.description, 'm-1')}>
              <div className={c(s.picture, 'mh-05 p-2')}>
                <img src='https://cdn-icons-png.flaticon.com/512/129/129187.png'></img>
              </div>
              <div>
                <div className={c(s.text, 'ph-1')}>
                  <p
                    className={c(
                      s.composition,
                      'word-wrap font-w-400 font-s-xlarge'
                    )}
                  >
                    {`Composition: ${data?.composition
                      .map((i) => i.title)
                      .join(', ')}`}
                  </p>
                  <p className={c(s.descriptionText, 'mv-1 p-05 scroll-y')}>
                    {data?.description}
                  </p>
                  <div className={c(s.order)}>
                    <div
                      className={c(s.priceBlock, 'font-s-xlarge font-w-400')}
                    >
                      {data?.discount_price ? (
                        <div className={c(s.price)}>
                          <p>{`$${data.discount_price.toFixed(1)}`}</p>
                          <p className='font-s-small ph-05 text-decoration-line'>{`$${data.price.toFixed(
                            1
                          )}`}</p>
                        </div>
                      ) : (
                        <p>{`$${data?.price.toFixed(1)}`}</p>
                      )}
                    </div>
                    <Button
                      title='Order'
                      middle
                      onClick={() => handleClick()}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
    </Modal>
  )
}

export default SaladModal
