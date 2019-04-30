import { Action } from '@ngrx/store';
import { clgu } from 'src/types';

export class ChallengesActions {
    public static readonly CREATE_CHALLENGE = '[Challenges] CREATE_CHALLENGE';
    public static readonly CREATE_CHALLENGE_SUCCESS = '[Challenges] CREATE_CHALLENGE_SUCCESS';
    public static readonly CREATE_CHALLENGE_FAIL = '[Challenges] CREATE_CHALLENGE_FAIL';

    public static readonly START_LISTEN_CHALLENGE_LIST = '[Challenges] START_LISTEN_CHALLENGE_LIST';
    public static readonly SAVE_CHALLENGE_LIST = '[Challenges] SAVE_CHALLENGE_LIST';
    public static readonly STOP_LISTEN_CHALLENGE_LIST = '[Challenges] STOP_LISTEN_CHALLENGE_LIST';

    public static readonly GET_CHALLENGE_DETAILS_IF_EMPTY = '[Challenges] GET_CHALLENGE_DETAILS_IF_EMPTY';
    public static readonly GET_CHALLENGE_DETAILS_IF_EMPTY_SUCCESS = '[Challenges] GET_CHALLENGE_DETAILS_IF_EMPTY_SUCCESS';
    public static readonly GET_CHALLENGE_DETAILS_IF_EMPTY_FAIL = '[Challenges] GET_CHALLENGE_DETAILS_IF_EMPTY_FAIL';


    public static readonly SHOW_UP_DATE = '[Challenges] SHOW_UP_DATE';
    public static readonly SHOW_UP_DATE_SUCCESS = '[Challenges] SHOW_UP_DATE_SUCCESS';
    public static readonly SHOW_UP_DATE_FAIL = '[Challenges] SHOW_UP_DATE_FAIL';



    public static readonly CreateChallenge = class implements Action {
        public readonly type = ChallengesActions.CREATE_CHALLENGE;
        constructor(public payload: clgu.challenges.CreateChallengeRequest) {}
    }


    public static readonly CreateChallengeSuccess = class implements Action {
        public readonly type = ChallengesActions.CREATE_CHALLENGE_SUCCESS;
        constructor(public payload: any) {}
    }

    public static readonly CreateChallengeFail = class implements Action {
        public readonly type = ChallengesActions.CREATE_CHALLENGE_FAIL;
        constructor(public payload: any) {}
    }

    public static readonly GetChallengeDetailsIfEmpty = class implements Action {
        public readonly type = ChallengesActions.GET_CHALLENGE_DETAILS_IF_EMPTY;
        constructor(public payload: string) {}
    }

    public static readonly GetChallengeDetailsIfEmptySuccess = class implements Action {
        public readonly type = ChallengesActions.GET_CHALLENGE_DETAILS_IF_EMPTY_SUCCESS;
        constructor(public payload: clgu.challenges.Challenge) {}
    }

    public static readonly GetChallengeDetailsIfEmptyFail = class implements Action {
        public readonly type = ChallengesActions.GET_CHALLENGE_DETAILS_IF_EMPTY_FAIL;
        constructor(public payload: clgu.common.ErrorWithId) {}
    }

    public static readonly SaveChallengeList = class implements Action {
        public readonly type = ChallengesActions.SAVE_CHALLENGE_LIST;
        constructor(public payload: any) {}
    }

    public static readonly ShowUpDate = class implements Action {
        public readonly type = ChallengesActions.SHOW_UP_DATE;
        constructor(public payload?: clgu.challenges.DayShowUpRequest) {}
    }

    public static readonly ShowUpDateSuccess = class implements Action {
        public readonly type = ChallengesActions.SHOW_UP_DATE_SUCCESS;
        constructor(public payload?: string) {}
    }


    public static readonly ShowUpDateFail = class implements Action {
        public readonly type = ChallengesActions.SHOW_UP_DATE_FAIL;
        constructor(public payload?: clgu.common.ErrorWithId) {}
    }


    public static readonly StartListenChallengeList = class implements Action {
        public readonly type = ChallengesActions.START_LISTEN_CHALLENGE_LIST;
        constructor(public payload?: any) {}
    }

    public static readonly StopListenChallengeList = class implements Action {
        public readonly type = ChallengesActions.STOP_LISTEN_CHALLENGE_LIST;
        constructor(public payload: any) {}
    }
}