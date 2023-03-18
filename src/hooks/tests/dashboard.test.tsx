/**
 * @jest-environment jsdom
 */
import { renderHook, act, waitFor } from '@testing-library/react';
import { useDashboard } from '../useDashboard';
import { Match, NewMatch, OperationResponse, SummaryItem, UpdateMatch } from '../types';

describe('Dashboard hook', () => {

  // loader function
  const matchesLoader = (addMatchFunction: (newMatch: NewMatch) => OperationResponse) :[string|null, string|null, string|null] => {
    const matchIdBraCol = addMatchFunction(matchBraCol);
    const matchIdUryChi = addMatchFunction(matchUruChi);
    const matchIdArgPar = addMatchFunction(matchArgPar);
    return [matchIdBraCol.response, matchIdUryChi.response, matchIdArgPar.response];
  }

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

  // scores used during test
  const score00ArgPar = {
    home: {
      name: 'Argentina',
      goals: 0,
    },
    visitor: {
      name: 'Paraguay',
      goals: 0,
    },
    matchId:'argentina-paraguay',
  };
  
  const score00BraCol ={
    home: {
      name: 'Brasil',
      goals: 0,
    },
    visitor: {
      name: 'Colombia',
      goals: 0,
    },
    matchId:'brasil-colombia',
  };

  const score00UruChile = {
    home: {
      name: 'Uruguay',
      goals: 0,
    },
    visitor: {
      name: 'Chile',
      goals: 0,
    },
    matchId:'uruguay-chile',
  };

  const score11UruChile = {
    home: {
      name: 'Uruguay',
      goals: 1,
    },
    visitor: {
      name: 'Chile',
      goals: 1,
    },
    matchId:'uruguay-chile',
  };

  const score11ArgPar = {
    home: {
      name: 'Argentina',
      goals: 1,
    },
    visitor: {
      name: 'Paraguay',
      goals: 1,
    },
    matchId:'argentina-paraguay',
  };

  test('should add a match to the list of matches', async () => {
    const {result} = renderHook(() => useDashboard());
    let summaryResult : Match[] = [];
      
    act(() => {
      // adding matches [{col - bra}, {uru - chi}, {arg - par}]
      matchesLoader(result.current[1]);

      // sorted response with all matches starting 0 - 0
      summaryResult = [score00ArgPar, score00BraCol, score00UruChile];
    });

    await waitFor(() => {
      expect(result.current[0]).toStrictEqual(summaryResult);
    }, { timeout: 3000 });
  });

  test('should remove a match from the summary', async () => {
    const {result} = renderHook(() => useDashboard());
    let summaryResult : Match[] = [];
    let finishingResponse : OperationResponse;
      
    act(() => {
      // adding matches [{col - bra}, {uru - chi}, {arg - par}]
      const [matchIdBraCol, matchIdUryChi, matchIdArgPar] = matchesLoader(result.current[1]);
      // finishing match argentina - paraguay
      finishingResponse = result.current[2](matchIdArgPar??'');

      // sorted response without match arg-par since was removed
      summaryResult = [score00BraCol, score00UruChile];
    });

    await waitFor(() => {
      expect(finishingResponse.response).toEqual('success');
      expect(finishingResponse.error).toEqual(null);
      expect(result.current[0]).toStrictEqual(summaryResult);
    }, { timeout: 3000});
  });

  test('should update a match in the summary succesfully', async () => {
    const {result} = renderHook(() => useDashboard());
    let summaryResult : Match[] = [];
    let updateArgParResponse : OperationResponse;
    let updateUrChResponse : OperationResponse;
      
    act(() => {
      // adding matches [{col - bra}, {uru - chi}, {arg - par}]
      const [matchIdBraCol, matchIdUryChi, matchIdArgPar] = matchesLoader(result.current[1]);

      const matchToUpdateArgPar : UpdateMatch = {
        matchId:matchIdArgPar??'',
        home: 1,
        visitor: 1,
      }

      const matchToUpdateUrCh : UpdateMatch = {
        matchId:matchIdUryChi??'',
        home: 1,
        visitor: 1,
      }

      // updating matches argentina (1) - (1) paraguay and uruguay (1) - (1) chile  
      updateArgParResponse = result.current[3](matchToUpdateArgPar);
      updateUrChResponse = result.current[3](matchToUpdateUrCh);

      summaryResult = [score11ArgPar, score11UruChile, score00BraCol];
    });

    await waitFor(() => {
      expect(updateArgParResponse.response).toEqual('success');
      expect(updateArgParResponse.error).toEqual(null);
      expect(updateUrChResponse.response).toEqual('success');
      expect(updateUrChResponse.error).toEqual(null);
      expect(result.current[0]).toStrictEqual(summaryResult);
    }, { timeout: 3000});
  });

  test('should return error if try to add duplicated on going match', async () => {
    const {result} = renderHook(() => useDashboard());
    let summaryResult : Match[] = [];
    let braColResponse : OperationResponse;
    let braColResponseErr : OperationResponse;

    act(() => {
      // adding matches [{bra - col}, {bra - col}]
      braColResponse    = result.current[1](matchBraCol);
      braColResponseErr = result.current[1](matchBraCol);

      // sorted response with only first match added
      summaryResult = [score00BraCol];
    });

    await waitFor(() => {
      expect(braColResponse.response).toBe('brasil-colombia'),
      expect(braColResponseErr.response).toBe(null);
      expect(braColResponseErr.error.message).toBe('Match already added');
      expect(result.current[0]).toStrictEqual(summaryResult);
    }, { timeout: 3000 });
  });


});
