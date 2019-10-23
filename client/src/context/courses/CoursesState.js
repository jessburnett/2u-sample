import React, { useReducer } from 'react'
import uuid from 'uuid'
import CoursesContext from './coursesContext'
import coursesReducer from './coursesReducer'
import {
  ADD_COURSE,
  DELETE_COURSE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_COURSE,
  FILTER_COURSES,
  CLEAR_FILTER
} from '../types'

const CoursesState = props => {
  //hard code dummy data for now
  //will hook into back later
  const initialState = {
    courses: [
      {
        id:1,
        title: 'Biology',
        instructor: 'Bruce Lipton',
        type: 'free'
      },
      {
        id:2,
        title: 'Anatomy',
        instructor: 'Lyn Talbot',
        type: 'paid'
      },
      {
        id:3,
        title: 'CS 50',
        instructor: 'David Malan',
        type: 'paid'
      }
    ]
  };

  const [state, dispatch] = useReducer(coursesReducer, initialState);
  //ADD COURSE

  //DELETE COURSE

  //SET CURRENT COURSE

  //CLEAR CURRENT COURSE

  //UPDATE COURSE

  //FILTER COURSES

  //CLEAR FILTER

  return (
    <CoursesContext.Provider
    value={{courses: state.courses}}>
      {props.children}
    </CoursesContext.Provider>
  )
};

export default CoursesState;