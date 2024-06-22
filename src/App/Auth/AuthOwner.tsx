import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../Store/authReducer';
import { useAppDispatch, useAppSelector } from '../../Store/store';
import CustomButton from '../UI/Button';
import Snack from '../UI/Snack';
import { validePhone } from './Actions/validePhone';
import CustomLink from './UI/CustomLink';
import Input from './UI/Input';
import { setOwner } from '../../Store/userReducer';

export interface IOwnerAuth {
    id: string;
    name: string;
    phone: string;
    lastName: string;
    password: string;
}

export default function AuthClient() {
    // hooks
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { isAuth } = useAppSelector((state) => state.auth);

    const [user, setUser] = useState<IOwnerAuth>({
        id: '1',
        name: '',
        phone: '',
        lastName: '',
        password: '',
    });

    const [isValidFields, setValidFields] = useState<{
        mess: string;
        isValid: boolean;
    }>({
        mess: '',
        isValid: true,
    });

    const [loading, setLoading] = useState<boolean>(false);

    // functions
    const handleClick = async (): Promise<void> => {
        setLoading(true);

        if (
            user.name === '' ||
            user.lastName === '' ||
            user.phone.replace(/\s/g, '').length < 10 ||
            user.password === ''
        ) {
            return handleLoading('Заполните все поля.');
        }

        const owner = await axios
            .get('https://666943c52e964a6dfed45ef0.mockapi.io/api/v1/owners/1')
            .then(({ data }) => data);

        if (owner.password !== user.password) {
            return handleLoading('Неверные данные.');
        }

        await axios.put(
            'https://666943c52e964a6dfed45ef0.mockapi.io/api/v1/owners/1',
            {
                name: user.name,
                lastName: user.lastName,
                phone: user.phone,
                subsID: localStorage.getItem('subsID'),
            }
        );

        dispatch(setOwner());
        dispatch(login());

        navigate('/');
    };

    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    });

    const handleLoading = (mess: string) => {
        setValidFields({
            mess: mess,
            isValid: false,
        });

        setLoading(false);
        return;
    };

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

                <Input
                    name="Пароль"
                    value={user.password}
                    onChange={(e: any) =>
                        setUser({ ...user, password: e.target.value })
                    }
                />

                <Snack
                    message={isValidFields.mess}
                    open={!isValidFields.isValid}
                    severity="error"
                    onClose={() => setValidFields({ mess: '', isValid: true })}
                />

                <CustomButton loading={loading} onClick={handleClick}>
                    Войти
                </CustomButton>

                <CustomLink onClick={() => navigate('/client_auth')}>
                    пользователь
                </CustomLink>
            </div>
        </div>
    );
}
