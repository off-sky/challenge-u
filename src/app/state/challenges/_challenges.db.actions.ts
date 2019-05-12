import { Action } from '@ngrx/store';
import { clgu } from 'src/types';

export class ChallengesDbActions {

    /**
     * Db related actions
     */
    public static readonly RELOAD_CHALLENGE_BASIC_INFO = '[Challenges Db] RELOAD_CHALLENGE_BASIC_INFO';
    public static readonly RELOAD_CHALLENGE_BASIC_INFO_SUCCESS = '[Challenges Db] RELOAD_CHALLENGE_BASIC_INFO_SUCCESS';
    public static readonly RELOAD_CHALLENGE_BASIC_INFO_FAIL = '[Challenges Db] RELOAD_CHALLENGE_BASIC_INFO_FAIL';

    public static readonly RELOAD_CHALLENGE_DATES = '[Challenges Db] RELOAD_CHALLENGE_DATES';
    public static readonly RELOAD_CHALLENGE_DATES_SUCCESS = '[Challenges Db] RELOAD_CHALLENGE_DATES_SUCCESS';
    public static readonly RELOAD_CHALLENGE_DATES_FAIL = '[Challenges Db] RELOAD_CHALLENGE_DATES_FAIL';

    public static readonly RELOAD_CHALLENGE_PARTICIPANTS = '[Challenges Db] RELOAD_CHALLENGE_PARTICIPANTS';
    public static readonly RELOAD_CHALLENGE_PARTICIPANTS_SUCCESS = '[Challenges Db] RELOAD_CHALLENGE_PARTICIPANTS_SUCCESS';
    public static readonly RELOAD_CHALLENGE_PARTICIPANTS_FAIL = '[Challenges Db] RELOAD_CHALLENGE_PARTICIPANTS_FAIL';
    public static readonly START_LISTEN_CHALLENGE_PARTICIPANTS = '[Challenges Db] START_LISTEN_CHALLENGE_PARTICIPANTS';
    public static readonly STOP_LISTEN_CHALLENGE_PARTICIPANTS = '[Challenges Db] STOP_LISTEN_CHALLENGE_PARTICIPANTS';

    public static readonly RELOAD_USER_CHALLENGE_DATES = '[Challenges Db] RELOAD_USER_CHALLENGE_DATES';
    public static readonly RELOAD_USER_CHALLENGE_DATES_SUCCESS = '[Challenges Db] RELOAD_USER_CHALLENGE_DATES_SUCCESS';
    public static readonly RELOAD_USER_CHALLENGE_DATES_FAIL = '[Challenges Db] RELOAD_USER_CHALLENGE_DATES_FAIL';
    public static readonly START_LISTEN_USER_CHALLENGE_DATES = '[Challenges Db] START_LISTEN_USER_CHALLENGE_DATES';
    public static readonly STOP_LISTEN_USER_CHALLENGE_DATES = '[Challenges Db] STOP_LISTEN_USER_CHALLENGE_DATES';

    public static readonly RELOAD_USER_CHALLENGES = '[Challenges Db] RELOAD_USER_CHALLENGES';
    public static readonly RELOAD_USER_CHALLENGES_SUCCESS = '[Challenges Db] RELOAD_USER_CHALLENGES_SUCCESS';
    public static readonly RELOAD_USER_CHALLENGES_FAIL = '[Challenges Db] RELOAD_USER_CHALLENGES_FAIL';
    public static readonly START_LISTEN_USER_CHALLENGES = '[Challenges Db] START_LISTEN_USER_CHALLENGES';
    public static readonly STOP_LISTEN_USER_CHALLENGES = '[Challenges Db] STOP_LISTEN_USER_CHALLENGES';

    public static readonly RELOAD_CHALLENGES_REQUIREMENTS = '[Challenges Db] RELOAD_CHALLENGES_REQUIREMENTS';
    public static readonly RELOAD_CHALLENGES_REQUIREMENTS_SUCCESS = '[Challenges Db] RELOAD_CHALLENGES_REQUIREMENTS_SUCCESS';
    public static readonly RELOAD_CHALLENGES_REQUIREMENTS_FAIL = '[Challenges Db] RELOAD_CHALLENGES_REQUIREMENTS_FAIL';
    public static readonly START_LISTEN_CHALLENGES_REQUIREMENTS = '[Challenges Db] START_LISTEN_CHALLENGES_REQUIREMENTS';
    public static readonly STOP_LISTEN_CHALLENGES_REQUIREMENTS = '[Challenges Db] STOP_LISTEN_CHALLENGES_REQUIREMENTS';

