import { PageHeader } from '../ui/page-header';
import { Skeleton } from '../ui/skeleton';

export function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Profile"
          description="Manage your account settings and default resume information."
        />
      </div>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-8 w-20" />
          </div>

          <div className="grid flex-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}
