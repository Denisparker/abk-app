import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { json } from 'stream/consumers'
import { addLoading, removeError, removeLoading } from '.'

export default function makeOrder(): ThunkAction<
  Promise<void>,
  StateValue,
  unknown,
  AnyAction
> {
  return async (dispatch, getState) => {
    const entry = 'makeOrder'

    dispatch(removeError(entry))
    dispatch(addLoading(entry))

    fetch('http://test-job.webatom.ru/order', {
      method: 'POST',
      body: JSON.stringify(getState().order),
    }).then((res) => res.json()).then((a) => console.log(a))

    dispatch(removeLoading(entry))
  }
}
