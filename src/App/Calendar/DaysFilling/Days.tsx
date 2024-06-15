import { Divider } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    useDeleteDaysMutation,
    useGetDaysQuery,
} from '../../../Store/API/daysApi';
import { useAppSelector } from '../../../Store/store';
import Loading from '../../Service/UI/Loading';
import { styledDay } from '../CalendarStyles/styledDay';
import { dayOfWeek } from '../DatePicker/Actions/Dates';
import getDaysByDiff from './Actions/FillDays';

export default function Days() {
    const { selectedMonth, selectedYear, isOwner } = useAppSelector(
        (state) => state.user
    );
    const { data: days = [], isLoading } = useGetDaysQuery('');
    const navigate = useNavigate();
    const [deleteDay] = useDeleteDaysMutation();

    const filledDays = getDaysByDiff(selectedMonth, selectedYear, days);

    const toDay = (day: any) => {
        if (
            day.day === '' ||
            new Date(day.day).getDay() === 6 ||
            new Date(day.day).getDay() === 0 ||
            (day.records.length === 0 && isOwner)
        )
            return;
        navigate(`/${day.day}`);
    };

    const clearing = async () => {
        for (let i = 0; i < days.length; i++) {
            if (days[i].records.length === 0) {
                deleteDay(days[i].id);
                console.log('Deleted: ' + days[i].day);
            }
        }
    };

    useEffect(() => {
        clearing();
    }, []);

    if (isLoading) return <Loading />;

    return (
        <div className="days">
            {dayOfWeek.map((day: string, index: number) => (
                <div className="dayOfWeek" key={index}>
                    {day}
                </div>
            ))}

            <Divider sx={{ gridColumn: '1/8', marginBottom: '15px' }} />

            {filledDays.map((day: any, index: number) => (
                <div
                    onClick={() => toDay(day)}
                    className="day"
                    style={styledDay(day, isOwner)}
                    key={index}
                >
                    {day.day.split('-')[2]}
                </div>
            ))}
        </div>
    );
}
