"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@shared/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/form";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { SellerHeader } from "@widgets/seller-header";
import { AdminSidebar } from "@widgets/admin-sidebar";
import { MetricCard } from "./components/MetricCard";
import { RecentOrders } from "./components/RecentOrder";
// Dữ liệu giả lập khớp với hình ảnh
const data = [
  { name: "26/11", revenue: 1700000, orders: 1500000 },
  { name: "27/11", revenue: 2000000, orders: 2300000 },
  { name: "28/11", revenue: 1600000, orders: 1550000 },
  { name: "29/11", revenue: 2350000, orders: 3000000 },
  { name: "30/11", revenue: 750000, orders: 1600000 },
  { name: "01/12", revenue: 1550000, orders: 1900000 },
];

export interface DashboardMetric {
  id: number;
  title: string;
  value: string;
  subtitle: string;
  trend: number;
  trendLabel: string;
  icon: string;
  color: string;
}

export interface AdminProduct {
  id: number;
  image: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: "Còn hàng" | "Sắp hết" | "Hết hàng";
  sales: number;
}

export interface Order {
  id: string;
  customerName: string;
  products: number;
  total: string;
  status: "Chờ xử lý" | "Đang giao" | "Hoàn thành" | "Đã hủy";
  date: string;
}

export const dashboardMetrics: DashboardMetric[] = [
  {
    id: 1,
    title: "Doanh thu",
    value: "45,680,000 đ",
    subtitle: "Tổng doanh thu trong tháng",
    trend: 12.5,
    trendLabel: "So với tháng trước",
    icon: "dollar-sign",
    color: "#00b143",
  },
  {
    id: 2,
    title: "Số đơn hàng",
    value: "1,247",
    subtitle: "Tổng số đơn hàng đã bán",
    trend: 8.2,
    trendLabel: "So với tháng trước",
    icon: "shopping-cart",
    color: "#6366f1",
  },
  {
    id: 3,
    title: "Doanh thu tháng này",
    value: "12,450,000 đ",
    subtitle: "Doanh thu tích lũy trong tháng này",
    trend: 15.3,
    trendLabel: "So với tháng trước",
    icon: "trending-up",
    color: "#10b981",
  },
  {
    id: 4,
    title: "Khách hàng",
    value: "856",
    subtitle: "Tổng số khách hàng",
    trend: 5.7,
    trendLabel: "Khách mới tuần này",
    icon: "users",
    color: "#3b82f6",
  },
];

export default function StatisticsPage() {
  return (
    <div>
      <SellerHeader />
      <main className="flex-1 flex flex-row h-full ">
        <AdminSidebar className="m-4 h-full" />
        <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl font-bold">Thống kê</CardTitle>
                  <CardDescription className="text-base mt-2">
                    Xem báo cáo và thống kê về doanh số và sản phẩm
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardMetrics.map((metric) => (
                  <MetricCard key={metric.id} {...metric} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chart Section */}
          <Card className="p-6">
            <CardHeader className="px-0 pt-0 pb-8 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold">
                Biểu đồ phân tích
              </CardTitle>
              <Select defaultValue="7days">
                <SelectTrigger className="w-35">
                  <SelectValue placeholder="Chọn thời gian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">7 ngày qua</SelectItem>
                  <SelectItem value="30days">30 ngày qua</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>

            <CardContent className="px-0 h-100">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  {/* Lưới ngang (chỉ hiện đường ngang như trong ảnh) */}
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />

                  {/* Trục X */}
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ dy: 10 }}
                  />

                  {/* Trục Y - Format số tiền */}
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => value.toLocaleString("vi-VN")}
                  />

                  <Tooltip
                    formatter={(value) =>
                      (value as number).toLocaleString("vi-VN")
                    }
                  />

                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                  />

                  {/* Cột Doanh thu (Màu xanh dương) */}
                  <Bar
                    name="Doanh thu sản phẩm"
                    dataKey="revenue"
                    fill="#4F85F6"
                    barSize={40}
                    radius={[4, 4, 0, 0]}
                  />

                  {/* Đường Số đơn hàng (Màu xanh lá) */}
                  <Line
                    name="Số đơn hàng"
                    type="monotone"
                    dataKey="orders"
                    stroke="#4BAF50"
                    strokeWidth={3}
                    dot={{
                      r: 6,
                      fill: "#4BAF50",
                      strokeWidth: 2,
                      stroke: "#fff",
                    }}
                    activeDot={{ r: 8 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
              <div className="h-24"></div>
            </CardContent>
          </Card>

           <Card className="mt-6">
              <CardContent>
                <RecentOrders />
              </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
