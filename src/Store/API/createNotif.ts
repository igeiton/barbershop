import axios from 'axios';

export const createNotif = async (subsID: string, text: any, date: Date) => {
    const tempAppID = '7ec78ef9-197a-47a6-b77c-fa6d02907eba';
    const tempAPIKey = 'OWZmMDI3ODQtODIwYS00Nzc1LTg0NmQtMDgzN2JkNWViZjg3';

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
