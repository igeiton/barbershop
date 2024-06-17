import { useCreateRecordMutation } from '../../../Store/API/daysApi';
import OwnerRecord from './OwnerRecord';

export default function OwnerRecords({ day: day }: any) {
    const [updateRecord] = useCreateRecordMutation();
    const records = day?.records;

    if (records.length === 0) return <div>Null</div>;

    const handleUpdateRecord = (newRecord: any) => {
        const asd = [...records];

        for (let i = 0; i < records.length; i++) {
            if (asd[i].id === newRecord.id) {
                asd[i] = newRecord;
            }
        }

        const qwe = asd.reduce((accum: any, record: any) => {
            return accum + record.recordEnd - record.recordStart;
        }, 0);

        checkFill(qwe);

        updateRecord({
            body: {
                ...day,
                records: asd,
                service1: checkFill(qwe),
                service3: checkFill(qwe),
            },
            dayID: day.id,
        });
    };

    function checkFill(value: number) {
        if (value === 0) {
            return 'empty';
        } else if (value >= 10) {
            return 'fullfilled';
        } else {
            return 'halffilled';
        }
    }

    return (
        <div className="flex flex-col max-w-[500px] self-center w-full gap-5">
            {records.map((record: any) => (
                <OwnerRecord
                    key={record.recordStart}
                    record={record}
                    handleUpdateRecord={handleUpdateRecord}
                />
            ))}
        </div>
    );
}
