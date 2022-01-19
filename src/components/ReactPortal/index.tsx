/* eslint-disable react/display-name */
import React, { memo, useEffect, useState } from 'react'
import { createPortal } from 'react-dom' 

interface Props {
  id: string
}

const ReactPortal: React.FC<Props> = memo(({ id, children }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (mounted) {
    return createPortal(children, document.getElementById(id) as Element)
  } else {
    return null
  }
})

export default ReactPortal
