import React, { useContext, useEffect } from 'react';
import GoalsContext from '../../contexts/GoalsContext';
import GoalsService from '../../services/goals-service';
import './Overview.css';

const GoalsOverview = (props) => {
  const { 
    goals = [],
    setGoals,
    setError,
  } = useContext(GoalsContext);

  useEffect(() => {
    async function getUserGoals() {
      try {
        const goals = await GoalsService.getGoals();
        setGoals(goals);
      }
      catch({ error }) {
        setError(error)
      }
    }
    getUserGoals();
  }, [setGoals, setError]);

  const renderGoals = (goals) => {
    const goalsList = [];
    let i = 0;

    for(const goal of goals) {
      if(i < 3 && i < goals.length && !goal.completed) {
        goalsList.push((
          <li
            className='list-item-group'
            key={i}
          >
            <span
              className='capitalize'
            >
              {goal.name}
            </span>
            <span>
              Saved ${goal.current_amount} of ${goal.goal_amount}
            </span>
          </li>
        ));
        i++;
      }
    }

    return (
      <>
        <ul
          className='list-group'
        >
          {goalsList}
        </ul>
        <button
          className='greybox-button right'
          onClick={() =>
            props.history.push('/goals')
          }
          type='click'
        >
          SEE ALL
        </button>
      </>
    );
  }

  return (
    <section
      className='overview-group'
    >
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
      {(goals.length)
          ? renderGoals(goals)
          : ''
      }
    </section>
  );
}

export default GoalsOverview;