import { IDay } from '../../../Service/Day';
import { isFilled, isBookable } from '../../CalendarStyles/styledDay';

export const canBook = (day: IDay, isOwner: boolean): boolean => {
    if (isOwner) {
        return isFilled(day);
    } else {
        return isBookable(day);
    }
};
