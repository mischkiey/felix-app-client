import React from 'react';
import GoalForm from '../components/GoalForm/GoalForm';

const GoalFormRoute = (props) => {
  return (
    <section
      className='overview-group'
    >
      <GoalForm 
        {...props}
      />
    </section>
  )
}

export default GoalFormRoute;