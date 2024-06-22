import { Divider } from '@mui/material';
import { IDay, IRecord } from '../../Service/Day';
import CustomSkeleton from '../UI/CustomSkeleton';
import RecordCard from './UI/RecordCard';
import { translate } from './Actions/translate';
import { compareDates } from './Actions/compareDates';

interface IProps {
    days: IDay[];
}

export default function CloseRecordOwner({ days }: IProps) {
    // validation
    if (days.length === 0) return <CustomSkeleton />;

    days = days.sort(
        (a, b) => new Date(a.day).getTime() - new Date(b.day).getTime()
    );

    // hour now
    const hourNow = Number(new Date().toLocaleTimeString().split(':')[0]);

    let nowRecord: IRecord = {
        id: 0,
        recordStart: 0,
        recordEnd: 0,
        user: {
            subsID: `${localStorage.getItem('subsID')}`,
            name: '',
            lastName: '',
            phone: '',
        },
    };

    findNowRecord: for (let i = 0; i < days.length; i++) {
        if (days[i].day === new Date().toLocaleDateString('LT')) {
            for (let j = 0; j < days[i].records.length; j++) {
                if (
                    hourNow >= days[i].records[j].recordStart &&
                    hourNow < days[i].records[j].recordEnd
                ) {
                    nowRecord = days[i].records[j];

                    break findNowRecord;
                }
            }
        }
    }

    const nextRecord = {
        day: '' as string,
        record: {} as IRecord,
    };

    findCloseRecord: for (let i = 0; i < days.length; i++) {
        for (let j = 0; j < days[i].records.length; j++) {
            if (days[i].records[j].id !== nowRecord.id) {
                if (compareDates(days[i].day, days[i].records[j])) {
                    continue;
                }

                nextRecord.day = days[i].day;
                nextRecord.record = days[i].records[j];
                break findCloseRecord;
            }
        }
    }

    return (
        <div className="w-full rounded-[10px] text-[white] bg-[#4b4b4b]">
            <div className="flex flex-col gap-[15px] h-full animate-[fading_1s_linear] p-[15px] justify-around box-border">
                <RecordCard
                    title={'Текущая запись'}
                    bool={nowRecord.id !== 0}
                    record={nowRecord}
                    empty={'Сейчас нет записи ;)'}
                    time={`С ${nowRecord.recordStart}:00 до ${nowRecord.recordEnd}:00`}
                />

                <Divider flexItem sx={{ borderColor: 'white' }} />

                <RecordCard
                    title={'Следующая запись'}
                    bool={nextRecord.day !== ''}
                    record={nextRecord.record}
                    empty={'Нет ближайшей записи ;('}
                    time={`${translate(nextRecord.day)}, в ${
                        nextRecord.record.recordStart
                    }:00`}
                />
            </div>
        </div>
    );
}
