export const checkFill = (records: any): string => {
    const bookedHours = records.reduce((accum: any, record: any) => {
        return accum + record.recordEnd - record.recordStart;
    }, 0);

    if (bookedHours === 0) {
        return 'empty';
    } else if (bookedHours >= 10) {
        return 'fullfilled';
    } else {
        return 'halffilled';
    }
};
