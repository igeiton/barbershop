import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../Store/authReducer';
import { useAppDispatch, useAppSelector } from '../../Store/store';
import { setCurrentUser } from '../../Store/userReducer';
import { validePhone } from './Actions/validePhone';
import Button from '../UI/Button';
import Input from './UI/Input';
import Snack from '../UI/Snack';

export interface IUserAuth {
    subID: string;
    name: string;
    lastName: string;
    phone: string;
}

export default function AuthClient() {
    // hooks
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { isAuth } = useAppSelector((state) => state.auth);

    const [user, setUser] = useState<IUserAuth>({
        subID: '',
        name: '',
        lastName: '',
        phone: ' ',
    });

    const [isValidFields, setValidFields] = useState(true);

    // functions
    const handleClick = (): void => {
        if (
            user.name === '' ||
            user.lastName === '' ||
            user.phone.replace(/\s/g, '').length < 10
        ) {
            setValidFields(false);
            return;
        }

        dispatch(setCurrentUser(user));
        dispatch(login());

        navigate('/');
    };

    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    });

    return (
        <div className="m-[auto_15px]">
            <div className="form">
                <Input
                    name="name"
                    value={user.name}
                    onChange={(e: any) =>
                        setUser({ ...user, name: e.target.value })
                    }
                />

                <Input
                    name="lastname"
                    value={user.lastName}
                    onChange={(e: any) =>
                        setUser({ ...user, lastName: e.target.value })
                    }
                />

                <Input
                    type="tel"
                    name="phoneNumber"
                    value={user.phone}
                    onChange={(e: any) =>
                        setUser({
                            ...user,
                            phone: validePhone(user.phone, e.target.value),
                        })
                    }
                    InputProps={{ startAdornment: '+7' }}
                />

                <Snack
                    message={'Заполните все поля'}
                    open={!isValidFields}
                    severity="error"
                    onClose={() => setValidFields(true)}
                />

                <Button onClick={handleClick}>Войти</Button>
            </div>
        </div>
    );
}
