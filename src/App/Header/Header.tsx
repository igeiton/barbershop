import { Divider } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../Store/store';
import { translate } from '../Calendar/CloseRecord/Actions/translate';

import './HeaderStyles/header.css';

export default function Header({ children }: any) {
    // hooks
    const location = useLocation().pathname.replace(/\//g, '');

    const user = useAppSelector((state) => state.user);

    return (
        <>
            <div className="header flex justify-between">
                <div>
                    {user.name} {user.lastName}
                </div>

                <div>{location ? translate(location) : ''}</div>
            </div>

            <Divider sx={{ bgcolor: 'grey' }} />

            {children}
        </>
    );
}
