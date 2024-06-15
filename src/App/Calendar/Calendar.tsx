import './CalendarStyles/Calendar.css';
import DatePicker from './DatePicker/DatePicker';
import Days from './DaysFilling/Days';

export default function Calendar() {
    return (
        <div className="p-4 flex flex-col gap-10 h-full">
            <DatePicker />

            <Days />
        </div>
    );
}
