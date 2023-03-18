/**
 * @jest-environment jsdom
 */
import { renderHook, act, waitFor } from '@testing-library/react';
import { useDashboard } from '../useDashboard';
import { SummaryItem, UpdateMatch } from '../types';

describe('Dashboard hook', () => {

  const newMatches = [
    {
      visitor: 'Colombia',
      home: 'Brasil',
    },
    {
      visitor: 'Chile',
      home: 'Uruguay',
    },
    {
      visitor: 'Paraguay',
      home: 'Argentina',
    }
  ];

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
    let summaryResult : SummaryItem[] = [];
      
    act(() => {
      const matchId1 = result.current[1](newMatches[0]);
      const matchId2 = result.current[1](newMatches[1]);
      const matchId3 = result.current[1](newMatches[2]);

      summaryResult = [
        {
          weight: summaryAddResult[0].weight,
          matches: [
            {
              ...summaryAddResult[0].matches[0],
              matchId: matchId3,
            },
            {
              ...summaryAddResult[0].matches[1],
              matchId: matchId1,
            },
            {
              ...summaryAddResult[0].matches[2],
              matchId: matchId2,
            }
          ]
        }
      ]
    });

    await waitFor(() => {
      expect(result.current[0]).toStrictEqual(summaryResult);
    }, { timeout: 3000 });
  });

  test('should remove a match from the summary', async () => {
    const {result} = renderHook(() => useDashboard());
    let summaryResult : SummaryItem[] = [];
      
    act(() => {
      const matchId1 = result.current[1](newMatches[0]);
      const matchId2 = result.current[1](newMatches[1]);
      const matchId3 = result.current[1](newMatches[2]);
      result.current[2](matchId3);

      summaryResult = [
        {
          weight: summaryAddResult[0].weight,
          matches: [
            {
              ...summaryAddResult[0].matches[1],
              matchId: matchId1,
            },
            {
              ...summaryAddResult[0].matches[2],
              matchId: matchId2,
            }
          ]
        }
      ]
    });

    await waitFor(() => {
      expect(result.current[0]).toStrictEqual(summaryResult);
    }, { timeout: 3000});
  });

  test('should update a matc in the summary succesfully', async () => {
    const {result} = renderHook(() => useDashboard());
    let summaryResult : SummaryItem[] = [];
      
    act(() => {
      const matchId1 = result.current[1](newMatches[0]);
      const matchId2 = result.current[1](newMatches[1]);
      const matchId3 = result.current[1](newMatches[2]);

      const matchToUpdateArgPar : UpdateMatch = {
        matchId:matchId3,
        home: 1,
        visitor: 1,
      }

      const matchToUpdateUrCh : UpdateMatch = {
        matchId:matchId2,
        home: 1,
        visitor: 1,
      }

      result.current[3](matchToUpdateArgPar);
      result.current[3](matchToUpdateUrCh);

      summaryResult = [
        {
          weight: summaryAddResult[0].weight,
          matches: [
            {
              ...summaryAddResult[0].matches[1],
              matchId: matchId1,
            }
          ]
        },
        {
          weight: summaryAddResult[1].weight,
          matches: [
            {
              ...summaryAddResult[1].matches[1],
              matchId: matchId3,
            },
            {
              ...summaryAddResult[1].matches[0],
              matchId: matchId2,
            },
          ]
        }

      ]
    });

    await waitFor(() => {
      expect(result.current[0]).toStrictEqual(summaryResult);
    }, { timeout: 3000});
  });

});
