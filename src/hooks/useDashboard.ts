import { Match, NewMatch, OperationResponse, SummaryItem, UpdateMatch } from "./types";
import React, { useEffect } from "react";
import { useState } from "react";
import { summary } from "./summary";

const useDashboard = () : [Array<Match>, (match:NewMatch) => OperationResponse, (matchId: string) => OperationResponse, (updateMatch : UpdateMatch) => OperationResponse] => {
  let matchesSummary : any = null;
  
  const [matches, setMatches] = useState<Array<Match>>([])

  useEffect(() => { 
    matchesSummary = summary()
  }, []);

  const addMatch = (match : NewMatch) : OperationResponse => {

    try {
      const newMatchId = matchesSummary.insert(match);
      const matchesReversed = [...matchesSummary.matches].reverse();
      const flattedMatches = matchesReversed.flatMap((m: SummaryItem) => m.matches);
      setMatches(flattedMatches);

      return {
        response: newMatchId,
        error: null,
      }
    } catch (error) {
      return {
        response: null,
        error: error,
      }
    }
  }

  const finishMatch = (matchId : string) : OperationResponse => {
    try {
      matchesSummary.remove(matchId);

      // if there is no matches empty array is set
      if(matchesSummary.matches.length === 0) setMatches([]);

      const matchesReversed = [...matchesSummary.matches].reverse();
      const flattedMatches = matchesReversed.flatMap((m: SummaryItem) => m.matches);

      setMatches(flattedMatches);

      return {
        response: 'success',
        error: null,
      }
    } catch (error) {
      return {
        response: null,
        error: error,
      }
    }
  }

  const updateMatch = (match: UpdateMatch) : OperationResponse => {
    try {
      matchesSummary.update(match);
      const matchesReversed = [...matchesSummary.matches].reverse();
      const flattedMatches = matchesReversed.flatMap((m: SummaryItem) => m.matches);
      setMatches(flattedMatches); 

      return {
        response: 'success',
        error: null,
      }
    } catch (error) {
      return {
        response: null,
        error: error,
    }
  }

  }

  return [matches, addMatch, finishMatch, updateMatch];
} 

export {
  useDashboard,
}