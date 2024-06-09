import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency, formatNumber } from '@/lib/currencyFormats';
import db from '@/lib/db';
import { DashbaordSkeleton } from './_components/DashboardSkeleton';

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: { paidInCents: true },
    _count: true,
  });

  return {
    amount: (data._sum.paidInCents || 0) / 100,
    numOfSales: data._count,
  };
}

async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { paidInCents: true },
    }),
  ]);
  await wait(2000);

  return {
    userCount,
    averageValuePerUser:
      userCount === 0 ? 0 : (orderData._sum.paidInCents || 0) / userCount / 100,
  };
}

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

// async function getProductData() {
//   const [activeCount, inactiveCount] = await Promise.all([
//     db.product.count({ where: { isAvailableForPurchase: true } }),
//     db.product.count({ where: { isAvailableForPurchase: false } }),
//   ])

//   return { activeCount, inactiveCount }
// }

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const [salesData, userData] = await Promise.all([
    getSalesData(),
    getUserData(),
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-5">
      <DashboardCard
        title="Sales"
        subtitle={`${formatNumber(salesData.numOfSales)} number of sales`}
        body={`Amount made: ${formatCurrency(salesData.amount)}`}
      />
      <DashboardCard
        title="Customer"
        subtitle={`${formatCurrency(
          userData.averageValuePerUser,
        )} average value`}
        body={formatNumber(userData.userCount)}
      />
      {/* <DashboardCard
        title="Active Products"
        subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
        body={formatNumber(productData.activeCount)}
      /> */}
      <div className="bg-blue-300">
        {searchParams.message && (
          <div className="text-sm font-medium text-destructive">
            {searchParams.message}
          </div>
        )}
      </div>
    </div>
  );
}

type Props = {
  title: string;
  subtitle: string;
  body: string;
};

function DashboardCard({ title, subtitle, body }: Props) {
  return (
    <Card className="mx-auto min-w-[250px]">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>{body}</CardContent>
    </Card>
  );
}
