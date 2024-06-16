import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    useCreateDayMutation,
    useGetDayQuery,
    useLazyGetDaysQuery,
} from '../../Store/API/daysApi';
import { useAppSelector } from '../../Store/store';
import Loading from '../UI/Loading';
import { hasDay } from './Actions/HasDay';
import Records from './Client/Records';
import OwnerRecords from './Owner/OwnerRecords';
import './ServiceStyles/Day.css';

export default function Day() {
    //
    // hooks
    const navigate = useNavigate();
    const path = useLocation().pathname.replace('/', '');

    const [asdday, setasdDay] = useState({
        id: path,
        day: path,
        records: [],
    });

    const { isOwner } = useAppSelector((state) => state.user);

    // const [trigger, { data: days = [], isLoading, isSuccess }] =
    //     useLazyGetDaysQuery();
    const { data: day = [], isSuccess, isError } = useGetDayQuery(path);
    const [createDay] = useCreateDayMutation();

    // const
    // const day = hasDay(path, days);

    // validation
    if (path.replace(/-/g, '').length !== 8 || path.length !== 10) {
        return <div className="w-full self-center text-center">Error</div>;
        // добавить page with error !!!!!!!!!!!!!!!!!!!!!
    }
    // useEffect(() => {
    //     // get actually days
    //     trigger('');

    //     // create day if records is empty
    //     if (day.length === 0) {
    //     }
    // }, [path]);

    // useEffect(() => {
    //     console.log(isSuccess);
    //     if (isSuccess && day.length === 0) {
    //         createDay({
    //             id: path,
    //             day: path,
    //             records: [],
    //         });
    //         console.log('Create new Day');
    //         console.log(day);
    //     }
    // }, [isSuccess]);

    // if (isLoading) return <div>loading..........</div>;

    useEffect(() => {
        if (isSuccess) {
            console.log('success');
            setasdDay(day);
        }

        if (isError) {
            console.log('error');
        }
    }, [isSuccess, isError]);

    return (
        <div className="flex flex-col w-full max-w-[100vw] p-[15px] gap-5">
            <Button
                variant="contained"
                className="self-start"
                onClick={() => navigate('/')}
            >
                {'<< Go Back'}
            </Button>

            <Records day={asdday} days={asdday.id} />

            {/* {!isOwner && (
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
            )} */}
        </div>
    );
}
