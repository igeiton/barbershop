import axios from 'axios';

export const getDay = async (day: string) => {
    return await axios
        .get(
            `https://666943c52e964a6dfed45ef0.mockapi.io/api/v1/days?day=${day}`
        )
        .then((data) => {
            if (data?.data?.length === 0) {
                throw new Error('error from asd');
            }

            return data.data;
        })
        .catch(() => {
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
