import axios from 'axios';
import { IDay } from '../../App/Service/Day';

export const getDay = async (
    day: string,
    callBack?: () => void
): Promise<IDay[]> => {
    return await axios
        .get(
            `https://666943c52e964a6dfed45ef0.mockapi.io/api/v1/days?day=${day}`
        )
        .then((data) => {
            if (data.data.length === 0) {
                throw new Error('error from getDay');
            }

            return data.data;
        })
        .catch(() => {
            callBack?.();

            return [
                {
                    id: new Date().getTime(),
                    day: day,
                    records: [],
                    service: 'empty',
                },
            ];
        });
};
