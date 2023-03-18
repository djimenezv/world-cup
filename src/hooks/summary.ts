import { Match, MatchReference, SummaryItem } from "./types";

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

const insertMatch = (newMatch: Match, currentSummary : SummaryItem[], matchReferences: Map<string, {}>) => { 
    // search position using binary search
    const weightIndex = findPositionWeightDimension(newMatch, currentSummary);

    // if there is already an item with same weight we need to insert new item in that
    if(currentSummary[weightIndex] && currentSummary[weightIndex].weight === getMatchWeight(newMatch)) {
        const namesIndex = findPositionNamesDimension(newMatch, currentSummary[weightIndex].matches);
        currentSummary[weightIndex].matches.splice(namesIndex, 0, newMatch);
    } else {
        // there is no existing item with same weight so we insert summary item in found position
        const newSummaryItem : SummaryItem = {
            weight: newMatch.home.goals + newMatch.visitor.goals,
            matches: [newMatch],
        } 

        currentSummary.splice(weightIndex, 0, newSummaryItem);
    }

    // adding new reference
    matchReferences.set(newMatch.matchId, {
        weightNode: currentSummary[weightIndex],
        matchNode: newMatch,
    });

    return newMatch.matchId;
}

const remove = (matchId:string, matchRefences: Map<string, MatchReference>) => {
    const matchReference = matchRefences.get(matchId);
    const matchIndex = matchReference?.weightNode.matches.indexOf(matchReference.matchNode); 
    if(matchIndex !== undefined)matchReference?.weightNode.matches.splice(matchIndex, 1);
}

const summary = () => {
    const summaryItems: SummaryItem[] = [];
    const matchReferences: Map<string, MatchReference> = new Map();
 
    return {
        insert: (newMatch: Match) => insertMatch(newMatch, summaryItems, matchReferences),
        remove: (matchId: string) => remove(matchId, matchReferences),
        matches: summaryItems,
    }
}

export {
    summary,
}