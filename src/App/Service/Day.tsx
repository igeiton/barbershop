import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCreateDayMutation, useGetDaysQuery } from '../../Store/API/daysApi';
import { hasDay } from './Actions/HasDay';
import Records from './Records';
import './ServiceStyles/Day.css';
import Loading from './UI/Loading';
import { useAppSelector } from '../../Store/store';
import OwnerRecords from './Owner/OwnerRecords';

export default function Day() {
    const { isOwner } = useAppSelector((state) => state.user);

    const path = useLocation().pathname.replace('/', '');
    const { data: days = [], isLoading } = useGetDaysQuery('');
    const [createDay] = useCreateDayMutation();
    const navigate = useNavigate();

    const day = hasDay(path, days);

    if (path.replace(/-/g, '').length !== 8 || path.length !== 10) {
        return <div className="w-full self-center text-center">Error</div>;
        // добавить page with error
    }

    useEffect(() => {
        if (day.length === 0) {
            createDay({
                day: path,
                records: [],
            });
            console.log('Create new Day');
        }
    }, [path]);

    if (isLoading)
        return <div className="w-full self-center text-center">Loading...</div>;

    return (
        <div className="flex flex-col w-full max-w-[100vw] p-[15px] gap-5">
            <Button
                variant="contained"
                className="self-start"
                onClick={() => navigate('/')}
            >
                {'<< Go Back'}
            </Button>

            {!isOwner && (
                <>
                    {day.length !== 0 && <Records day={day} days={days} />}

                    {day.length === 0 && <Loading />}
                </>
            )}

            {isOwner && (
                <>
                    {day.length !== 0 && <OwnerRecords day={day} />}

                    {day.length === 0 && <Loading />}
                </>
            )}
        </div>
    );
}
