import axios from 'axios';

export const createNotif = async (subsID: string, text: any, date: Date) => {
    console.log(subsID, text, date);
    const headers = {
        headers: {
            'Content-Type': 'application/json',
            Authorization:
                'Basic OWZmMDI3ODQtODIwYS00Nzc1LTg0NmQtMDgzN2JkNWViZjg3',
        },
    };

    const body = JSON.stringify({
        app_id: '7ec78ef9-197a-47a6-b77c-fa6d02907eba',
        name: 'Barbershop',
        headings: { en: text.title },
        contents: { en: text.subtitle },
        include_subscription_ids: [subsID],
        send_after: date,
    });

    axios
        .post(
            'https://onesignal.com/api/v1/notifications?app_id=7ec78ef9-197a-47a6-b77c-fa6d02907eba',
            body,
            headers
        )
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
};
