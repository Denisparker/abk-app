import React, { useEffect, useState } from 'react'
import c from 'classnames'
import s from './style.module.sass'
import Page from 'components/Page'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import CompositionCard from './components/CompositionCard'
import { useDispatch, useSelector } from 'react-redux'
import getCompositions from 'store/actions/getCompositions'
import { SET_COMPOSITIONS } from 'store/actions/types'
import { constructor, customSalad } from 'consts'
import Button from 'components/Button'
import SuccessModal from 'components/SuccessModal'
import setOrder from 'store/actions/setOrder'
import _ from 'lodash'
import { AnimatePresence, motion } from 'framer-motion'

type IColumn = {
  [index in string]: CompositionItem[]
} & {
  constructorColumn: CompositionItem[]
  compositionsColumn: CompositionItem[]
}

const Constructor: React.FC = () => {
  const dispatch = useDispatch()

  const compositions = useSelector(
    ({ compositions }: StateValue) => compositions
  )

  const [column, setColumn] = useState<IColumn>({
    constructorColumn: [],
    compositionsColumn: [],
  })

  const [success, setSuccess] = useState(false)

  useEffect(() => {
    dispatch(getCompositions())
    return () => {
      dispatch({ type: SET_COMPOSITIONS, payload: [] })
    }
  }, [])

  useEffect(() => {
    setColumn({
      ...column,
      constructorColumn: [],
      compositionsColumn: compositions,
    })
  }, [compositions])

  const handleSuccess = () => {
    setSuccess(true)
    dispatch(
      setOrder({
        ...customSalad,
        _id: _.uniqueId(Math.random().toString()),
        price: column.constructorColumn.reduce(
          (sum, current) => sum + current.discount_price,
          0
        ),
        composition: column.constructorColumn,
      })
    )
    dispatch(getCompositions())
    setTimeout(() => {
      setSuccess(false)
    }, 1000)
  }

  const DragEnd = (result: DropResult) => {
    if (!result.destination) return
    if (
      result.source.droppableId === result.destination.droppableId &&
      result.source.index === result.destination.index
    )
      return
    else {
      const newColumn = column[result.destination.droppableId]
      const oldColumn = column[result.source.droppableId]
      const draggableItem = oldColumn.find((i) => i._id === result.draggableId)
      oldColumn.splice(
        oldColumn.findIndex((i) => i._id === result.draggableId),
        1
      )

      draggableItem &&
        newColumn.splice(result.destination.index, 0, draggableItem)
      setColumn({
        ...column,
        [result.source.droppableId]: oldColumn,
        [result.destination.droppableId]: newColumn,
      })
    }
  }

  return (
    <Page withHeader>
      <AnimatePresence initial={false} exitBeforeEnter={false}>
        {success ? (
          <SuccessModal title='Successfully added' />
        ) : (
          <DragDropContext onDragEnd={DragEnd}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={s.Constructor}
            >
              <Droppable droppableId={constructor.constructorColumn.title}>
                {(provided) => (
                  <div className={s.CustomSaladBlock}>
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={c(s.CustomSalad, 'p-1 scroll-y')}
                    >
                      {column.constructorColumn.map((i, index) => (
                        <CompositionCard
                          key={i._id}
                          data={i}
                          num={index}
                        ></CompositionCard>
                      ))}
                      {provided.placeholder}
                    </div>
                    <div className={c(s.order, 'p-1')}>
                      <p className='font-s-xlarge'>
                        The cost of your salad:
                        {` $${column.constructorColumn.reduce(
                          (sum, current) => sum + current.discount_price,
                          0
                        )}`}
                      </p>
                      <Button
                        middle
                        title='ORDER'
                        onClick={() => handleSuccess()}
                      />
                    </div>
                  </div>
                )}
              </Droppable>
              <Droppable droppableId={constructor.compositionsColumn.title}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={c(s.Compositions, 'p-1 scroll-y')}
                  >
                    {column.compositionsColumn.map((i, index) => (
                      <CompositionCard
                        key={i._id}
                        data={i}
                        num={index}
                      ></CompositionCard>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </motion.div>
          </DragDropContext>
        )}
      </AnimatePresence>
    </Page>
  )
}

export default Constructor
