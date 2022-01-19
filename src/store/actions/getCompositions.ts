import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { addLoading, removeError, removeLoading } from '.'
import { SET_COMPOSITIONS } from './types'

export default function getCompositions(): ThunkAction<
  Promise<void>,
  StateValue,
  unknown,
  AnyAction
> {
  return async (dispatch) => {
    const entry = 'getSalads'

    dispatch(removeError(entry))
    dispatch(addLoading(entry))

    fetch('http://test-job.webatom.ru/molecules')
      .then((res) => res.json())
      .catch((err) => console.log(err))
      .then((molecules) => dispatch({type: SET_COMPOSITIONS, payload: molecules.result}))
      .catch((err) => err)
      .finally(() => dispatch(removeLoading(entry)))
  }
}
