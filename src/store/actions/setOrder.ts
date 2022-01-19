import _ from 'lodash'
import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { addLoading, removeError, removeLoading } from '.'
import { SET_ORDER } from './types'

export default function setOrder(
  salad: FullSalad
): ThunkAction<Promise<void>, StateValue, unknown, AnyAction> {
  return async (dispatch, getState) => {
    const entry = 'setOrder'

    dispatch(removeError(entry))
    dispatch(addLoading(entry))

    const order = getState().order

    if (_.find(order, { _id: salad._id })) {
      dispatch({
        type: SET_ORDER,
        payload: order.map((i) =>
          i._id === salad._id ? { ...i, number: i.number + 1 } : i
        ),
      })
    } else {
      dispatch({
        type: SET_ORDER,
        payload: [...order, { ...salad, number: 1 }],
      })
    }
    dispatch(removeLoading(entry))
  }
}
