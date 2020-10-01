import React, { useContext, useEffect } from 'react';
import moment from 'moment';
import GoalsContext from '../../contexts/GoalsContext';
import GoalsService from '../../services/goals-service';
import './Goal.css';

const Goal = (props) => {
  const { 
    goal = {},
    setGoal 
  } = useContext(GoalsContext);

  useEffect(() => {
    async function getGoal() {
      try {
        const goal = await GoalsService.getGoal(props.match.params.id);
        setGoal(goal);
      }
      catch(error) {
        console.log(error);
      }
    }
    getGoal();

  }, [setGoal, props.match.params]);

  const handleDeleteGoal = async () => {
    try {
      const response = await GoalsService.deleteGoal(goal.id);
      props.history.push(`/goals`);
      console.log(response);
    }
    catch(error) {
      console.log(error);
    }
  }

  return (
    <article
      className='overview-group'
    >
      <h2
        className='capitalize center'
      >
        {goal.name}
      </h2>
      <ul
        className='list-group'
      >
        <li
          className='list-item-group no-border'
        >
          <span
            className=''
          >
            Goal Amount:
          </span>
          <span
            className=''
          >
            {goal.goal_amount}
          </span>
        </li>
        <li
          className='list-item-group no-border'
        >
          <span
            className=''
          >
            Current Amount:
          </span>
          <span
            className=''
          >
            {goal.current_amount}
          </span>
        </li>
        <li
          className='list-item-group no-border'
        >
          <span
            className=''
          >
            Weekly Contribution Amount:
          </span>
          <span
            className=''
          >
            {goal.contribution_amount}
          </span>
        </li>
        <li
          className='list-item-group no-border'
        >
          <span
            className=''
          >
            Target End Date:
          </span>
          <span
            className=''
          >
            {moment(goal.end_date).format('MM/DD/YYYY')}
          </span>
        </li>
      </ul>
      <button
        className='center greybox-button'
        onClick={() =>
          props.history.push(`/goal/edit/${goal.id}`)
        }
      >
        EDIT
      </button>
      <button
        className='center greybox-button'
        onClick={() =>
          handleDeleteGoal()
        }
      >
        DELETE
      </button>
    </article>
  )
}

export default Goal;