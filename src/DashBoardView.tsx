import React, { useEffect } from 'react';
import './DashBoardView.css';
import { useDashboard } from './hooks/useDashboard';
import { RawMatch } from './hooks/types';

function Dashboard() {
  const [addMatch, finishMatch, summary] = useDashboard();
  const match : RawMatch = {
    home: 'colombia',
    visitor: 'brasil',
  };

  useEffect(() => {
    const a = addMatch(match);
  }, []);

  return (
    <div className="App">
        {
          summary?.map(s => (
            <div>
              <div>matchId:</div> {s?.matchId}
            </div>
          ))
        }      
    </div>
  );
}

export default Dashboard;
