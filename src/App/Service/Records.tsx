import { useEffect, useState } from 'react';
import { useCreateRecordMutation } from '../../Store/API/daysApi';
import { getImageUrl } from '../assets/getImageUrl';
import { filtering } from './Actions/FilterRecords';
import Record from './Record';
import ServiceSelect from './UI/ServiceSelect';

export default function Records({ day: [day], days }: any) {
    const [service, setService] = useState(1);
    const graphic = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    const filteredGraphic = graphic.filter((time) =>
        filtering(time, service, day)
    );

    const [updateRecord] = useCreateRecordMutation();

    const updateServiceFill = (service: string, fill: string) => {
        updateRecord({
            body: {
                ...day,
                [service]: fill,
            },
            dayID: day.id,
        });
    };

    useEffect(() => {
        if (
            filteredGraphic.length === 10 ||
            filteredGraphic.length === 8 ||
            filteredGraphic.length === graphic.length
        ) {
            updateServiceFill('service' + service, 'empty');
            // return 'empty';
        } else if (filteredGraphic.length === 0) {
            updateServiceFill('service' + service, 'fullfilled');
            // return 'fullfilled';
        } else {
            updateServiceFill('service' + service, 'halffilled');
            // return 'halffilled';
        }
    }, [days, service]);

    return (
        <>
            <div className="flex gap-4 max-w-[500px] self-center w-full">
                <ServiceSelect
                    active={service === 1}
                    onClick={() => setService(1)}
                    bgImage={getImageUrl('cutting.jpg')}
                >
                    1 hour <br /> Cutting
                </ServiceSelect>

                <ServiceSelect
                    active={service === 3}
                    onClick={() => setService(3)}
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
