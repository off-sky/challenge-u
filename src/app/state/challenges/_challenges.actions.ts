import { Action } from '@ngrx/store';
import { clgu } from 'src/types';

export class ChallengesActions {



    public static readonly ADD_REQUIREMENTS = '[Challenges] ADD_REQUIREMENTS';
    public static readonly ADD_REQUIREMENTS_SUCCESS = '[Challenges] ADD_REQUIREMENTS_SUCCESS';
    public static readonly ADD_REQUIREMENTS_FAIL = '[Challenges] ADD_REQUIREMENTS_FAIL';

    public static readonly ADD_CATEGORY = '[Challenges] ADD_CATEGORY';
    public static readonly ADD_CATEGORY_SUCCESS = '[Challenges] ADD_CATEGORY_SUCCESS';
    public static readonly ADD_CATEGORY_FAIL = '[Challenges] ADD_CATEGORY_FAIL';

    public static readonly RELOAD_CATEGORIES = '[Challenges] RELOAD_CATEGORIES';
    public static readonly RELOAD_CATEGORIES_SUCCESS = '[Challenges] RELOAD_CATEGORIES_SUCCESS';
    public static readonly RELOAD_CATEGORIES_FAIL = '[Challenges] RELOAD_CATEGORIES_FAIL';

    public static readonly CREATE_CHALLENGE = '[Challenges] CREATE_CHALLENGE';
    public static readonly CREATE_CHALLENGE_SUCCESS = '[Challenges] CREATE_CHALLENGE_SUCCESS';
    public static readonly CREATE_CHALLENGE_FAIL = '[Challenges] CREATE_CHALLENGE_FAIL';

    public static readonly ADD_MEASUREMENT_PRESET = '[Challenges] ADD_MEASUREMENT_PRESET';
    public static readonly ADD_MEASUREMENT_PRESET_SUCCESS = '[Challenges] ADD_MEASUREMENT_PRESET_SUCCESS';
    public static readonly ADD_MEASUREMENT_PRESET_FAIL = '[Challenges] ADD_MEASUREMENT_PRESET_FAIL';

    public static readonly FETCH_MEASUREMENT_PRESETS = '[Challenges] FETCH_MEASUREMENT_PRESETS';
    public static readonly FETCH_MEASUREMENT_PRESETS_SUCCESS = '[Challenges] FETCH_MEASUREMENT_PRESETS_SUCCESS';
    public static readonly FETCH_MEASUREMENT_PRESETS_FAIL = '[Challenges] FETCH_MEASUREMENT_PRESETS_FAIL';

    public static readonly START_LISTEN_CHALLENGE_LIST = '[Challenges] START_LISTEN_CHALLENGE_LIST';
    public static readonly SAVE_CHALLENGE_LIST = '[Challenges] SAVE_CHALLENGE_LIST';
    public static readonly STOP_LISTEN_CHALLENGE_LIST = '[Challenges] STOP_LISTEN_CHALLENGE_LIST';

    public static readonly GET_CHALLENGE_DETAILS = '[Challenges] GET_CHALLENGE_DETAILS';
    public static readonly GET_CHALLENGE_DETAILS_IF_EMPTY = '[Challenges] GET_CHALLENGE_DETAILS_IF_EMPTY';
    public static readonly GET_CHALLENGE_DETAILS_IF_EMPTY_SUCCESS = '[Challenges] GET_CHALLENGE_DETAILS_IF_EMPTY_SUCCESS';
    public static readonly GET_CHALLENGE_DETAILS_IF_EMPTY_FAIL = '[Challenges] GET_CHALLENGE_DETAILS_IF_EMPTY_FAIL';


    public static readonly SHOW_UP_DATE = '[Challenges] SHOW_UP_DATE';
    public static readonly SHOW_UP_DATE_SUCCESS = '[Challenges] SHOW_UP_DATE_SUCCESS';
    public static readonly SHOW_UP_DATE_FAIL = '[Challenges] SHOW_UP_DATE_FAIL';

    public static readonly UPDATE_CHALLENGE_BASIC_INFO = `[Challenges] UPDATE_CHALLENGE_BASIC_INFO`;
    public static readonly UPDATE_CHALLENGE_BASIC_INFO_SUCCESS = `[Challenges] UPDATE_CHALLENGE_BASIC_INFO_SUCCESS`;
    public static readonly UPDATE_CHALLENGE_BASIC_INFO_FAIL = `[Challenges] UPDATE_CHALLENGE_BASIC_INFO_FAIL`;

