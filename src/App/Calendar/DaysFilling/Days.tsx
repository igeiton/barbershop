import { CircularProgress, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteDaysMutation } from '../../../Store/API/daysApi';
import { getDays } from '../../../Store/API/getDays';
import { useAppSelector } from '../../../Store/store';
import { IDay } from '../../Service/Day';
import { styledDayClient, styledDayOwner } from '../CalendarStyles/styledDay';
import { dayOfWeek } from '../DatePicker/Actions/Dates';
import { canBook } from './Actions/CanBook';
import getDaysByDiff from './Actions/FillDays';

interface IProps {
    days: IDay[];
    setDays: (days: IDay[]) => void;
}

export default function Days({ days, setDays }: IProps) {
    // hooks
    const navigate = useNavigate();

    const [deleteDay] = useDeleteDaysMutation();

    const [isLoading, setLoading] = useState(true);

    const { selectedMonth, selectedYear, isOwner } = useAppSelector(
        (state) => state.user
    );

    // const
    const filledDays = getDaysByDiff(selectedMonth, selectedYear, days);

    // functions
    const toDay = (day: any): void => {
        if (canBook(day, isOwner)) navigate(`/${day.day}`);
    };

    const clearing = async (data: IDay[]): Promise<void> => {
        const now = new Date().toLocaleDateString('LT');

        for (let i = 0; i < data.length; i++) {
            if (
                data[i].records.length === 0 ||
                new Date(data[i].day).getTime() < new Date(now).getTime()
            ) {
                deleteDay(data[i].id);
                console.log('Deleted: ' + data[i].day);
            }
        }
    };

    useEffect(() => {
        getDays().then((data) => {
            setDays(data);
            setLoading(false);
            clearing(data);
        });
    }, []);

    if (isLoading)
        return (
            <div className="grow flex justify-center items-center">
                <CircularProgress
                    disableShrink
                    sx={{
                        color: 'grey',
                    }}
                />
            </div>
        );

    return (
        <div className="days animate-[fading_500ms_ease-out]">
            {dayOfWeek.map((day: string, index: number) => (
                <div
                    className={`dayOfWeek ${
                        index > 4 ? 'opacity-50' : 'opacity-100'
                    }`}
                    key={index}
                >
                    {day}
                </div>
            ))}

            <Divider
                sx={{
                    gridColumn: '1/8',
                    marginBottom: '15px',
                    bgcolor: '#E3E3E3',
                    opacity: '0.5',
                }}
            />

            {filledDays.map((day: any, index: number) => (
                <div
                    key={new Date(day.day).getTime() || index}
                    className="day"
                    style={{
                        ...(isOwner
                            ? styledDayOwner(day)
                            : styledDayClient(day)),

                        animation: `scaling ${
                            Math.random() * 1000 + 100
                        }ms ease-out`,
                    }}
                    onClick={() => toDay(day)}
                >
                    {day.day.split('-')[2]}
                </div>
            ))}
        </div>
    );
}
