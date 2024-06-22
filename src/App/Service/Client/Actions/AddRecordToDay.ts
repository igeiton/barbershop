// import { IUserAuth } from '../../../Auth/AuthClient';
import { checkFill } from '../../Actions/CheckFill';
import { IDay, IRecord } from '../../Day';

export const addRecordToDay = (
    day: IDay,
    time: number,
    user: any,
    service: number
): IDay => {
    // records + new record
    const newRecords: IRecord[] = [
        ...day.records,
        {
            id: new Date().getTime(),
            recordStart: time,
            recordEnd: time + service,
            user: {
                subsID: `${localStorage.getItem('subsID')}`,
                name: user.name,
                lastName: user.lastName,
                phone: `+7${user.phone}`,
            },
        },
    ];

    // update day (sort + service)
    const updatedDay: IDay = {
        ...day,
        records: newRecords.sort((a, b) => a.recordStart - b.recordStart),
        service: checkFill(newRecords),
    };

    return updatedDay;
};