    public static readonly UPDATE_CHALLENGE_DATES = `[Challenges] UPDATE_CHALLENGE_DATES`;
    public static readonly UPDATE_CHALLENGE_DATES_SUCCESS = `[Challenges] UPDATE_CHALLENGE_DATES_SUCCESS`;
    public static readonly UPDATE_CHALLENGE_DATES_FAIL = `[Challenges] UPDATE_CHALLENGE_DATES_FAIL`;

    public static readonly UPDATE_CHALLENGE_PARTICIPANTS = `[Challenges] UPDATE_CHALLENGE_PARTICIPANTS`;
    public static readonly UPDATE_CHALLENGE_PARTICIPANTS_SUCCESS = `[Challenges] UPDATE_CHALLENGE_PARTICIPANTS_SUCCESS`;
    public static readonly UPDATE_CHALLENGE_PARTICIPANTS_FAIL = `[Challenges] UPDATE_CHALLENGE_PARTICIPANTS_FAIL`;

    public static readonly UPDATE_CHALLENGE_MEASUREMENTS = `[Challenges] UPDATE_CHALLENGE_MEASUREMENTS`;
    public static readonly UPDATE_CHALLENGE_MEASUREMENTS_SUCCESS = `[Challenges] UPDATE_CHALLENGE_MEASUREMENTS_SUCCESS`;
    public static readonly UPDATE_CHALLENGE_MEASUREMENTS_FAIL = `[Challenges] UPDATE_CHALLENGE_MEASUREMENTS_FAIL`;


    public static readonly AddCategory = class implements Action {
        public readonly type = ChallengesActions.ADD_CATEGORY;
        constructor(public payload: clgu.common.UpdateRequest) {}
    };

    public static readonly AddCategorySuccess = class implements Action {
        public readonly type = ChallengesActions.ADD_CATEGORY_SUCCESS;
        constructor(public payload?: any) {}
    };

    public static readonly AddCategoryFail = class implements Action {
        public readonly type = ChallengesActions.ADD_CATEGORY_FAIL;
        constructor(public payload?: clgu.common.Error) {}
    };


    /**
     * Presets
     */
    public static readonly AddMeasurementPreset = class implements Action {
        public readonly type = ChallengesActions.ADD_MEASUREMENT_PRESET;
        constructor(public payload: clgu.challenges.MeasurementPresetSaveRequest) {}
    };

    public static readonly AddMeasurementPresetSuccess = class implements Action {
        public readonly type = ChallengesActions.ADD_MEASUREMENT_PRESET_SUCCESS;
        constructor(public payload?: any) {}
    };

    public static readonly AddMeasurementPresetFail = class implements Action {
        public readonly type = ChallengesActions.ADD_MEASUREMENT_PRESET_FAIL;
        constructor(public payload?: clgu.common.Error) {}
    };


    public static readonly ReloadCategories = class implements Action {
        public readonly type = ChallengesActions.RELOAD_CATEGORIES;
        constructor(public payload: string) {}
    };

    public static readonly ReloadCategoriesSuccess = class implements Action {
        public readonly type = ChallengesActions.RELOAD_CATEGORIES_SUCCESS;
        constructor(public payload?: clgu.common.DataWithId) {}
    };

    public static readonly ReloadCategoriesFail = class implements Action {
        public readonly type = ChallengesActions.RELOAD_CATEGORIES_FAIL;
        constructor(public payload?: clgu.common.Error) {}
    };

    public static readonly AddRequirements = class implements Action {
        public readonly type = ChallengesActions.ADD_REQUIREMENTS;
        constructor(public payload: clgu.challenges.AddRequirementsRequest) {}
    };

    public static readonly AddRequirementsSuccess = class implements Action {
        public readonly type = ChallengesActions.ADD_REQUIREMENTS_SUCCESS;
        constructor(public payload?: any) {}
    };

    public static readonly AddRequirementsFail = class implements Action {
        public readonly type = ChallengesActions.ADD_REQUIREMENTS_SUCCESS;
        constructor(public payload?: clgu.common.Error) {}
    };


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

