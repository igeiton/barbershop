import { Alert, Divider, Paper, Snackbar } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import {
    useCreateDayMutation,
    useCreateRecordMutation,
} from '../../Store/API/daysApi';
import { useAppDispatch, useAppSelector } from '../../Store/store';
import Loading from './UI/Loading';
import { setBooked } from '../../Store/userReducer';

export default function Record({ time, day, service, update }: any) {
    const { name, lastName, phone, isBooked } = useAppSelector(
        (state) => state.user
    );
    const [isBooking, setBooking] = useState(false);
    const [error, setError] = useState(false);

    const [addRecord] = useCreateRecordMutation();

    const [newDay] = useCreateDayMutation();

    const book = async () => {
        setBooking(true);

        const newRecord = {
            id: new Date().getTime(),
            recordStart: time,
            recordEnd: time + service,
            user: { name, lastName, phone: `+7${phone}` },
        };

        const updatedDay = {
            ...day,
            records: [...(day.records ? day?.records : []), newRecord].sort(
                (a, b) => a.recordStart - b.recordStart
            ),
        };

        const [data] = await axios
            .get(
                `https://666943c52e964a6dfed45ef0.mockapi.io/api/v1/days?day=${day.day}`
            )
            .then((data) => {
                return asd(data);
            })
            .catch(() => {
                newDay(updatedDay);
                return [{ records: [] }];
            });

        const filtered =
            data.records.filter(
                (record: any) => record.recordStart === newRecord.recordStart
            ).length > 0;
        // не закрывает задачу. Сранивает только начало записи.
        // попробовать с помощью 'FilterRecords.ts' ???
        if (filtered) {
            setBooking(false);
            setError(true);
            return;
        }

        addRecord({ body: updatedDay, dayID: day.id });
        update(updatedDay);

        dispatch(setBooked({ status: true, date: day.day }));
        // выводить снэк "Забронировано на..."
    };

    const dispatch = useAppDispatch();

    function asd(data: any) {
        if (data?.data?.length === 0) {
            throw new Error('error from asd');
        }

        return data.data;
    }

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

            <Snackbar open={error} onClose={() => setError(false)}>
                <Alert severity="error">
                    Record already exists. Please, update page.
                </Alert>
            </Snackbar>
        </Paper>
    );
}
