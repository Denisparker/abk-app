import React from 'react'
import c from 'classnames'
import s from './style.module.sass'
import Image from 'next/image'
import { Draggable } from 'react-beautiful-dnd'

interface I {
  data: CompositionItem
  num: number
}

const CompositionCard: React.FC<I> = ({ data, num }) => {
  return (
    <Draggable draggableId={data._id} index={num} isDragDisabled={(data.qty === 0) ? true : false}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={c(s.CompositionItem, 'mt-05 p-1 select-none')}
        >
          <div className={c(s.description, 'font-s-xlarge font-w-400')}>
            <div>{data.title}</div>
            {data.discount_price !== data.price ? (
              <div className={c(s.price)}>
                <p>{`$${data.discount_price.toFixed(1)}`}</p>
                <p className='font-s-small ph-05 text-decoration-line'>{`$${data.price.toFixed(
                  1
                )}`}</p>
              </div>
            ) : (
              <div>{`$${data.price.toFixed(1)}`}</div>
            )}
          </div>
          <div className={c(s.img, 'p-1')}>
            <img src='/images/altComposition.png' alt='logo'></img>
          </div>
          {data.qty === 0 && (
            <div className={s.none}>
              <p className={c(s.noneText, 'font-s-xlarge opacity-1')}>Not in stock</p>
            </div>
          )}
        </div>
      )}
    </Draggable>
  )
}

export default CompositionCard
