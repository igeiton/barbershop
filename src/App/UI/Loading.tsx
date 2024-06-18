import { getImageUrl } from '../assets/getImageUrl';

export default function Loading() {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <img
                className="animate-spin w-[1.5em] h-[1.5em]"
                src={getImageUrl('loading_ring.png')}
                alt="Loading..."
            />
        </div>
    );
}
