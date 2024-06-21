import { IRecord } from '../../Day';

import Phone from './Phone';

interface IProps {
    record: IRecord;
}

export default function UserCard({ record }: IProps) {
    return (
        <div className="container">
            <div>
                {record.user.name} {record.user.lastName}
            </div>
            <div className="flex gap-0 items-center flex-wrap">
                <Phone record={record} />
            </div>
        </div>
    );
}
