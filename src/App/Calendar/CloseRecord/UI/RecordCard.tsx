import Phone from '../../../Service/Owner/UI/Phone';

export default function RecordCard({ title, bool, record, empty, time }: any) {
    return (
        <>
            {bool ? (
                <div className="text-[12px] flex flex-col gap-[5px]">
                    <div className="text-[10px] opacity-50 text-center">
                        {title}
                    </div>

                    <div>
                        <div className="text-[10px] opacity-50">Клиент</div>
                        {record.user.name} {record.user.lastName}
                        <Phone record={record} />
                    </div>

                    <div>
                        <div className="text-[10px] opacity-50">Время</div>
                        {time}
                    </div>

                    <div>
                        <div className="text-[10px] opacity-50">Услуга</div>
                        {record.recordEnd - record.recordStart >= 3
                            ? 'Окрашивание'
                            : 'Стрижка'}
                    </div>
                </div>
            ) : (
                <div className="text-[10px] text-center opacity-50 self-center">
                    {empty}
                </div>
            )}
        </>
    );
}
