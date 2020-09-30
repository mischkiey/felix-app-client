import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GoalsContext from '../../contexts/GoalsContext';
import GoalsService from '../../services/goals-service';
import './Goals.css';

const Goals = (props) => {
  const {
    goals = [],
    setGoals,
  } = useContext(GoalsContext);

  useEffect(() => {
    async function getUserGoals() {
      try {
        const goals = await GoalsService.getGoals();
        setGoals(goals);
      }
      catch(error) {
        console.log(error);
      }
    }
    getUserGoals();
  }, [setGoals]);

  const renderGoals = (goals) => {
    const goalsList = goals
      .map((goal, i) => {
        if(!goal.completed) {
          return (
            <li
              className=''
              key={i}
            >
              <Link
                className='list-item-group'
                to={`/goal/${goal.id}`}
              >
                <span
                  className='capitalize'
                >
                  {goal.name}
                </span>
                <span>
                  Saved ${goal.current_amount} of {goal.goal_amount}
                </span>
              </Link>
            </li>
          );
        }
        return '';
      });

      return (
        <ul
          className='list-group'
        >
          {goalsList}
        </ul>
      )
  }

  return (
    <article
      className='overview-group'>
      <div
        className='overview-header-group'
      >
        <h2
          className=''
        >
          Goals
        </h2>
        <i 
          className='material-icons'
          onClick={() =>
            props.history.push('/goal/add/ ')
          }
          type='click'
        >
          add_circle
        </i>
      </div>
      {
        (goals.length)
          ? renderGoals(goals)
          : ''
      }
      <button
        className='center greybox-button'
        onClick={() =>
          props.history.push('/')}
          type='click'
      >
        BACK
      </button>
    </article>
  )
}

export default Goals;