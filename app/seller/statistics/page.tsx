import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";

export default function StatisticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Thống kê</h1>
        <p className="text-muted-foreground">
          Xem báo cáo và thống kê về doanh số và sản phẩm
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Statistics Dashboard</CardTitle>
          <CardDescription>Coming soon...</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Statistics page is under development.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
