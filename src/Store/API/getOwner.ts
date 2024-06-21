import axios from 'axios';

export const getOwner = async (ownerID: string): Promise<any> => {
    return axios
        .get(
            `https://666943c52e964a6dfed45ef0.mockapi.io/api/v1/owners/${ownerID}`
        )
        .then(({ data }) => data);
};
