//const url = 'https://666943c52e964a6dfed45ef0.mockapi.io/api/v1/users';

import { useEffect } from 'react';
import Calendar from './Calendar/Calendar';

import OneSignal from 'react-onesignal';
import axios from 'axios';
import { useAppSelector } from '../Store/store';

function App() {
    const user = useAppSelector((state) => state.user);

    useEffect(() => {
        initOneSignal(user);
    }, []);
    return (
        <div className="flex flex-col grow">
            <Calendar />
        </div>
    );
}

export default App;

async function initOneSignal(user: any) {
    await OneSignal.init({
        appId: '8fc8a9b2-0afd-47c6-9799-9cf88b9bc132',
    })
        .then(() => {
            OneSignal.Slidedown.promptPush();
        })
        .catch((err) => console.log(err));

    localStorage.setItem('subsID', `${OneSignal.User.PushSubscription.id}`);

    if (user.isOwner) {
        await axios.put(
            'https://666943c52e964a6dfed45ef0.mockapi.io/api/v1/owners/1',
            {
                name: user.name,
                lastName: user.lastName,
                phone: user.phone,
                subsID: localStorage.getItem('subsID'),
            }
        );
    } else {
        updateDay(user.phone);
    }
}

async function updateDay(phone: string) {
    const { data }: any = await axios
        .get('https://666943c52e964a6dfed45ef0.mockapi.io/api/v1/days')
        .then((data) => data);

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].records.length; j++) {
            if (
                data[i].records[j].user.subsID !==
                    localStorage.getItem('subsID') &&
                data[i].records[j].user.phone === `+7${phone}`
            ) {
                console.log(true);
                data[i].records[j].user.subsID = localStorage.getItem('subsID');

                await axios.put(
                    `https://666943c52e964a6dfed45ef0.mockapi.io/api/v1/days/${data[i].id}`,
                    data[i]
                );
            }
        }
    }
    console.log(data);
}
