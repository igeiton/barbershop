import { useAppDispatch, useAppSelector } from '../../../Store/store';
import { setMonth } from '../../../Store/userReducer';
import Button from '../../Auth/UI/Button';
import { months } from './Actions/Dates';

export default function Month() {
    const { selectedMonth } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const changeMonth = (value: number) => {
        if (selectedMonth + value > 12) {
            dispatch(setMonth(1));
        } else if (selectedMonth + value < 1) {
            dispatch(setMonth(12));
        } else {
            dispatch(setMonth(selectedMonth + value));
        }
    };

    return (
        <div className="selectDate">
            <Button onClick={() => changeMonth(-1)} className="">
                {'<'}
            </Button>

            <div>{months[selectedMonth]}</div>

            <Button onClick={() => changeMonth(1)} className="button">
                {'>'}
            </Button>
        </div>
    );
}
