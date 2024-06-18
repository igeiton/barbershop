import { useCreateRecordMutation } from '../../../Store/API/daysApi';
import { IDay } from '../Day';
import { checkFill } from './Options/CheckFill';
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
    const handleUpdateRecord = (newRecord: INewRecord) => {
        const records: INewRecord[] = [...day.records];

        for (let i = 0; i < day.records.length; i++) {
            if (records[i].id === newRecord.id) {
                records[i] = newRecord;
            }
        }

        updateRecord({
            body: {
                ...day,
                records: records,
                service: checkFill(records),
            },
            dayID: day.id,
        });
    };

    return (
        <div className="flex flex-col max-w-[500px] self-center w-full gap-5">
            {day.records.map((record: any) => (
                <OwnerRecord
                    key={record.recordStart}
                    record={record}
                    handleUpdateRecord={handleUpdateRecord}
                />
            ))}
        </div>
    );
}
