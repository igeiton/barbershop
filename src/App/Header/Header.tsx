import { useAppSelector } from '../../Store/store';

import './HeaderStyles/header.css';

export default function Header({ children }: any) {
    // hooks
    const user = useAppSelector((state) => state.user);

    return (
        <>
            <div className="header z-10">
                <div>
                    {user.name} {user.lastName}
                </div>
            </div>
            {children}
        </>
    );
}
