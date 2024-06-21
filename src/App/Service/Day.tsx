import { Button, CircularProgress } from '@mui/material';
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDay } from '../../Store/API/getDay';
import { useAppSelector } from '../../Store/store';
import { IUserAuth } from '../Auth/AuthClient';
import Snack from '../UI/Snack';
import { validateUrl } from './Actions/ValidateUrl';
import Records from './Client/Records';
import OwnerRecords from './Owner/OwnerRecords';

import '../../Styles/keyframes.css';
import './ServiceStyles/Day.css';

export default function Day() {
    // hooks
    const navigate = useNavigate();

    const { isOwner } = useAppSelector((state) => state.user);

    const [isBooked, setBook] = useState<IIsBooked>({
        isBooked: false,
        date: '',
    });

    const [patternDay, setPatternDay] = useState<IDay>();

    // const
    const path: string = useLocation().pathname.replace('/', '');

    // validation
    if (!validateUrl(path)) {
        return <div className="w-full self-center text-center">Error</div>;
    }

    // set day
    useEffect(() => {
        getDay(path).then(([data]) => {
            setPatternDay(data);
        });
    }, []);

    return (
        <DayContext.Provider value={{ isBooked, setBook, setPatternDay }}>
            <Button
                variant="contained"
                onClick={() => navigate('/')}
                sx={{
                    alignSelf: 'start',
                    animation: 'scaling 0.5s',
                    margin: '15px',
                }}
            >
                {'❮'} Назад
            </Button>

            <div className="flex flex-col w-full max-w-[100vw] p-[15px] gap-5 grow">
                {!patternDay ? (
                    // <Loading />
                    <div className="grow flex justify-center items-center">
                        <CircularProgress
                            disableShrink
                            sx={{
                                color: 'grey',
                            }}
                        />
                    </div>
                ) : isOwner ? (
                    <OwnerRecords day={patternDay} />
                ) : (
                    <Records day={patternDay} update={setPatternDay} />
                )}

                <Snack
                    message={isBooked.date}
                    open={isBooked.isBooked}
                    severity="success"
                    onClose={() =>
                        setBook({
                            isBooked: false,
                            date: '',
                        })
                    }
                />
            </div>
        </DayContext.Provider>
    );
}

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

export interface IDayContext {
    isBooked: IIsBooked;
    setBook: ({ isBooked, date }: IIsBooked) => void;
    setPatternDay: (day: IDay) => void;
}

interface IIsBooked {
    isBooked: boolean;
    date: string;
}

const DayContext = createContext<IDayContext>({
    isBooked: {
        isBooked: false,
        date: '',
    },
    setBook: () => {},
    setPatternDay: () => {},
});

export const useDay = () => {
    return useContext(DayContext);
};