    public static readonly RELOAD_CHALLENGES_MEASUREMENTS = '[Challenges Db] RELOAD_CHALLENGES_MEASUREMENTS';
    public static readonly RELOAD_CHALLENGES_MEASUREMENTS_SUCCESS = '[Challenges Db] RELOAD_CHALLENGES_MEASUREMENTS_SUCCESS';
    public static readonly RELOAD_CHALLENGES_MEASUREMENTS_FAIL = '[Challenges Db] RELOAD_CHALLENGES_MEASUREMENTS_FAIL';
    public static readonly START_LISTEN_CHALLENGES_MEASUREMENTS = '[Challenges Db] START_LISTEN_CHALLENGES_MEASUREMENTS';
    public static readonly STOP_LISTEN_CHALLENGES_MEASUREMENTS = '[Challenges Db] STOP_LISTEN_CHALLENGES_MEASUREMENTS';

    /**
     * Basic Info
     */
    public static readonly ReloadChallengeBasicInfo = class implements Action {
        public readonly type = ChallengesDbActions.RELOAD_CHALLENGE_BASIC_INFO;
        constructor(public payload: clgu.common.ReloadInfoRequest) {}
    };

    public static readonly ReloadChallengeBasicInfoSuccess = class implements Action {
        public readonly type = ChallengesDbActions.RELOAD_CHALLENGE_BASIC_INFO_SUCCESS;
        constructor(public payload: clgu.common.UpdatableDataObject<clgu.challenges.db.ChallengeObj>) {}
    };

    public static readonly ReloadChallengeBasicInfoFail = class implements Action {
        public readonly type = ChallengesDbActions.RELOAD_CHALLENGE_BASIC_INFO_FAIL;
        constructor(public payload: clgu.common.UpdatableDataObject<clgu.challenges.db.ChallengeObj>) {}
    };

    /**
     * Challenge common dates
     */
    public static readonly ReloadChallengeDates = class implements Action {
        public readonly type = ChallengesDbActions.RELOAD_CHALLENGE_DATES;
        constructor(public payload: clgu.common.ReloadInfoRequest) {}
    };

    public static readonly ReloadChallengeDatesSuccess = class implements Action {
        public readonly type = ChallengesDbActions.RELOAD_CHALLENGE_DATES_SUCCESS;
        constructor(public payload: clgu.common.UpdatableDataObject<clgu.challenges.db.CommonChallengeDays>) {}
    };

    public static readonly ReloadChallengeDatesFail = class implements Action {
        public readonly type = ChallengesDbActions.RELOAD_CHALLENGE_DATES_FAIL;
        constructor(public payload: clgu.common.UpdatableDataObject<clgu.challenges.db.CommonChallengeDays>) {}
    };

    /**
     * Challenge Participants
     */
    public static readonly ReloadChallengeParticipants = class implements Action {
        public readonly type = ChallengesDbActions.RELOAD_CHALLENGE_PARTICIPANTS;
        constructor(public payload: clgu.common.ReloadInfoRequest) {}
    };

    public static readonly ReloadChallengeParticipantsSuccess = class implements Action {
        public readonly type = ChallengesDbActions.RELOAD_CHALLENGE_PARTICIPANTS_SUCCESS;
        constructor(public payload: clgu.common.UpdatableDataObject<clgu.challenges.db.ChallengeParticipants>) {}
    };

    public static readonly ReloadChallengeParticipantsFail = class implements Action {
        public readonly type = ChallengesDbActions.RELOAD_CHALLENGE_PARTICIPANTS_FAIL;
        constructor(public payload: clgu.common.UpdatableDataObject<clgu.challenges.db.ChallengeParticipants>) {}
    };

    public static readonly StartListenChallengeParticipants = class implements Action {
        public readonly type = ChallengesDbActions.START_LISTEN_CHALLENGE_PARTICIPANTS;
        constructor(public payload: string) {}
    };

    public static readonly StopListenChallengeParticipants = class implements Action {
        public readonly type = ChallengesDbActions.STOP_LISTEN_CHALLENGE_PARTICIPANTS;
        constructor(public payload?: any) {}
    };

    /**
     * User Challenge Dates
     */
    public static readonly ReloadUserChallengeDates = class implements Action {
        public readonly type = ChallengesDbActions.RELOAD_USER_CHALLENGE_DATES;
        constructor(public payload: clgu.common.ReloadInfoRequest) {}
    };

    public static readonly ReloadUserChallengeDatesSuccess = class implements Action {
        public readonly type = ChallengesDbActions.RELOAD_USER_CHALLENGE_DATES_SUCCESS;
        constructor(public payload: clgu.common.UpdatableDataObject<clgu.challenges.db.UserChallengeDayMap>) {}
    };

