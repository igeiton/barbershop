import { createNotif } from '../../../Store/API/createNotif';
import { useCreateRecordMutation } from '../../../Store/API/daysApi';
import { translate } from '../../Calendar/CloseRecord/Actions/translate';
import { checkFill } from '../Actions/CheckFill';
import { IDay } from '../Day';
import OwnerRecord from './OwnerRecord';

interface IProps {
    day: IDay;
}

interface INewRecord {
    id: number;
    recordStart: number;
    recordEnd: number;
}

export default function OwnerRecords({ day: day }: IProps) {
    // hooks
    const [updateRecord] = useCreateRecordMutation();

    // validation
    if (day.records.length === 0) return <div>Null</div>;

    // functions
    const changeTime = (newRecord: INewRecord) => {
        day.records = [...day.records].map((record) => {
            if (record.id === newRecord.id) {
                record.recordStart = newRecord.recordStart;
                record.recordEnd = newRecord.recordEnd;

                const text = {
                    title: `Olesya Bezhovets`,
                    subtitle: `Запись перенесена на ${translate(
                        day.day
                    ).toLowerCase()}, с ${record.recordStart}:00 до ${
                        record.recordEnd
                    }:00`,
                };

                createNotif(record.user.subID, text, new Date());
            }

            return record;
        });

        handleUpdateRecords();
    };

    const deleteRecord = (id: number) => {
        day.records = [...day.records].filter((record) => record.id !== id);

        handleUpdateRecords();
    };

    const handleUpdateRecords = () => {
        updateRecord({
            body: {
                ...day,
                service: checkFill(day.records),
            },
            dayID: day.id,
        });
    };

    return (
        <div className="flex flex-col max-w-[500px] self-center w-full gap-5">
            {day.records.map((record: any) => (
                <OwnerRecord
                    key={record.id}
                    record={record}
                    changeTime={changeTime}
                    deleteRecord={deleteRecord}
                />
            ))}
        </div>
    );
}
