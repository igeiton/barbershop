import axios from 'axios';

export const createNotif = async (subsID: string, text: any, date: Date) => {
    const headers = {
        headers: {
            'Content-Type': 'application/json',
            Authorization:
                'Basic ZTU2MzY3MDQtYjFkYy00NGYzLTk3ZmQtMTM2OTk5MmVjNDY3',
        },
    };

    const body = JSON.stringify({
        app_id: '8fc8a9b2-0afd-47c6-9799-9cf88b9bc132',
        name: 'Barbershop',
        headings: { en: text.title },
        contents: { en: text.subtitle },
        include_subscription_ids: [subsID],
        send_after: date,
    });

    axios.post(
        'https://onesignal.com/api/v1/notifications?app_id=8fc8a9b2-0afd-47c6-9799-9cf88b9bc132',
        body,
        headers
    );
    // .then((data) => console.log(data))
    // .catch((err) => console.log(err));
};
