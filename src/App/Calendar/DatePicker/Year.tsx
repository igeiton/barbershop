import { useAppDispatch, useAppSelector } from '../../../Store/store';
import { setYear } from '../../../Store/userReducer';
import Button from '../../Auth/UI/Button';

export default function Year() {
    const { selectedYear } = useAppSelector((state) => state.user);
    const currentYear = new Date().getFullYear();
    const dispatch = useAppDispatch();

    const changeYear = (value: number) => {
        if (selectedYear + value > currentYear + 3) {
            dispatch(setYear(currentYear));
        } else if (selectedYear + value < currentYear) {
            dispatch(setYear(currentYear + 3));
        } else {
            dispatch(setYear(selectedYear + value));
        }
    };

    return (
        <div className="selectDate">
            <Button onClick={() => changeYear(-1)} className="button">
                {'<'}
            </Button>

            <div>{selectedYear}</div>

            <Button onClick={() => changeYear(1)} className="button">
                {'>'}
            </Button>
        </div>
    );
}
