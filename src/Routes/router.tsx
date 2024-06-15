import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import App from '../App/App';
import Auth from '../App/Auth/Auth';
import AuthClient from '../App/Auth/AuthClient';
import Day from '../App/Service/Day';

export const router = createBrowserRouter(
    createRoutesFromElements([
        <Route path="/" element={<Auth />}>
            <Route index element={<App />} />
            <Route path="/:day" element={<Day />} />,
        </Route>,
        <Route path="client_auth" element={<AuthClient />} />,
    ])
);
