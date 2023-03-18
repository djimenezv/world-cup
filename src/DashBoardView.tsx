import React, { useEffect } from 'react';
import './DashBoardView.css';
import { Match } from './hooks/types';
import { useDashboard } from './hooks/useDashboard';

const DashboardViewer = () => {

  const [summary, add, remove, update] = useDashboard();

  useEffect(() => {
    // match col-eng, arg-usa, ita-ger, fra-bra
    add({
      home: 'Colombia',
      visitor: 'England',
    });

    add({
      home: 'Argentina',
      visitor: 'USA',
    });

    add({
      home: 'Italy',
      visitor: 'Germany',
    });

    add({
      home: 'France',
      visitor: 'Brasil',
    });

  });

  return (
    <div className="container">
        {
          summary?.map((m:Match) => 
            <div className='container__match' key={m.matchId}>
              <div className='container__match__item'>
                <span className='container__match__item__team'>{m.home.name}</span>
                <span className='container__match__item__goals'>{m.home.goals}</span>
              </div>
              -
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

export default DashboardViewer;
