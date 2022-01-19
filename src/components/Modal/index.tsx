import React, { useEffect } from 'react'
import s from './style.module.sass'
import c from 'classnames'
import ReactPortal from 'components/ReactPortal'
import Loading from 'components/Loading'
import { AnimatePresence, motion } from 'framer-motion'

interface I {
  onClose?: () => void
  loading?: boolean
}

const Modal: React.FC<I> = ({ children, loading, onClose }) => {
  useEffect(() => {
    document.body.className = 'overflow-hidden'
    return () => {
      document.body.className = ''
    }
  }, [])

  return (
    <ReactPortal id='Modal'>
      <div className={s.Wrapper}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={c(s.layout, 'pv-3')}
        >
          <div className={c(s.container, 'p-1')}>
            {onClose && (
              <div
                className={c(
                  s.close,
                  'cursor-pointer hover-opacity no-select font-s-xlarge'
                )}
                onClick={onClose}
              >
                &#10006;
              </div>
            )}
            {loading ? (
              <div className={c(s.loading)}>
                <Loading />
              </div>
            ) : (
              <div className={s.layout}>{children}</div>
            )}
          </div>
        </motion.div>
      </div>
    </ReactPortal>
  )
}

export default Modal
