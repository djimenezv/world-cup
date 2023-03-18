/**
 * @jest-environment jsdom
 */
import { renderHook, act, waitFor } from '@testing-library/react';
import { useDashboard } from '../useDashboard';
import { SummaryItem } from '../types';

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
    }
  ]

  test('should add a match to the list of matches', async () => {
    const {result} = renderHook(() => useDashboard());
    let summaryResult : SummaryItem[] = [];
      
    act(() => {
      const matchId1 = result.current[0](newMatches[0]);
      const matchId2 = result.current[0](newMatches[1]);
      const matchId3 = result.current[0](newMatches[2]);

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
      expect(result.current[2]).toStrictEqual(summaryResult);
    }, { timeout: 3000 });
  });

  test('should remove a match from the summary', async () => {
    const {result} = renderHook(() => useDashboard());
    let summaryResult : SummaryItem[] = [];
      
    act(() => {
      const matchId1 = result.current[0](newMatches[0]);
      const matchId2 = result.current[0](newMatches[1]);
      const matchId3 = result.current[0](newMatches[2]);
      result.current[1](matchId3);

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
      expect(result.current[2]).toStrictEqual(summaryResult);
    }, { timeout: 3000});
  });

});
