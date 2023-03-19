import React, { useEffect, useState } from 'react';
import './DashBoardView.css';
import { Match } from '../hooks/types';
import { useDashboard } from '../hooks/useDashboard';

const Dashboard = () => {

  const [summary, add, remove, update] = useDashboard();
  const [actions, setActions] = useState<Array<string>>([]);

  const addMatch = (home: string, visitor: string) => {
    // match col-eng, arg-usa, ita-ger, fra-bra
    add({
      home: home,
      visitor: visitor,
    });
  }

  const updateMatche = (matchId: string, homeScore: number, visitorScore: number) => {
      update({
        matchId: matchId,
        home: homeScore,
        visitor: visitorScore,
      });
  }

  const finishMatches = (matchId: string) => {
      remove(matchId);
  }

  return (
    <div className="container">
      <h4>World Cup Dashboard</h4>
        {
          summary?.map((m:Match) => 
            <div className='container__match' key={m.matchId}>
              <div className='container__match__item'>
                <span className='container__match__item__team'>{m.home.name}</span>
                <span className='container__match__item__goals'>{m.home.goals}</span>
              </div>
              <div className='container__match__item justify-start'>
                <span className='container__match__item__goals'>{m.visitor.goals}</span>
                <span className='container__match__item__team'>{m.visitor.name}</span>
              </div>
            </div>
          )
        }
    </div>
  );
}

export default Dashboard;
