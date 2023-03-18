import { Match, RawMatch, SummaryItem } from "./types";
import React, { useEffect, useReducer } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { summary } from "./summary";

// List of harcoded teams in real app this should come from a request call
const teams: Array<string> = [
    'Argentina',
    'Brasil',
    'Colombia',
    'Urugay',
    'Chile',
];

const getNewMatchWithId = (rawMatch : RawMatch) => {
  const matchId = uuidv4();

  const match : Match = {
    visitor: {
      name: rawMatch.visitor,
      goals: 0,
    },
    home: {
      name: rawMatch.home,
      goals: 0,
    },
    matchId,
  }

  return match; 
}

const useDashboard = () : [(match:RawMatch) => string, (matchId: string) => void, Array<SummaryItem>] => {
  let matchesSummary : any = null;
  
  const [matches, setMatches] = useState<Array<SummaryItem>>([])

  useEffect(() => { 
    matchesSummary = summary()
  }, []);

  const addMatch = (match : RawMatch) : string => {
    const newMatch = getNewMatchWithId(match);
    matchesSummary.insert(newMatch);
    setMatches([...matchesSummary.matches]);
    return newMatch.matchId;
  }

  const finishMatch = (matchId : string) : void => {
    matchesSummary.remove(matchId);
    setMatches([...matchesSummary.matches]);
  }

  return [addMatch, finishMatch, matches];
} 

export {
  teams,
  useDashboard,
}