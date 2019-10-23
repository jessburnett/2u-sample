import React from 'react'

const CourseItem = ({ course }) => {
  const { id, title, instructor, type } = course;
  return (
    <div className='card bg-light'>
      <h3 className='flex-space-between'>
        <span className='text-primary'>
          {title}
        </span>
        <span
          className={'text-primary ' +
            (type === 'paid' ? 'fas fa-dollar-sign' : '')
          }
        >
          {type === 'free' ? 'FREE' : ''}
        </span>
      </h3>
      <div>
        By: {instructor}
      </div>
    </div>
  )
}

export default CourseItem
