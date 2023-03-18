/**
 * @jest-environment jsdom
 */
import { renderHook, act, waitFor } from '@testing-library/react';
import { useDashboard } from '../useDashboard';
import { Match, NewMatch, SummaryItem, UpdateMatch } from '../types';

describe('Dashboard hook', () => {

  // matches definition
  const matchBraCol = {
    visitor: 'Colombia',
    home: 'Brasil',
  };
  
  const matchUruChi = {
    visitor: 'Chile',
    home: 'Uruguay',
  }

  const matchArgPar = {
    visitor: 'Paraguay',
    home: 'Argentina',
  };

  const matchesLoader = (addMatchFunction: (newMatch: NewMatch) => string) :[string, string, string] => {
    const matchIdBraCol = addMatchFunction(matchBraCol);
    const matchIdUryChi = addMatchFunction(matchUruChi);
    const matchIdArgPar = addMatchFunction(matchArgPar);
    return [matchIdBraCol, matchIdUryChi, matchIdArgPar];
  }

  const summaryAddResult : SummaryItem[] = [
    {
      weight: 0,
      matches: [
        {
          home: {
            name: 'Argentina',
            goals: 0,
          },
          visitor: {
            name: 'Paraguay',
            goals: 0,
          },
          matchId:'',
        },
        {
          home: {
            name: 'Brasil',
            goals: 0,
          },
          visitor: {
            name: 'Colombia',
            goals: 0,
          },
          matchId:'',
        },
        {
          home: {
            name: 'Uruguay',
            goals: 0,
          },
          visitor: {
            name: 'Chile',
            goals: 0,
          },
          matchId:'',
        },
      ]
    },
    {
      weight: 2,
      matches: [
        {
          home: {
            name: 'Uruguay',
            goals: 1,
          },
          visitor: {
            name: 'Chile',
            goals: 1,
          },
          matchId:'',
        },
        {
          home: {
            name: 'Argentina',
            goals: 1,
          },
          visitor: {
            name: 'Paraguay',
            goals: 1,
          },
          matchId:'',
        },
      ]
    }

  ]

  test('should add a match to the list of matches', async () => {
    const {result} = renderHook(() => useDashboard());
    let summaryResult : Match[] = [];
      
    act(() => {
      // adding matches [{col - bra}, {uru - chi}, {arg - par}]
      const [matchIdBraCol, matchIdUryChi, matchIdArgPar] = matchesLoader(result.current[1]);

      summaryResult = [
        {
          ...summaryAddResult[0].matches[0],
          matchId: matchIdArgPar,
        },
        {
          ...summaryAddResult[0].matches[1],
          matchId: matchIdBraCol,
        },
        {
          ...summaryAddResult[0].matches[2],
          matchId: matchIdUryChi,
        }
      ];
    });

    await waitFor(() => {
      expect(result.current[0]).toStrictEqual(summaryResult);
    }, { timeout: 3000 });
  });

  test('should remove a match from the summary', async () => {
    const {result} = renderHook(() => useDashboard());
    let summaryResult : Match[] = [];
      
    act(() => {
      // adding matches [{col - bra}, {uru - chi}, {arg - par}]
      const [matchIdBraCol, matchIdUryChi, matchIdArgPar] = matchesLoader(result.current[1]);
      result.current[2](matchIdArgPar);

      summaryResult = [
        {
          ...summaryAddResult[0].matches[1],
          matchId: matchIdBraCol,
        },
        {
          ...summaryAddResult[0].matches[2],
          matchId: matchIdUryChi,
        }
      ]
    });

    await waitFor(() => {
      expect(result.current[0]).toStrictEqual(summaryResult);
    }, { timeout: 3000});
  });

  test('should update a matc in the summary succesfully', async () => {
    const {result} = renderHook(() => useDashboard());
    let summaryResult : Match[] = [];
      
    act(() => {
      // adding matches [{col - bra}, {uru - chi}, {arg - par}]
      const [matchIdBraCol, matchIdUryChi, matchIdArgPar] = matchesLoader(result.current[1]);

      const matchToUpdateArgPar : UpdateMatch = {
        matchId:matchIdArgPar,
        home: 1,
        visitor: 1,
      }

      const matchToUpdateUrCh : UpdateMatch = {
        matchId:matchIdUryChi,
        home: 1,
        visitor: 1,
      }

      result.current[3](matchToUpdateArgPar);
      result.current[3](matchToUpdateUrCh);

      summaryResult = [
        {
          ...summaryAddResult[0].matches[1],
          matchId: matchIdBraCol,
        },
        {
          ...summaryAddResult[1].matches[1],
          matchId: matchIdArgPar,
        },
        {
          ...summaryAddResult[1].matches[0],
          matchId: matchIdUryChi,
        },
      ]
    });

    await waitFor(() => {
      expect(result.current[0]).toStrictEqual(summaryResult);
    }, { timeout: 3000});
  });

});
