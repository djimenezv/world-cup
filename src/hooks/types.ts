export interface RawMatch {
    home: string,
    visitor: string,
}

export interface Match {
    home: MatchTeam,
    visitor: MatchTeam,
    matchId: string,
}

export interface MatchTeam {
    name: string,
    goals: number,
}

export interface SummaryItem {
    weight: number,     // based on match current result
    matches: Match[],   // matches with same weight
}

export interface MatchReference {
    matchNode: Match,
    weightNode : SummaryItem,
}