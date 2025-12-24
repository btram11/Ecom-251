"use client";

import { Button } from "@shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { Input } from "@shared/ui/input";
import { Badge } from "@shared/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Checkbox,
} from "@shared/ui/form";
import {
  Plus,
  Clock,
  Package,
  CheckCircle,
  DollarSign,
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  Truck,
  XCircle,
  X,
  Trash2,
  Phone,
  Home,
} from "lucide-react";
import { useState, useEffect } from "react";
import { getSellerOrders, type Order, formatOrderId } from "@/entities/order";
import { ORDER_STATUS_META } from "@/entities/order/model/status";

export default function SellerPage() {
  // State management
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Modal state
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<Order | null>(null);
  const [cancelReason, setCancelReason] = useState<string>("");
  const [isValidComplaint, setIsValidComplaint] = useState<boolean>(false);

  // Fetch orders on mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getSellerOrders();
        setOrders(data);
      } catch (err) {
        setError("Không thể tải đơn hàng. Vui lòng thử lại.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const openOrderDetail = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const openCancelModal = (order: any) => {
    setOrderToCancel(order);
    setIsCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
    setOrderToCancel(null);
    setCancelReason("");
    setIsValidComplaint(false);
  };

  const confirmCancelOrder = () => {
    // Logic to cancel order would go here
    console.log("Cancelling order:", orderToCancel?.id);
    closeCancelModal();
  };

  // Helper functions
  const getStatusValue = (status: string): string => {
    switch (status) {
      case "WAITING":
        return "pending";
      case "DELIVERING":
        return "shipped";
      case "DELIVERED":
        return "delivered";
      case "CANCELLED":
        return "cancelled";
      default:
        return status.toLowerCase();
    }
  };

  const getStatusBadge = (status: string) => {
    const meta = ORDER_STATUS_META[status as any] || ORDER_STATUS_META.WAITING;
    return (
      <Badge
        variant="secondary"
        className={meta.badgeClass}
      >
        {meta.label}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "WAITING":
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "DELIVERING":
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "DELIVERED":
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "CANCELLED":
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  // Filter and sort orders
  const filteredAndSortedOrders = orders
    .filter((order) => {
      // Filter by status
      if (filterStatus !== "all" && order.orderStatus !== filterStatus) {
        return false;
      }
      // Filter by search term
      if (
        searchTerm &&
        !formatOrderId(order.id, order.createdAt).toLowerCase().includes(searchTerm.toLowerCase()) &&
        !order.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !order.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "highest":
          return b.pick_money - a.pick_money;
        case "lowest":
          return a.pick_money - b.pick_money;
        default:
          return 0;
      }
    });

  // Calculate statistics from real data
  const stats = {
    waiting: orders.filter((o) => o.orderStatus === "WAITING").length,
    preparing: orders.filter((o) => o.orderStatus === "DELIVERING").length,
    delivered: orders.filter((o) => o.orderStatus === "DELIVERED").length,
    revenue: orders.reduce((sum, o) => sum + o.pick_money, 0),
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-500">Đang tải đơn hàng...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold">
                Quản lý đơn hàng
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Theo dõi và quản lý các đơn hàng của bạn
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Chờ xác nhận
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.waiting}</div>
                <p className="text-xs text-muted-foreground">
                  Đơn hàng chờ xác nhận
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Đang giao
                </CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.preparing}</div>
                <p className="text-xs text-muted-foreground">
                  Đơn hàng đang giao
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Đã giao</CardTitle>
                <CheckCircle className="h-6 w-6 text-deep-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.delivered}</div>
                <p className="text-xs text-muted-foreground">
                  Đơn hàng đã giao thành công
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Doanh thu</CardTitle>
                <DollarSign className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(stats.revenue / 1000000).toFixed(1)}M
                </div>
                <p className="text-xs text-muted-foreground">
                  Tổng doanh thu
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Danh sách đơn hàng</h2>
      </div>

      {/* Search, Filter, Sort Bar */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm theo mã đơn hàng, tên khách hàng..."
                  className="pl-10 h-11"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filter */}
            <div className="w-full md:w-48">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="h-11">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Lọc theo trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="WAITING">Chờ xác nhận</SelectItem>
                  <SelectItem value="DELIVERING">Đang giao</SelectItem>
                  <SelectItem value="DELIVERED">Đã giao</SelectItem>
                  <SelectItem value="CANCELLED">Đã hủy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <div className="w-full md:w-48">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-11">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sắp xếp theo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mới nhất</SelectItem>
                  <SelectItem value="oldest">Cũ nhất</SelectItem>
                  <SelectItem value="highest">Giá cao nhất</SelectItem>
                  <SelectItem value="lowest">Giá thấp nhất</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredAndSortedOrders.map((order) => (
          <Card key={order.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                {/* Order Title */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{formatOrderId(order.id, order.createdAt)}</h3>
                </div>
                {/* Status Badge - Same line as title */}
                <div>{getStatusBadge(order.orderStatus)}</div>
              </div>

              <div className="flex flex-col lg:flex-row justify-between gap-4">
                {/* Order Info */}
                <div className="flex-1">
                  <div className="text-sm text-gray-600 mt-1 space-y-1">
                    <div>
                      <span className="font-medium">Khách hàng:</span>{" "}
                      {order.name}
                    </div>
                    <div>
                      <span className="font-medium">Ngày đặt:</span>{" "}
                      {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="font-medium text-sm">Sản phẩm:</span>
                    <p className="text-sm text-gray-600 mt-1">
                      {order.items.map((item) => item.productName).join(", ")}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-200">
                    <span className="font-medium text-sm">Tổng tiền:</span>
                    <span className="text-lg font-bold text-green-600 ml-1">
                      {order.pick_money.toLocaleString()}đ
                    </span>
                  </div>
                </div>

                {/* Actions - Indented to align with title/status */}
                <div className="flex flex-col items-end gap-3">
                  {/* Detail Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full lg:w-auto"
                    onClick={() => openOrderDetail(order)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Chi tiết
                  </Button>

                  {/* Action Buttons */}
                  <div className="flex gap-2 w-full lg:w-auto">
                    {order.orderStatus === "WAITING" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 lg:flex-none border-red-300 text-red-600 hover:bg-red-400 hover:border-red-400"
                          onClick={() => openCancelModal(order)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Huỷ đơn
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 flex-1 lg:flex-none min-w-32"
                        >
                          Xác nhận đơn
                        </Button>
                      </>
                    )}
                    {order.orderStatus === "DELIVERING" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 lg:flex-none border-red-300 text-red-600 hover:bg-red-400 hover:border-red-400"
                          onClick={() => openCancelModal(order)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Huỷ đơn
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredAndSortedOrders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {orders.length === 0
              ? "Không có đơn hàng nào"
              : "Không tìm thấy đơn hàng nào với tiêu chỉ định"}
          </p>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Trước
          </Button>
          <Button
            variant="default"
            size="sm"
            className="bg-green-600 hover:bg-green-700"
          >
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Sau
          </Button>
        </div>
      </div>

      {/* Order Detail Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Chi tiết đơn hàng</h2>
                  <p className="text-gray-600">{formatOrderId(selectedOrder.id, selectedOrder.createdAt)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Order Information */}
              <div className="space-y-6">
                {/* Customer Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Thông tin khách hàng
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-gray-800">{selectedOrder.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <p className="text-gray-800">{selectedOrder.tel || "Không có"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-gray-500" />
                      <p className="text-gray-800">
                        {selectedOrder.address
                          ? `${selectedOrder.address}, ${selectedOrder.district}, ${selectedOrder.province}`
                          : `${selectedOrder.district}, ${selectedOrder.province}`}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Products */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <CardTitle className="text-lg">
                          Sản phẩm đặt hàng
                        </CardTitle>
                        <span className="text-gray-500 text-sm">
                          {new Date(selectedOrder.createdAt).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                      <div>{getStatusBadge(selectedOrder.orderStatus)}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedOrder.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg"
                        >
                          <img
                            src={item.productImage || ""}
                            alt={item.productName || ""}
                            className="w-16 h-16 rounded-lg object-cover bg-gray-200"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.productName}</h4>
                            <p className="text-sm text-gray-500">
                              Số lượng: {item.quantity} {item.productUnit}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-600">
                              {item.finalPrice.toLocaleString()}đ
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Payment Method */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-600">
                          Phương thức thanh toán:
                        </span>
                        <span className="font-semibold">
                          {selectedOrder.orderStatus === "WAITING" ? "Chờ thanh toán" : "Đã thanh toán"}
                        </span>
                      </div>
                    </div>

                    {/* Shipping & Total */}
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Phí vận chuyển:</span>
                        <span className="font-medium">{selectedOrder.shippingFee.toLocaleString()}đ</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Tổng sản phẩm:</span>
                        <span className="font-medium">{selectedOrder.totalProductPrice.toLocaleString()}đ</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Order Summary */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-medium">Tổng tiền:</span>
                      <span className="font-bold text-green-600">
                        {selectedOrder.pick_money.toLocaleString()}đ
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-end">
                  <Button variant="outline" onClick={closeModal}>
                    Đóng
                  </Button>
                  {selectedOrder.orderStatus === "WAITING" && (
                    <Button className="bg-green-600 hover:bg-green-700">
                      Xác nhận đơn
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Order Modal */}
      {isCancelModalOpen && orderToCancel && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 p-6 shadow-2xl">
            <div className="text-left mb-6">
              {/* Title */}
              <h2 className="text-2xl font-bold mb-2">Huỷ đơn hàng</h2>

              {/* Content - Increased to base size */}
              <p className="text-base text-gray-600">
                Bạn có chắc chắn muốn huỷ đơn hàng{" "}
                <strong>{formatOrderId(orderToCancel.id, orderToCancel.createdAt)}</strong> không?
                <br />
                Hành động này không thể hoàn tác.
              </p>
            </div>

            {/* Order Info - Removed text-sm, added more spacing */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Khách hàng:</span>
                  <span className="font-medium">{orderToCancel.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Số điện thoại:</span>
                  <span className="font-medium">{orderToCancel.tel || "Không có"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng tiền:</span>
                  <span className="font-medium text-green-600 text-lg">
                    {orderToCancel.pick_money.toLocaleString()}đ
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phương thức thanh toán:</span>
                  <span className="font-medium">
                    {orderToCancel.orderStatus === "WAITING" ? "Chờ thanh toán" : "Đã thanh toán"}
                  </span>
                </div>
              </div>
            </div>

            {/* Cancel Reason - Increased title size and button text */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Lý do huỷ đơn hàng
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={
                    cancelReason === "Khách hàng hủy" ? "default" : "outline"
                  }
                  onClick={() => setCancelReason("Khách hàng hủy")}
                  className="h-auto py-2"
                >
                  Khách hàng hủy
                </Button>
                <Button
                  variant={cancelReason === "Hết hàng" ? "default" : "outline"}
                  onClick={() => setCancelReason("Hết hàng")}
                  className="h-auto py-2"
                >
                  Hết hàng
                </Button>
                <Button
                  variant={
                    cancelReason === "Không liên lạc được"
                      ? "default"
                      : "outline"
                  }
                  onClick={() => setCancelReason("Không liên lạc được")}
                  className="h-auto py-2"
                >
                  Không liên lạc được
                </Button>
                <Button
                  variant={
                    cancelReason === "Lý do khác" ? "default" : "outline"
                  }
                  onClick={() => setCancelReason("Lý do khác")}
                  className="h-auto py-2"
                >
                  Lý do khác
                </Button>
              </div>
            </div>

            {/* Cancellation Fee - Increased text sizes */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">
                  Chi phí huỷ đơn:
                </span>
                <span className="text-lg font-bold text-red-600">25,000đ</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Trong vòng 12h, người bán được phép hủy đơn. Sau thời gian đó,
                doanh nghiệp phải chịu phí hủy đơn trừ lý hợp lệ.
              </p>
            </div>

            {/* Valid Reason Complaint - Increased label size */}
            <div className="flex items-center gap-2 mb-6">
              <Checkbox
                id="valid-complaint"
                checked={isValidComplaint}
                onCheckedChange={(checked) =>
                  setIsValidComplaint(checked === true)
                }
              />
              <label
                htmlFor="valid-complaint"
                className="text-base text-gray-700 cursor-pointer"
              >
                Khiếu nại lý do huỷ hợp lệ
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={closeCancelModal}
              >
                Đóng
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={confirmCancelOrder}
                disabled={!cancelReason}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Xác nhận huỷ
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
