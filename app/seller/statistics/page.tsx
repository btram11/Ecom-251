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
import { History, Package, CheckCircle, Coins } from "lucide-react";

// Dữ liệu giả lập khớp với hình ảnh
const data = [
  { name: "26/11", revenue: 1700000, orders: 1500000 },
  { name: "27/11", revenue: 2000000, orders: 2300000 },
  { name: "28/11", revenue: 1600000, orders: 1550000 },
  { name: "29/11", revenue: 2350000, orders: 3000000 },
  { name: "30/11", revenue: 750000, orders: 1600000 },
  { name: "01/12", revenue: 1550000, orders: 1900000 },
];

export default function StatisticsPage() {
  return (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Doanh thu */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Doanh thu</CardTitle>
                <History className="h-6 w-6 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Tổng doanh thu toàn thời gian
                </p>
              </CardContent>
            </Card>

            {/* Card 2: Số đơn hàng */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Số đơn hàng
                </CardTitle>
                <Package className="h-6 w-6 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Tổng số đơn hàng đã bán
                </p>
              </CardContent>
            </Card>

            {/* Card 3: Doanh thu tháng */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Doanh thu tháng
                </CardTitle>
                <CheckCircle className="h-6 w-6 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Doanh thu trong tháng này
                </p>
              </CardContent>
            </Card>

            {/* Card 4: Khách hàng */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Khách hàng
                </CardTitle>
                <Coins className="h-6 w-6 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Tổng số khách hàng
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Chart Section */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0 pb-8 flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold">Biểu đồ phân tích</CardTitle>
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
                formatter={(value) => (value as number).toLocaleString("vi-VN")}
              />

              <Legend verticalAlign="bottom" height={36} iconType="circle" />

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
                dot={{ r: 6, fill: "#4BAF50", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 8 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
