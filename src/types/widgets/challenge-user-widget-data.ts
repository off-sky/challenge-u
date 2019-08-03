export interface ChallengeUserWidgetData<T> {
    challengeId: string;
    userId: string;
    widgetId?: string;
    data?: T;
}