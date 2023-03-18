import { Match, NewMatch, SummaryItem, UpdateMatch } from "./types";
import React, { useEffect, useReducer } from "react";
import { useState } from "react";
import { summary } from "./summary";

// List of harcoded teams in real app this should come from a request call
const teams: Array<string> = [
    'Argentina',
    'Brasil',
    'Colombia',
    'Urugay',
    'Chile',
];
const useDashboard = () : [Array<SummaryItem>, (match:NewMatch) => string, (matchId: string) => void, (updateMatch : UpdateMatch) => void] => {
  let matchesSummary : any = null;
  
  const [matches, setMatches] = useState<Array<SummaryItem>>([])

  useEffect(() => { 
    matchesSummary = summary()
  }, []);

  const addMatch = (match : NewMatch) : string => {
    const newMatchId = matchesSummary.insert(match);
    setMatches([...matchesSummary.matches]);
    return newMatchId;
  }

  const finishMatch = (matchId : string) : void => {
    matchesSummary.remove(matchId);
    setMatches([...matchesSummary.matches]);
  }

  const updateMatch = (match: UpdateMatch) => {
    matchesSummary.update(match);
    setMatches([...matchesSummary.matches]); 
  }

  return [matches, addMatch, finishMatch, updateMatch];
} 

export {
  teams,
  useDashboard,
}