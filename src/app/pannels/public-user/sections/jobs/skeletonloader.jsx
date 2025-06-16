import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const JobCardSkeleton = () => {
  return (
    <div className="bg-white p-3 rounded-2xl  border mb-6 space-y-4">
      {/* Logo and title */}
      <div className="flex items-start space-x-4">
        <Skeleton circle width={64} height={64} />
        <div className="flex-1 space-y-2">
          <Skeleton height={20} width="60%" />
          <Skeleton height={16} width="40%" />
        </div>
      </div>

      {/* Info Row */}
      <div className="flex gap-4 mt-2">
        <Skeleton height={14} width={80} />
        <Skeleton height={14} width={60} />
        <Skeleton height={14} width={100} />
      </div>

      {/* Tags */}
      <div className="flex gap-2 mt-2">
        <Skeleton height={24} width={80} borderRadius={20} />
        <Skeleton height={24} width={70} borderRadius={20} />
        <Skeleton height={24} width={90} borderRadius={20} />
      </div>

      {/* Button */}
      <div className="mt-4">
        <Skeleton height={40} width={120} borderRadius={10} />
      </div>
    </div>
  );
};