    public static readonly FetchMeasurementsPresets = class implements Action {
        public readonly type = ChallengesActions.FETCH_MEASUREMENT_PRESETS;
        constructor(public payload?: clgu.challenges.MeasurementPresetGetRequest) {}
    }

    public static readonly FetchMeasurementsPresetsSuccess = class implements Action {
        public readonly type = ChallengesActions.FETCH_MEASUREMENT_PRESETS_SUCCESS;
        constructor(public payload: clgu.common.DataWithId) {}
    }

    public static readonly FetchMeasurementsPresetsFail = class implements Action {
        public readonly type = ChallengesActions.FETCH_MEASUREMENT_PRESETS_FAIL;
        constructor(public payload: clgu.common.Error) {}
    }

    public static readonly GetChallengeDetails = class implements Action {
        public readonly type = ChallengesActions.GET_CHALLENGE_DETAILS;
        constructor(public payload: string) {}
    }

    public static readonly GetChallengeDetailsIfEmpty = class implements Action {
        public readonly type = ChallengesActions.GET_CHALLENGE_DETAILS_IF_EMPTY;
        constructor(public payload: string) {}
    }

    public static readonly GetChallengeDetailsIfEmptySuccess = class implements Action {
        public readonly type = ChallengesActions.GET_CHALLENGE_DETAILS_IF_EMPTY_SUCCESS;
        constructor(public payload?: any) {}
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

    /**
     * Update actions
     */

    /**
     * Basic info
     */
    public static readonly UpdateBasicInfo = class implements Action {
        public readonly type = ChallengesActions.UPDATE_CHALLENGE_BASIC_INFO;
        constructor(public payload: clgu.common.UpdateRequest) {}
    }

    public static readonly UpdateBasicInfoSuccess = class implements Action {
        public readonly type = ChallengesActions.UPDATE_CHALLENGE_BASIC_INFO_SUCCESS;
        constructor(public payload?: any) {}
    }

    public static readonly UpdateBasicInfoFail = class implements Action {
        public readonly type = ChallengesActions.UPDATE_CHALLENGE_BASIC_INFO_FAIL;
        constructor(public payload?: clgu.common.ErrorWithId) {}
    }


    /**
     * Dates
     */
    public static readonly UpdateChallengeDates = class implements Action {
        public readonly type = ChallengesActions.UPDATE_CHALLENGE_DATES;
        constructor(public payload: clgu.common.UpdateRequest) {}
    }

    public static readonly UpdateChallengeDatesSuccess = class implements Action {
        public readonly type = ChallengesActions.UPDATE_CHALLENGE_DATES_SUCCESS;
        constructor(public payload?: any) {}
    }

    public static readonly UpdateChallengeDatesFail = class implements Action {
        public readonly type = ChallengesActions.UPDATE_CHALLENGE_DATES_FAIL;
        constructor(public payload?: clgu.common.ErrorWithId) {}
    }

    /**
     * Participants
     */
    public static readonly UpdateChallengeParticipants = class implements Action {
        public readonly type = ChallengesActions.UPDATE_CHALLENGE_PARTICIPANTS;
        constructor(public payload: clgu.common.UpdateRequest) {}
    }

    public static readonly UpdateChallengeParticipantsSuccess = class implements Action {
        public readonly type = ChallengesActions.UPDATE_CHALLENGE_PARTICIPANTS_SUCCESS;
        constructor(public payload?: any) {}
    }

    public static readonly UpdateChallengeParticipantsFail = class implements Action {
        public readonly type = ChallengesActions.UPDATE_CHALLENGE_PARTICIPANTS_FAIL;
        constructor(public payload?: any) {}
    }

    /**
     * Measurements
     */
    public static readonly UpdateChallengeMeasurements = class implements Action {
        public readonly type = ChallengesActions.UPDATE_CHALLENGE_MEASUREMENTS;
        constructor(public payload: clgu.challenges.EditMeasurementsRequest) {}
    }

    public static readonly UpdateChallengeMeasurementsSuccess = class implements Action {
        public readonly type = ChallengesActions.UPDATE_CHALLENGE_MEASUREMENTS_SUCCESS;
        constructor(public payload?: any) {}
    }

    public static readonly UpdateChallengeMeasurementsFail = class implements Action {
        public readonly type = ChallengesActions.UPDATE_CHALLENGE_MEASUREMENTS_FAIL;
        constructor(public payload?: clgu.common.ErrorWithId) {}
    }



}