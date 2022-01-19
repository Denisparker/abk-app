import { loremIpsum } from 'react-lorem-ipsum'
import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { addLoading, removeError, removeLoading } from '.'
import { SET_SALADS } from './types'

export default function getSalads(): ThunkAction<
  Promise<void>,
  StateValue,
  unknown,
  AnyAction
> {
  return async (dispatch) => {
    const entry = 'getSalads'

    dispatch(removeError(entry))
    dispatch(addLoading(entry))

    fetch('http://test-job.webatom.ru/salads')
      .then((res) => res.json())
      .catch((err) => console.log(err))
      .then((salads) => {
        dispatch({
          type: SET_SALADS,
          payload: salads.result.map(
            //// Так как нет описания, создаю фейковое
            (i: Salad) =>
              ({
                ...i,
                description: loremIpsum({
                  random: true,
                  startWithLoremIpsum: false,
                })[0],
              })
          ),
        })
      })
      .finally(() => dispatch(removeLoading(entry)))
  }
}
