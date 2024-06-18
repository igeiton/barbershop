import { useAppDispatch, useAppSelector } from '../../../Store/store';
import { setYear } from '../../../Store/userReducer';
import Button from '../../UI/Button';
import { year } from './Actions/Dates';

export default function Year() {
    // hooks
    const dispatch = useAppDispatch();

    const { selectedYear } = useAppSelector((state) => state.user);

    // functions
    const changeYear = (value: number) => {
        if (selectedYear + value > year + 3) {
            dispatch(setYear(year));
        } else if (selectedYear + value < year) {
            dispatch(setYear(year + 3));
        } else {
            dispatch(setYear(selectedYear + value));
        }
    };

    return (
        <div className="selectDate">
            <Button onClick={() => changeYear(-1)}>{'<'}</Button>

            <div>{selectedYear}</div>

            <Button onClick={() => changeYear(1)}>{'>'}</Button>
        </div>
    );
}
