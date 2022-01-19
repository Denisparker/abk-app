import React from 'react'
import s from './style.module.sass'
import c from 'classnames'
import { motion } from 'framer-motion'
import Modal from 'components/Modal'

interface I {
  title: string
}

const SuccessModal: React.FC<I> = ({ title }) => {
  return (
    <Modal>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={s.Success}
      >
        <div>&#10003;</div>
        <p className='font-s-xlarge font-w-600 pt-2'>{title}</p>
      </motion.div>
    </Modal>
  )
}

export default SuccessModal
