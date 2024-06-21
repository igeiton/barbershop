import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Store/store';
import { setService } from '../../../Store/userReducer';
import ServiceSelect from '../../UI/ServiceSelect';
import { getImageUrl } from '../../assets/getImageUrl';
import { filtering } from '../Actions/FilterRecords';
import Record from './Record';

function Records({ day: day }: any) {
    // hooks
    const dispatch = useAppDispatch();

    const { service } = useAppSelector((state) => state.user);

    // const
    const graphic = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

    const filteredGraphic = graphic.filter((time) =>
        filtering(time, service, day)
    );

    // functions
    const switchService = (service: number) => {
        dispatch(setService(service));
    };

    return (
        <>
            <div className="flex gap-4 max-w-[500px] self-center w-full animate-[fading_1500ms_ease-out]">
                <ServiceSelect
                    active={service === 1}
                    onClick={() => switchService(1)}
                    bgImage={getImageUrl('cutting.jpg')}
                >
                    1 час <br /> Стрижка
                </ServiceSelect>

                <ServiceSelect
                    active={service === 3}
                    onClick={() => switchService(3)}
                    bgImage={getImageUrl('colorizing.jpg')}
                >
                    3 часа <br /> Окрашивание
                </ServiceSelect>
            </div>

            <div className="flex flex-col max-w-[500px] self-center w-full gap-5 mt-4">
                {filteredGraphic.length > 0 ? (
                    filteredGraphic.map((time) => (
                        <Record
                            key={new Date().getTime() + time}
                            time={time}
                            day={day}
                            service={service}
                        />
                    ))
                ) : (
                    <div className="w-full text-white text-center animate-[fading_1500ms_ease-out]">
                        <div className="opacity-50">
                            {'Нет сводобных записей : ('}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default memo(Records);
