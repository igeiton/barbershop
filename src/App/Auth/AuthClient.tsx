import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../Store/authReducer';
import { useAppDispatch, useAppSelector } from '../../Store/store';
import { setCurrentUser } from '../../Store/userReducer';
import CustomButton from '../UI/Button';
import Snack from '../UI/Snack';
import { validePhone } from './Actions/validePhone';
import CustomLink from './UI/CustomLink';
import Input from './UI/Input';

export interface IUserAuth {
    subsID: string;
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
        subsID: '',
        name: '',
        lastName: '',
        phone: '',
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
                    name="Имя"
                    value={user.name}
                    onChange={(e: any) =>
                        setUser({ ...user, name: e.target.value })
                    }
                />

                <Input
                    name="Фамилия"
                    value={user.lastName}
                    onChange={(e: any) =>
                        setUser({ ...user, lastName: e.target.value })
                    }
                />

                <Input
                    type="tel"
                    name="Телефон (для связи)"
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

                <CustomButton onClick={handleClick}>Войти</CustomButton>

                <CustomLink onClick={() => navigate('/owner_auth')}>
                    владелец
                </CustomLink>
            </div>
        </div>
    );
}
