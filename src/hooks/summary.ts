import { Match, MatchReference, NewMatch, SummaryItem, UpdateMatch } from "./types";
import { v4 as uuidv4 } from 'uuid';

const getNewMatchWithId = (rawMatch : NewMatch) => {
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

const addMatch = (match: Match, currentSummary : SummaryItem[], matchReferences: Map<string, {}>) => {
    const weightIndex = findPositionWeightDimension(match, currentSummary);

    // if there is already an item with same weight we need to insert new item in that
    if(currentSummary[weightIndex] && currentSummary[weightIndex].weight === getMatchWeight(match)) {
        const namesIndex = findPositionNamesDimension(match, currentSummary[weightIndex].matches);
        currentSummary[weightIndex].matches.splice(namesIndex, 0, match);
    } else {
        // there is no existing item with same weight so we insert summary item in found position
        const newSummaryItem : SummaryItem = {
            weight: match.home.goals + match.visitor.goals,
            matches: [match],
        } 

        currentSummary.splice(weightIndex, 0, newSummaryItem);
    }

    // adding new reference
    matchReferences.set(match.matchId, {
        weightNode: currentSummary[weightIndex],
        matchNode: match,
    });

    return match.matchId;

}

const getMatchWeight = (match: Match) => match.home.goals + match.visitor.goals;

const findPositionWeightDimension = (newMatch: Match, currentSummary : SummaryItem[]) : number => {
    let low = 0;
    let high = currentSummary.length - 1;

    while(low <= high) {
        const pivot = Math.floor((high + low) / 2);
        
        if(currentSummary[pivot].weight === getMatchWeight(newMatch)) {
            return pivot;
        }
        else if(currentSummary[pivot].weight > getMatchWeight(newMatch)) {
            high = pivot - 1;
        } else {
            low = pivot + 1;
        }
    }

    return low;
}

const findPositionNamesDimension = (newMatch: Match, matches : Match[]) : number => {
    let low = 0;
    let high = matches.length - 1;

    while(low <= high) {
        const pivot = Math.floor((high + low) / 2);
        
        if(matches[pivot].home.name.localeCompare(newMatch.home.name) === 1) {
            return pivot;
        } else if(matches[pivot].home.name.localeCompare(newMatch.home.name) < 1) {
            low = pivot + 1;
        } else {
            high = pivot - 1;
        }
    }

    return low;
}

const insertNewMatch = (match: NewMatch, currentSummary : SummaryItem[], matchReferences: Map<string, {}>) => { 
    const newMatch = getNewMatchWithId(match);
    return addMatch(newMatch, currentSummary, matchReferences);
}

const insertExistingMatch = (match: Match, currentSummary : SummaryItem[], matchReferences: Map<string, {}>) => { 
    return addMatch(match, currentSummary, matchReferences);
}

const remove = (matchId: string, matchRefences: Map<string, MatchReference>) => {
    const matchReference = matchRefences.get(matchId);
    const matchIndex = matchReference?.weightNode.matches.indexOf(matchReference.matchNode); 
    if(matchIndex !== undefined)matchReference?.weightNode.matches.splice(matchIndex, 1);
}

const update = (match: UpdateMatch, summaryMatches: SummaryItem[], matchRefences: Map<string, MatchReference>) => {
    const matchToUpdate = matchRefences.has(match.matchId) ? matchRefences.get(match.matchId) : null;

    if(!matchToUpdate) throw new Error(`match ${match.matchId} not found`);

    // creating a new match with updates
    const matchToUpdateClone : Match = {
        matchId: matchToUpdate.matchNode.matchId,
        visitor: {
            ...matchToUpdate?.matchNode.visitor,
            goals: match.visitor,
        },
        home: {
            ...matchToUpdate?.matchNode.home,
            goals: match.home
        },
    }

    // removing existing match
    remove(match.matchId, matchRefences);
    // removing existing match reference from map
    matchRefences.delete(match.matchId);
    // adding back updated match using insert method to keep the summary sorted
    insertExistingMatch(matchToUpdateClone, summaryMatches, matchRefences)
}

const summary = () => {
    // holds a sorted summary of the matches
    const summaryItems: SummaryItem[] = [];
    // holds a reference to each match so matches can be found easy and fast O(1)
    const matchReferences: Map<string, MatchReference> = new Map();
 
    return {
        insert: (newMatch: NewMatch) => insertNewMatch(newMatch, summaryItems, matchReferences),
        remove: (matchId: string) => remove(matchId, matchReferences),
        update: (match: UpdateMatch) => update(match, summaryItems, matchReferences),
        matches: summaryItems,
    }
}

export {
    summary,
}