    public static readonly ReloadUserChallengeDatesFail = class implements Action {
        public readonly type = ChallengesDbActions.RELOAD_USER_CHALLENGE_DATES_FAIL;
        constructor(public payload: clgu.common.UpdatableDataObject<clgu.challenges.db.UserChallengeDayMap>) {}
    };

    public static readonly StartListenUserChallengeDates = class implements Action {
        public readonly type = ChallengesDbActions.START_LISTEN_USER_CHALLENGE_DATES;
        constructor(public payload: string) {}
    };

    public static readonly StopListenUserChallengeDates = class implements Action {
        public readonly type = ChallengesDbActions.STOP_LISTEN_USER_CHALLENGE_DATES;
        constructor(public payload?: any) {}
    };

    /**
     * Users Challenges
     */
    public static readonly ReloadUserChallenges = class implements Action {
        public readonly type = ChallengesDbActions.RELOAD_USER_CHALLENGES;
        constructor(public payload: clgu.common.ReloadInfoRequest) {}
    };

    public static readonly ReloadUserChallengesSuccess = class implements Action {
        public readonly type = ChallengesDbActions.RELOAD_USER_CHALLENGES_SUCCESS;
        constructor(public payload: clgu.common.UpdatableDataObject<clgu.challenges.db.ChallengesByUser>) {}
    };

    public static readonly ReloadUserChallengesFail = class implements Action {
        public readonly type = ChallengesDbActions.RELOAD_USER_CHALLENGES_FAIL;
        constructor(public payload: clgu.common.UpdatableDataObject<clgu.challenges.db.ChallengesByUser>) {}
    };

    public static readonly StartListenUserChallenges = class implements Action {
        public readonly type = ChallengesDbActions.START_LISTEN_USER_CHALLENGES;
        constructor(public payload: string) {}
    };

    public static readonly StopListenUserChallenges = class implements Action {
        public readonly type = ChallengesDbActions.STOP_LISTEN_USER_CHALLENGES;
        constructor(public payload?: any) {}
    };

    /**
     * Requirements
     */
    public static readonly ReloadChallengesRequirements = class implements Action {
        public readonly type = ChallengesDbActions.RELOAD_CHALLENGES_REQUIREMENTS;
        constructor(public payload: clgu.common.ReloadInfoRequest) {}
    };

    public static readonly ReloadChallengesRequirementsSuccess = class implements Action {
        public readonly type = ChallengesDbActions.RELOAD_CHALLENGES_REQUIREMENTS_SUCCESS;
        constructor(public payload: clgu.common.UpdatableDataObject<clgu.challenges.db.ChallengeRequirements>) {}
    };

    public static readonly ReloadChallengesRequirementsFail = class implements Action {
        public readonly type = ChallengesDbActions.RELOAD_CHALLENGES_REQUIREMENTS_FAIL;
        constructor(public payload: clgu.common.UpdatableDataObject<clgu.challenges.db.ChallengeRequirements>) {}
    };

    public static readonly StartListenChallengesRequirements = class implements Action {
        public readonly type = ChallengesDbActions.START_LISTEN_CHALLENGES_REQUIREMENTS;
        constructor(public payload: string) {}
    };

    public static readonly StopListenChallengesRequirements = class implements Action {
        public readonly type = ChallengesDbActions.STOP_LISTEN_CHALLENGES_REQUIREMENTS;
        constructor(public payload?: any) {}
    };

    /**
     * Measurements
     */
    public static readonly ReloadChallengesMeasurements = class implements Action {
        public readonly type = ChallengesDbActions.RELOAD_CHALLENGES_MEASUREMENTS;
        constructor(public payload: clgu.challenges.ReloadMeasurementsRequest) {}
    };

    public static readonly ReloadChallengesMeasurementsSuccess = class implements Action {
        public readonly type = ChallengesDbActions.RELOAD_CHALLENGES_MEASUREMENTS_SUCCESS;
        constructor(public payload: clgu.challenges.ReloadMeasurementResult) {}
    };

    public static readonly ReloadChallengesMeasurementsFail = class implements Action {
        public readonly type = ChallengesDbActions.RELOAD_CHALLENGES_MEASUREMENTS_FAIL;
        constructor(public payload: clgu.common.UpdatableDataObject<clgu.challenges.db.Measurements>) {}
    };

    public static readonly StartListenChallengesMeasurements = class implements Action {
        public readonly type = ChallengesDbActions.START_LISTEN_CHALLENGES_MEASUREMENTS;
        constructor(public payload: clgu.challenges.ReloadMeasurementsRequest) {}
    };

    public static readonly StopListenChallengesMeasurements = class implements Action {
        public readonly type = ChallengesDbActions.STOP_LISTEN_CHALLENGES_MEASUREMENTS;
        constructor(public payload?: clgu.challenges.ReloadMeasurementsRequest) {}
    };

}