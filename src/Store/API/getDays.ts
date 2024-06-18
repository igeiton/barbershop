import axios from 'axios';
import { IDay } from '../../App/Service/Day';

export const getDays = async (): Promise<IDay[]> => {
    return axios
        .get('https://666943c52e964a6dfed45ef0.mockapi.io/api/v1/days')
        .then(({ data }) => data);
};
