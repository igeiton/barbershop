import { Link } from '@mui/material';

export default function CustomLink({ children, onClick }: any) {
    return (
        <div className="self-center opacity-50 text-[10px]">
            Войти как{' '}
            <Link sx={{ cursor: 'pointer' }} onClick={onClick}>
                {children}.
            </Link>
        </div>
    );
}
