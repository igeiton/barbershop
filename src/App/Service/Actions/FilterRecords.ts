import { IDay } from '../Day';

export const filtering = (time: number, service: number, day: IDay) => {
    if (time + service > 18) {
        return false;
    }

    for (let i = 0; i < day.records.length; i++) {
        const counter: number =
            day.records[i].recordEnd - day.records[i].recordStart;

        for (let j = 0; j < counter; j++) {
            if (
                time < day.records[i].recordEnd &&
                time + service > day.records[i].recordStart
            ) {
                return false;
            }
        }
    }

    return true;
};
