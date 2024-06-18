import { Alert, Divider, Paper, Snackbar } from '@mui/material';
import { useState } from 'react';
import {
    useCreateDayMutation,
    useCreateRecordMutation,
} from '../../Store/API/daysApi';
import { getDay } from '../../Store/API/getDay';
import { useAppDispatch, useAppSelector } from '../../Store/store';
import { setBooked } from '../../Store/userReducer';
import { filtering } from './Actions/FilterRecords';
import { IDay, IRecord } from './Day';
import { checkFill } from './Owner/Options/CheckFill';
import Loading from '../UI/Loading';
import Snack from '../UI/Snack';

export default function Record({ time, day, service, update }: any) {
    // hooks
    const dispatch = useAppDispatch();

    const { name, lastName, phone } = useAppSelector((state) => state.user);

    const [isBooking, setBooking] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const [addRecord] = useCreateRecordMutation();
    const [newDay] = useCreateDayMutation();

    // functions
    const book = async () => {
        setBooking(true);

        // records + new record
        const newRecords: IRecord[] = [
            ...day.records,
            {
                id: new Date().getTime(),
                recordStart: time,
                recordEnd: time + service,
                user: { name, lastName, phone: `+7${phone}` },
            },
        ];

        // update day (sort + service)
        const updatedDay: IDay = {
            ...day,
            records: newRecords.sort((a, b) => a.recordStart - b.recordStart),
            service: checkFill(newRecords),
        };

        // get actually day
        const actuallyDay: IDay = await getDay(day.day, () =>
            newDay(updatedDay)
        ).then(([data]) => data);

        // validation if record exists
        if (!filtering(time, service, actuallyDay)) {
            // record exists
            setBooking(false);
            setError(true);

            return;
        } else {
            // record not exists
            addRecord({ body: updatedDay, dayID: day.id });
            update(updatedDay);

            dispatch(setBooked({ status: true, date: day.day }));
            // выводить снэк "Забронировано на..."
        }
    };

    return (
        <Paper elevation={6} className="record" key={time}>
            <div className="w-full flex flex-col gap-[10px]">
                <div className="flex justify-between">
                    <span>Start on:</span>

                    <span className="underline">{time}:00</span>
                </div>

                <Divider />

                <div className="flex justify-between">
                    <span>End on:</span>

                    <span className="underline">{time + service}:00</span>
                </div>
            </div>

            {!isBooking && (
                <button
                    onClick={book}
                    className={
                        'bookButton' + (error ? ' error opacity-15' : '')
                    }
                >
                    Book
                </button>
            )}

            {isBooking && (
                <button className="bookButton">
                    <Loading />
                </button>
            )}

            <Snack
                message="Record already exists. Please, update page."
                open={error}
                severity="error"
                onClose={() => setError(false)}
            />
        </Paper>
    );
}
