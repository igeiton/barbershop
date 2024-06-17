import { Alert, Button, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDay } from '../../Store/API/getDay';
import Records from './Records';
import './ServiceStyles/Day.css';
import Loading from './UI/Loading';
import { useAppDispatch, useAppSelector } from '../../Store/store';
import { setBooked } from '../../Store/userReducer';
import OwnerRecords from './Owner/OwnerRecords';

export default function Day() {
    const { isBooked, isOwner } = useAppSelector((state) => state.user);
    // hooks
    const navigate = useNavigate();
    const path = useLocation().pathname.replace('/', '');

    const [patternDay, setPatternDay] = useState<any>();

    // validation
    if (path.replace(/-/g, '').length !== 8 || path.length !== 10) {
        return <div className="w-full self-center text-center">Error</div>;
    }

    // set day
    useEffect(() => {
        getDay(path).then((data) => {
            setPatternDay(data[0]);
        });
    }, []);

    const dispatch = useAppDispatch();

    const handleasd = (status: boolean) => {
        dispatch(setBooked({ status, date: '' }));
    };

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

            <Snackbar
                open={isBooked.status}
                onClose={() => {
                    console.log('close scnack');
                    handleasd(false);
                }}
            >
                <Alert severity="success">'lalalallalalalala'</Alert>
            </Snackbar>
        </div>
    );
}
