import React, { Fragment, useContext } from 'react'
import CoursesContext from '../../context/courses/coursesContext'
import CourseItem from './CourseItem';

const Courses = () => {
  const coursesContext = useContext(CoursesContext);
  
  const { courses } = coursesContext;

  return (
    <Fragment>
     {courses.map(course => (
       <CourseItem key={course.id} course={course}/>
     ))}
    </Fragment>
  )
}

export default Courses
