import { Alert, Button, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDay } from '../../Store/API/getDay';
import Records from './Records';
import './ServiceStyles/Day.css';
import Loading from '../UI/Loading';
import { useAppDispatch, useAppSelector } from '../../Store/store';
import { setBooked } from '../../Store/userReducer';
import OwnerRecords from './Owner/OwnerRecords';
import { IUserAuth } from '../Auth/AuthClient';
import { validateUrl } from './Actions/ValidateUrl';

export interface IDay {
    id: number;
    day: string;
    records: IRecord[];
    service: string;
}

export interface IRecord {
    id: number;
    recordStart: number;
    recordEnd: number;
    user: IUserAuth;
}

export default function Day() {
    // hooks
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { isOwner } = useAppSelector((state) => state.user);

    const [patternDay, setPatternDay] = useState<IDay>();

    // const
    const path: string = useLocation().pathname.replace('/', '');

    // validation
    if (!validateUrl(path)) {
        return <div className="w-full self-center text-center">Error</div>;
    }

    // ======================
    const changeToCONTEXT = (status: boolean) => {
        dispatch(setBooked({ status, date: '' }));
    };
    // ======================

    // set day
    useEffect(() => {
        getDay(path).then(([data]) => {
            setPatternDay(data);
        });
    }, []);

    return (
        <div className="flex flex-col w-full max-w-[100vw] p-[15px] gap-5">
            <Button
                variant="contained"
                className="self-start"
                onClick={() => navigate('/')}
            >
                {'<< Go Back'}
            </Button>

            {!patternDay ? (
                <Loading />
            ) : isOwner ? (
                <OwnerRecords day={patternDay} />
            ) : (
                <Records day={patternDay} update={setPatternDay} />
            )}

            {/* <Snackbar
                open={isBooked.status}
                onClose={() => {
                    console.log('close scnack');
                    changeToCONTEXT(false);
                }}
            >
                <Alert severity="success">'lalalallalalalala'</Alert>
            </Snackbar> */}
        </div>
    );
}
