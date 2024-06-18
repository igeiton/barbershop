import { IDay } from '../Day';

export const hasDay = (day: IDay, days: IDay[]): IDay[] => {
    return days.filter((someDay: any) => someDay.day === day);
};
