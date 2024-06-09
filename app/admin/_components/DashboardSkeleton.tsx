import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
export function DashbaordSkeleton() {
  return (
    <div className="mx-auto min-w-[250px] h-[150px] bg-blue-300 space-y-5 p-5 rounded-md shadow-md">
      <div className="space-y-3">
        <Skeleton className="w-[100px] h-[25px] rounded-md" />

        <Skeleton className="w-[200px] h-[15px] rounded-md" />
      </div>
      <div>
        <Skeleton className="w-[200px] h-[15px] rounded-md" />
      </div>
    </div>
  );
}
