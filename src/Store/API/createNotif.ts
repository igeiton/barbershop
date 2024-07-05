import axios from 'axios';

export const createNotif = async (subsID: string, text: any, date: Date) => {
    const tempAppID = '8fc8a9b2-0afd-47c6-9799-9cf88b9bc132';
    const tempAPIKey = 'ZTU2MzY3MDQtYjFkYy00NGYzLTk3ZmQtMTM2OTk5MmVjNDY3';

    const headers = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${tempAPIKey}`,
        },
    };

    const body = JSON.stringify({
        app_id: tempAppID,
        name: 'Barbershop',
        headings: { en: text.title },
        contents: { en: text.subtitle },
        include_subscription_ids: [subsID],
        send_after: date,
        target_channel: 'push',
    });

    axios
        .post(
            `https://onesignal.com/api/v1/notifications?app_id=${tempAppID}`,
            body,
            headers
        )
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
};
