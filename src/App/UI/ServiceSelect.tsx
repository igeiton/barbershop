import { Button } from '@mui/material';
import { IStyles } from '../Calendar/CalendarStyles/styledDay';

interface IProps {
    bgImage: string;
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

export default function ServiceSelect({
    bgImage,
    active,
    onClick,
    children,
    ...props
}: IProps) {
    return (
        <div
            style={getBackground(bgImage)}
            className={`${
                active ? 'w-[66%]' : 'w-[33%]'
            } duration-500 ease-out`}
            onClick={onClick}
        >
            <Button
                variant={active ? 'outlined' : 'contained'}
                sx={{
                    transition: 'all 0.5s ease',
                    backdropFilter: 'blur(5px)',
                    color: 'white',
                    borderColor: 'white',
                    ...(active
                        ? { width: '66%', height: '66%' }
                        : { height: '100%', width: '100%' }),
                    '&:hover': {
                        borderColor: 'white',
                    },
                    borderRadius: '10px',
                }}
                {...props}
            >
                {children}
            </Button>
        </div>
    );
}

function getBackground(bgImage: string): IStyles {
    if (bgImage === '') return { backgroundColor: 'transparent' };

    return {
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        minHeight: '100px',
        display: 'flex',
        borderRadius: '10px',
        justifyContent: 'center',
        alignItems: 'center',
    };
}
