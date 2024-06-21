import { useState } from 'react';
import { useAppSelector } from '../../Store/store';
import { IDay } from '../Service/Day';
import CloseRecordClient from './CloseRecord/CloseRecordClient';
import CloseRecordOwner from './CloseRecord/CloseRecordOwner';
import DatePicker from './DatePicker/DatePicker';
import Days from './DaysFilling/Days';

import '../../Styles/keyframes.css';
import './CalendarStyles/Calendar.css';

export default function Calendar() {
    const [days, setDays] = useState<IDay[]>([]);
    const user = useAppSelector((state) => state.user);

    return (
        <div className="p-4 flex flex-col gap-10 grow h-full">
            <div className="flex gap-[15px] w-full max-w-[500px] self-center">
                {user.isOwner ? (
                    <CloseRecordOwner days={days} />
                ) : (
                    <CloseRecordClient days={days} user={user} />
                )}
                <DatePicker />
            </div>

            <Days days={days} setDays={setDays} />
        </div>
    );
}
