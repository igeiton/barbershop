import { IUser } from '../../../Store/userReducer';
import { IDay } from '../../Service/Day';
import CustomSkeleton from '../UI/CustomSkeleton';
import { compareDates } from './Actions/compareDates';
import { translate } from './Actions/translate';

interface IProps {
    days: IDay[];
    user: IUser;
}

export default function CloseRecord({ days, user }: IProps) {
    // validation
    if (days.length === 0) return <CustomSkeleton />;

    // sort days by date (day)
    days = days.sort(
        (a, b) => new Date(a.day).getTime() - new Date(b.day).getTime()
    );

    // find close record
    let closeRecord = {
        day: '' as string,
        start: 0 as number,
        end: 0 as number,
    };

    findCloseRecord: for (let i = 0; i < days.length; i++) {
        for (let j = 0; j < days[i].records.length; j++) {
            if (days[i].records[j].user.phone === `+7${user.phone}`) {
                if (compareDates(days[i].day, days[i].records[j])) continue;

                closeRecord.day = days[i].day;
                closeRecord.start = days[i].records[j].recordStart;
                closeRecord.end = days[i].records[j].recordEnd;
                break findCloseRecord;
            }
        }
    }

    return (
        <div className="w-full rounded-[10px] text-[white] bg-[#4b4b4b]">
            <div className=" flex flex-col h-full items-center justify-center animate-[fading_1s_linear] p-[15px] justify-around box-border text-[12px]">
                {closeRecord.day ? (
                    <>
                        <div className="text-[10px] opacity-50">
                            Ближайшая запись
                        </div>

                        <div className="text-center">
                            {translate(closeRecord.day)}, в {closeRecord.start}
                            :00
                        </div>

                        <div>
                            {closeRecord.end - closeRecord.start >= 3
                                ? 'Окрашивание'
                                : 'Стрижка'}
                        </div>
                    </>
                ) : (
                    <div className="opacity-50">Нет ближащей записи</div>
                )}
            </div>
        </div>
    );
}
