import { Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteDaysMutation } from '../../../Store/API/daysApi';
import { getDays } from '../../../Store/API/getDays';
import { useAppSelector } from '../../../Store/store';
import { IDay } from '../../Service/Day';
import Loading from '../../UI/Loading';
import { styledDayClient, styledDayOwner } from '../CalendarStyles/styledDay';
import { dayOfWeek } from '../DatePicker/Actions/Dates';
import { canBook } from './Actions/CanBook';
import getDaysByDiff from './Actions/FillDays';

export default function Days() {
    // hooks
    const navigate = useNavigate();

    const [deleteDay] = useDeleteDaysMutation();

    const [days, setDays] = useState<IDay[]>([]);
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

    const clearing = async (): Promise<void> => {
        for (let i = 0; i < days.length; i++) {
            if (days[i].records.length === 0) {
                deleteDay(days[i].id);
                console.log('Deleted: ' + days[i].day);
            }
        }
    };

    useEffect(() => {
        getDays().then((data) => {
            setDays(data);
            setLoading(false);
            clearing();
        });
    }, []);

    if (isLoading) return <Loading />;

    return (
        <div className="days">
            {dayOfWeek.map((day: string, index: number) => (
                <div className="dayOfWeek" key={index}>
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
                    onClick={() => toDay(day)}
                    className="day"
                    style={isOwner ? styledDayOwner(day) : styledDayClient(day)}
                    key={index}
                >
                    {day.day.split('-')[2]}
                </div>
            ))}
        </div>
    );
}
