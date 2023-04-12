import dynamic from 'next/dynamic';

const TrackMap = dynamic(() => import('./Map'), {
    ssr: false
});

export default TrackMap;