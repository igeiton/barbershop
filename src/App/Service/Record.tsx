import { useState } from 'react';
import { useCreateRecordMutation } from '../../Store/API/daysApi';
import { useAppSelector } from '../../Store/store';
import axios from 'axios';
import { Alert, Divider, Paper, Snackbar } from '@mui/material';
import Loading from './UI/Loading';

export default function Record({ time, day, service }: any) {
    const { name, lastName, phone } = useAppSelector((state) => state.user);
    const [isBooking, setBooking] = useState(false);
    const [error, setError] = useState(false);

    const [createRecord] = useCreateRecordMutation();

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

        const { data } = await axios.get(
            `https://666943c52e964a6dfed45ef0.mockapi.io/api/v1/days/${day.id}`
        );

        if (
            data.records.filter(
                (record: any) => record.recordStart === newRecord.recordStart
            ).length > 0
        ) {
            setBooking(false);
            setError(true);
            return;
        }

        createRecord({ body: updatedDay, dayID: day.id });
        // выводить снэк "Забронировано на..."
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

            <Snackbar open={error} onClose={() => setError(false)}>
                <Alert severity="error">
                    Record already exists. Please, update page.
                </Alert>
            </Snackbar>
        </Paper>
    );
}
