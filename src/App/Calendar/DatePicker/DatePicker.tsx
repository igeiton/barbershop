import { useAppDispatch, useAppSelector } from '../../../Store/store';
import { setMonth, setYear } from '../../../Store/userReducer';
import Month2_0 from './Month2_0';
import Year2_0 from './Year2_0';

export default function DatePicker() {
    // hooks
    const dispatch = useAppDispatch();

    const { selectedMonth, selectedYear } = useAppSelector(
        (state) => state.user
    );

    // functions
    const changeMonth = (value: number) => {
        dispatch(setMonth(value + 1));
    };

    const changeYear = (value: number) => {
        dispatch(setYear(value));
    };

    return (
        <div className="flex flex-col gap-1 min-w-[25%] self-center animate-[fading_500ms_ease-out]">
            <Month2_0 selectedMonth={selectedMonth} onChange={changeMonth} />

            <div className="text-center text-white opacity-30 text-[10px] uppercase">
                выброр даты
            </div>

            <Year2_0 selectedYear={selectedYear} onChange={changeYear} />
        </div>
    );
}

export const MenuSX = {
    '.MuiMenu-root': {
        padding: '5px',
    },
    '.MuiMenu-list': {
        padding: '5px',
        gap: '5px',
    },
    '.MuiMenu-paper': {
        borderRadius: '10px',
    },
    '.MuiMenuItem-root': {
        borderRadius: '10px',
    },
    '.Mui-focusVisible': {
        backgroundColor: 'white',
    },
};

export const MenuListProps = {
    'aria-labelledby': 'basic-button',
    sx: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '15px',
        padding: '5px',
    },
};

export const MenuItemSX = {
    justifyContent: 'center',
    borderRadius: '10px',
};
