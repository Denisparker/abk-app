import React, { useState } from 'react'
import s from './style.module.sass'
import c from 'classnames'
import { useSelector } from 'react-redux'
import SaladCard from './components/SaladCard'
import SaladModal from './components/SaladModal'
import Loading from 'components/Loading'
import { AnimatePresence } from 'framer-motion'

const SaladList: React.FC = () => {
  const salads = useSelector(({ salads }: StateValue) => salads)
  const loading = useSelector(({ loadings }: StateValue) => loadings[0])

  const [currentSaladId, setCurrentSaladId] = useState<string | null>(null)

  return (
    <div className={c(s.SaladList, 'scroll-x-hidden pt-1 pb-2 ph-3')}>
      {loading === 'getSalads' ? (
        <Loading />
      ) : (
        salads.map((data) => (
          <SaladCard
            key={data._id}
            data={data}
            onClick={() => setCurrentSaladId(data._id)}
          />
        ))
      )}
      <AnimatePresence
        initial={false}
        exitBeforeEnter={false}
      >
        {currentSaladId && (
          <SaladModal
            saladId={currentSaladId}
            onClose={() => setCurrentSaladId(null)}
          ></SaladModal>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SaladList
