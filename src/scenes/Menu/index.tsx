import React, { useEffect } from 'react'
import c from 'classnames'
import s from './style.module.sass'
import Page from 'components/Page'
import { useDispatch } from 'react-redux'
import getSalads from 'store/actions/getSalads'
import SaladList from './components/SaladList'
import { SET_SALADS } from 'store/actions/types'

const Menu: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSalads())
    return () => {
      dispatch({type: SET_SALADS, payload: []})
    }
  }, [])

  return (
    <Page withHeader>
      <div>
        <SaladList />
      </div>
    </Page>
  )
}

export default Menu
