import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import React from 'react';
import { Button } from 'react-day-picker';
import { emailLogin } from '../actions';
import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonCard() {
  return (
    <div>
      {' '}
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl flex justify-center">
            <Skeleton className="w-[100px] h-[25px] rounded-md" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="w-[300px] h-[25px] rounded-md" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login-form" className="grid gap-4">
            <div className="grid gap-2">
              <Skeleton className="w-[300px] h-[45px] rounded-md" />
            </div>
            <div className="grid gap-2">
              <Skeleton className="w-[300px] h-[45px] rounded-md" />
            </div>
            <div className="flex justify-center">
              <Skeleton className="w-[100px] h-[25px] rounded-md" />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
