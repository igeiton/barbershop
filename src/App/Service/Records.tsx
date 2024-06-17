import { useEffect } from 'react';
import { useCreateRecordMutation } from '../../Store/API/daysApi';
import { useAppDispatch, useAppSelector } from '../../Store/store';
import { setService } from '../../Store/userReducer';
import { getImageUrl } from '../assets/getImageUrl';
import { filtering } from './Actions/FilterRecords';
import Record from './Record';
import ServiceSelect from './UI/ServiceSelect';

export default function Records({ day: day, update }: any) {
    const { service } = useAppSelector((state) => state.user);
    // const [service, setService] = useState(1);
    const graphic = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    const filteredGraphic = graphic.filter((time) =>
        filtering(time, service, day)
    );

    const [updateRecord] = useCreateRecordMutation();

    const updateServiceFill = (fill: string) => {
        updateRecord({
            body: {
                ...day,
                service: fill,
            },
            dayID: day.id,
        });
    };

    const dispatch = useAppDispatch();

    const switchService = (service: number) => {
        dispatch(setService(service));
    };

    useEffect(() => {
        if (day.records.length === 0) {
            console.log('empty');
            updateServiceFill('empty');
        } else if (filteredGraphic.length === 0) {
            console.log('fullfilled');
            updateServiceFill('fullfilled');
        } else {
            console.log('halffilled');
            updateServiceFill('halffilled');
        }
    }, []);

    return (
        <>
            <div className="flex gap-4 max-w-[500px] self-center w-full">
                <ServiceSelect
                    active={service === 1}
                    onClick={() => switchService(1)}
                    bgImage={getImageUrl('cutting.jpg')}
                >
                    1 hour <br /> Cutting
                </ServiceSelect>

                <ServiceSelect
                    active={service === 3}
                    onClick={() => switchService(3)}
                    bgImage={getImageUrl('colorizing.jpg')}
                >
                    3 hour <br /> Colorizing
                </ServiceSelect>
            </div>

            <div className="flex flex-col max-w-[500px] self-center w-full gap-5">
                {filteredGraphic.length > 0 ? (
                    filteredGraphic.map((time) => (
                        <Record
                            key={time}
                            time={time}
                            day={day}
                            service={service}
                            update={update}
                        />
                    ))
                ) : (
                    <div className="record">
                        <span className="text-center w-full">
                            No records : (
                        </span>
                    </div>
                )}
            </div>
        </>
    );
}
