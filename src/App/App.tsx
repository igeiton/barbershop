//const url = 'https://666943c52e964a6dfed45ef0.mockapi.io/api/v1/users';

import Calendar from './Calendar/Calendar';

import OneSignal from 'react-onesignal';

function App() {
    OneSignal.init({ appId: '8fc8a9b2-0afd-47c6-9799-9cf88b9bc132' }).then(
        () => {
            OneSignal.Slidedown.promptPush();
            localStorage.setItem(
                'subsID',
                `${OneSignal.User.PushSubscription.id}`
            );
        }
    );
    return (
        <div className="flex flex-col grow">
            <Calendar />
        </div>
    );
}

export default App;
