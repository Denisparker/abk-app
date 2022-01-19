import { loremIpsum } from 'react-lorem-ipsum'
import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { addLoading, removeError, removeLoading } from '.'
import { SET_CURRENT_SALAD } from './types'

export default function getCurrentSalad(
  saladId: string
): ThunkAction<Promise<void>, StateValue, unknown, AnyAction> {
  return async (dispatch) => {
    const entry = 'getCurrentSalad'

    dispatch(removeError(entry))
    dispatch(addLoading(entry))

    const getComposition = (id: string) =>
      new Promise((resolve, reject) => {
        fetch(`http://test-job.webatom.ru/molecule/${id}`)
          .then((res) => res.json())
          .then((molecule) => resolve(molecule.result))
          .catch(() => reject(console.log('err')))
      })

    fetch(`http://test-job.webatom.ru/salad/${saladId}`)
      .then((res) => res.json())
      .then(async (salad) => {
        const composition = await Promise.all(
          salad.result.composition.map((i: string) => getComposition(i))
        )
        dispatch({
          type: SET_CURRENT_SALAD,
          payload: {
            ...salad.result,
            composition,
            description: loremIpsum({
              random: true,
              startWithLoremIpsum: false,
            })[0],
          },
        })
      })
      .finally(() => dispatch(removeLoading(entry)))
  }
}
