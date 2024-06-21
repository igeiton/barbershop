import { IRecord } from '../../../Service/Day';

export const compareDates = (day: string, record: IRecord) => {
    if (
        day === new Date().toLocaleDateString('LT') &&
        new Date().getHours() > record.recordStart
    ) {
        return true;
    }

    return false;
};
