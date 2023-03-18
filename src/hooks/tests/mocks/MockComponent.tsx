import { Match, RawMatch } from "../../types";
import { useDashboard } from "../../useDashboard";

const MockComponent = ({ newMatches, callback }: { newMatches: Array<RawMatch>, callback: () => Array<Match> }) => {
    const [addMatch, match, matches] = useDashboard();
  
    addMatch(newMatches[0]);
    addMatch(newMatches[1]);
  
    callback = () => matches;

    return (
      <div>
        {matches?.map(match => (
          <div key={match.matchId}>
            <h4>{match.matchId}</h4>
            <span>{match.home.name}:{match.home.goals}</span>
            <span>{match.visitor.name}:{match.visitor.goals}</span>
          </div>
        ))}
      </div>
    )
  }

  export {
    MockComponent,
  }