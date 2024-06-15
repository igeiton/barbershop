import Month from './Month';
import Year from './Year';

export default function DatePicker() {
    return (
        <div className="flex flex-col gap-5 w-full max-w-[500px] self-center">
            <Month />

            <Year />
        </div>
    );
}
