import React, { useEffect, useState } from 'react';
import './DashBoardView.css';
import { Match } from './hooks/types';
import { useDashboard } from './hooks/useDashboard';

const DashboardViewer = () => {

  const [summary, add, remove, update] = useDashboard();
  const [actions, setActions] = useState<Array<string>>([]);

  const addMatches = () => {
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

    add({
      home: 'Sweden',
      visitor: 'Venezuela',
    });

    setActions(['Adding matches [col-eng, arg-usa, ita-ger, fra-bra, swe-ven]']);
  }

  const updateMatches = () => {

    setTimeout(() => {
      update({
        matchId: 'colombia-england',
        home: 2,
        visitor: 1,
      });
      setActions(oldState => [...oldState, 'colombia-england updated [2 - 1]']);
    }, 6000);

    setTimeout(() => {
      update({
        matchId: 'france-brasil',
        home: 5,
        visitor: 0,
      });
      setActions(oldState => [...oldState, 'france-brasil updated [5 - 0]']);
    }, 9000);

  }

  const finishMatches = () => {
    setTimeout(() => {
      remove('italy-germany');
      setActions(oldState => [...oldState, 'italy-germany ends [0 - 0]']);
    }, 13000);

  }

  useEffect(() => {
    addMatches();
    updateMatches();
    finishMatches();
  },[]);

  return (
    <div className="container">
      <h4>World Cup Dashboard</h4>
      <div className='container__panels'>
        <div className='container__actions'>
          <ol>
          {
            actions.map(a =><li>{a}</li>)
          }
          </ol>
        </div>
        <div className='container__matches'>
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
      </div>
    </div>
  );
}

export default DashboardViewer;
