import { CircularProgress, Divider, Paper } from '@mui/material';
import { useState } from 'react';
import { createNotif } from '../../../Store/API/createNotif';
import {
    useCreateDayMutation,
    useCreateRecordMutation,
} from '../../../Store/API/daysApi';
import { getDay } from '../../../Store/API/getDay';
import { getOwner } from '../../../Store/API/getOwner';
import { useAppSelector } from '../../../Store/store';
import { translate } from '../../Calendar/CloseRecord/Actions/translate';
import Snack from '../../UI/Snack';
import { filtering } from '../Actions/FilterRecords';
import { IDay, IDayContext, useDay } from '../Day';
import { addRecordToDay } from './Actions/AddRecordToDay';

interface IProps {
    time: number;
    day: IDay;
    service: number;
}

export default function Record({ time, day, service }: IProps) {
    // hooks
    const dayContext: IDayContext = useDay();

    const user = useAppSelector((state) => state.user);

    const [isBooking, setBooking] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const [addRecord] = useCreateRecordMutation();
    const [newDay] = useCreateDayMutation();

    // functions
    const booking = async () => {
        setBooking(true);

        // update day
        const updatedDay = addRecordToDay(day, time, user, service);

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

            // send notif to owner
            const text = {
                title: `${user.name} ${user.lastName}`,
                subtitle: `Запись на ${translate(
                    day.day
                ).toLowerCase()}, в ${time}:00`,
            };

            getOwner('1').then((data) =>
                createNotif(data.subsID, text, new Date())
            );

            // update day
            dayContext.setPatternDay(updatedDay);

            // show snack
            dayContext.setBook({
                isBooked: true,
                date: `Забронировано на ${translate(
                    day.day
                ).toLowerCase()}, в ${time}:00`,
            });
        }
    };

    return (
        <>
            <Paper
                elevation={6}
                className="record animate-[fading_1500ms_ease-out]"
                key={time}
                sx={{
                    bgcolor: 'transparent',
                    borderRadius: '10px',
                    color: 'white',
                }}
            >
                <div className="w-full flex flex-col gap-[10px]">
                    <div className="flex flex-col gap-[5px]">
                        <div className="text-center">Время</div>
                        <div className="text-center">
                            <div className="text-[12px] opacity-50">Начало</div>
                            <div>{time}:00</div>
                        </div>
                        <div className="text-center">
                            <div className="text-[12px] opacity-50">Конец</div>
                            <div>{time + service}:00</div>
                        </div>
                    </div>
                </div>

                {!isBooking ? (
                    <button
                        onClick={booking}
                        className={
                            'bookButton' + (error ? 'error opacity-15' : '')
                        }
                    >
                        Забронировать
                    </button>
                ) : (
                    <button className="bookButton">
                        <CircularProgress
                            disableShrink
                            sx={{ color: 'white' }}
                        />
                    </button>
                )}

                <Snack
                    message="Record already exists. Please, update page."
                    open={error}
                    severity="error"
                    onClose={() => setError(false)}
                />
            </Paper>
            <Divider sx={{ bgcolor: 'grey' }} />
        </>
    );
}
