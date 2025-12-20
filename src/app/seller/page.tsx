"use client";

import { Button } from "@components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Badge } from "@components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/form/select";
import { Checkbox } from "@components/ui/form/checkbox";
import { Plus, Clock, Package, CheckCircle, DollarSign, Search, Filter, ArrowUpDown, Eye, Truck, XCircle, X, Trash2, Phone, Home } from "lucide-react";
import { useState } from "react";

export default function SellerPage() {
  // Sample order data
  const orders = [
    {
      id: "#ORD-2024-001",
      customer: "Nguyễn Văn A",
      phone: "0987 654 321",
      address: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
      date: "2024-12-20",
      total: 250000,
      status: "pending",
      statusText: "Chờ xác nhận",
      items: ["Rau muống sạch", "Cà rốt Đà Lạt"],
      payment: "COD"
    },
    {
      id: "#ORD-2024-002",
      customer: "Trần Thị B",
      phone: "0978 123 456",
      address: "456 Đường DEF, Phường UVW, Quận 2, TP.HCM",
      date: "2024-12-19",
      total: 180000,
      status: "preparing",
      statusText: "Đang chuẩn bị",
      items: ["Cà phê Cầu Đất", "Mật ong rừng"],
      payment: "Chuyển khoản"
    },
    {
      id: "#ORD-2024-005",
      customer: "Hoàng Văn E",
      phone: "0965 789 012",
      address: "789 Đường GHI, Phường RST, Quận 3, TP.HCM",
      date: "2024-12-16",
      total: 275000,
      status: "ready",
      statusText: "Sẵn sàng giao",
      items: ["Gạo ST25", "Đường phèn"],
      payment: "COD"
    },
    {
      id: "#ORD-2024-003",
      customer: "Lê Văn C",
      phone: "0955 234 567",
      address: "321 Đường JKL, Phường MNO, Quận 4, TP.HCM",
      date: "2024-12-18",
      total: 320000,
      status: "shipped",
      statusText: "Đã giao",
      items: ["Trái cây organic", "Thịt gà sạch"],
      payment: "COD"
    },
    {
      id: "#ORD-2024-004",
      customer: "Phạm Thị D",
      phone: "0944 345 678",
      address: "654 Đường PQR, Phường STU, Quận 5, TP.HCM",
      date: "2024-12-17",
      total: 95000,
      status: "delivered",
      statusText: "Hoàn thành",
      items: ["Trứng gà thả vườn"],
      payment: "Chuyển khoản"
    },
    {
      id: "#ORD-2024-006",
      customer: "Đỗ Thị F",
      phone: "0933 456 789",
      address: "987 Đường VWX, Phường YZA, Quận 6, TP.HCM",
      date: "2024-12-15",
      total: 410000,
      status: "cancelled",
      statusText: "Đã hủy",
      items: ["Củ quả Đà Lạt", "Gia vị tự nhiên"],
      payment: "COD"
    }
  ];

  // Modal state
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<any>(null);
  const [cancelReason, setCancelReason] = useState<string>("");
  const [isValidComplaint, setIsValidComplaint] = useState<boolean>(false);

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">Chờ xác nhận</Badge>;
      case "preparing":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">Đang chuẩn bị</Badge>;
      case "ready":
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">Sẵn sàng giao</Badge>;
      case "shipped":
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">Đã giao</Badge>;
      case "delivered":
        return <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">Hoàn thành</Badge>;
      case "cancelled":
        return <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">Đã hủy</Badge>;
      default:
        return <Badge variant="secondary">Không xác định</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "preparing":
        return <Package className="h-4 w-4" />;
      case "ready":
        return <Truck className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold">Quản lý đơn hàng</CardTitle>
              <CardDescription className="text-base mt-2">Theo dõi và quản lý các đơn hàng của bạn</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Chờ xác nhận</CardTitle>
                <Clock className="h-6 w-6 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Đơn hàng chờ xác nhận</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Đang chuẩn bị</CardTitle>
                <Package className="h-6 w-6 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Đơn hàng đang chuẩn bị</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Đã giao</CardTitle>
                <CheckCircle className="h-6 w-6 text-deep-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">Đơn hàng đã giao thành công</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Doanh thu</CardTitle>
                <DollarSign className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.5M</div>
                <p className="text-xs text-muted-foreground">Tổng doanh thu tháng này</p>
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
                />
              </div>
            </div>

            {/* Filter */}
            <div className="w-full md:w-48">
              <Select>
                <SelectTrigger className="h-11">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Lọc theo trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="pending">Chờ xác nhận</SelectItem>
                  <SelectItem value="preparing">Đang chuẩn bị</SelectItem>
                  <SelectItem value="shipped">Đã giao</SelectItem>
                  <SelectItem value="delivered">Hoàn thành</SelectItem>
                  <SelectItem value="cancelled">Đã hủy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <div className="w-full md:w-48">
              <Select>
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
        {orders.map((order) => (
          <Card key={order.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                {/* Order Title */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{order.id}</h3>
                </div>
                {/* Status Badge - Same line as title */}
                <div>
                  {getStatusBadge(order.status)}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row justify-between gap-4">
                {/* Order Info */}
                <div className="flex-1">
                  <div className="text-sm text-gray-600 mt-1 space-y-1">
                    <div>
                      <span className="font-medium">Khách hàng:</span> {order.customer}
                    </div>
                    <div>
                      <span className="font-medium">Ngày đặt:</span> {order.date}
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="font-medium text-sm">Sản phẩm:</span>
                    <p className="text-sm text-gray-600 mt-1">{order.items.join(", ")}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-200">
                    <span className="font-medium text-sm">Tổng tiền:</span>
                    <span className="text-lg font-bold text-green-600 ml-1">
                      {order.total.toLocaleString()}đ
                    </span>
                  </div>
                </div>

                {/* Actions - Indented to align with title/status */}
                <div className="flex flex-col items-end gap-3">
                  {/* Detail Button */}
                  <Button variant="outline" size="sm" className="w-full lg:w-auto" onClick={() => openOrderDetail(order)}>
                    <Eye className="h-4 w-4 mr-1" />
                    Chi tiết
                  </Button>

                  {/* Action Buttons */}
                  <div className="flex gap-2 w-full lg:w-auto">
                    {order.status === "pending" && (
                      <>
                        <Button variant="outline" size="sm" className="flex-1 lg:flex-none border-red-300 text-red-600 hover:bg-red-400 hover:border-red-400" onClick={() => openCancelModal(order)}>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Huỷ đơn
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 flex-1 lg:flex-none min-w-32">
                          Xác nhận đơn
                        </Button>
                      </>
                    )}
                    {order.status === "preparing" && (
                      <>
                        <Button variant="outline" size="sm" className="flex-1 lg:flex-none border-red-300 text-red-600 hover:bg-red-400 hover:border-red-400" onClick={() => openCancelModal(order)}>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Huỷ đơn
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 flex-1 lg:flex-none min-w-32">
                          Đã chuẩn bị xong
                        </Button>
                      </>
                    )}
                    {order.status === "ready" && (
                      <>
                        <Button variant="outline" size="sm" className="flex-1 lg:flex-none border-red-300 text-red-600 hover:bg-red-400 hover:border-red-400" onClick={() => openCancelModal(order)}>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Huỷ đơn
                        </Button>
                        <Button size="sm" className="bg-orange-400 hover:bg-orange-600 flex-1 lg:flex-none min-w-32">
                          Bàn giao cho shipper
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

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Trước
          </Button>
          <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
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
                  <p className="text-gray-600">{selectedOrder.id}</p>
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
                    <CardTitle className="text-lg">Thông tin khách hàng</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-gray-800">{selectedOrder.customer}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <p className="text-gray-800">{selectedOrder.phone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-gray-500" />
                      <p className="text-gray-800">{selectedOrder.address}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Products */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <CardTitle className="text-lg">Sản phẩm đặt hàng</CardTitle>
                        <span className="text-gray-500 text-sm">{selectedOrder.date}</span>
                      </div>
                      <div>
                        {getStatusBadge(selectedOrder.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedOrder.items.map((item: string, index: number) => (
                        <div key={index} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Package className="h-8 w-8 text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item}</h4>
                            <p className="text-sm text-gray-500">Số lượng: 1</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-600">
                              {(selectedOrder.total / selectedOrder.items.length).toLocaleString()}đ
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Payment Method */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-600">Phương thức thanh toán:</span>
                        <span className="font-semibold">{selectedOrder.payment}</span>
                      </div>
                    </div>

                    {/* Shipping & Savings */}
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Tiết kiệm:</span>
                        <span className="text-green-600 font-medium">-5,000đ</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Phí vận chuyển:</span>
                        <span className="font-medium">25,000đ</span>
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
                        {selectedOrder.total.toLocaleString()}đ
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-end">
                  <Button variant="outline" onClick={closeModal}>
                    Đóng
                  </Button>
                  {selectedOrder.status === "pending" && (
                    <Button className="bg-green-600 hover:bg-green-700">
                      Xác nhận đơn
                    </Button>
                  )}
                  {selectedOrder.status === "preparing" && (
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Đã chuẩn bị xong
                    </Button>
                  )}
                  {selectedOrder.status === "ready" && (
                    <Button className="bg-orange-400 hover:bg-orange-600">
                      Bàn giao cho shipper
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
            <div className="text-center mb-6">
              {/* Warning Icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Huỷ đơn hàng
              </h3>

              {/* Content */}
              <p className="text-sm text-gray-600">
                Bạn có chắc chắn muốn huỷ đơn hàng <strong>{orderToCancel.id}</strong> không?<br />
                Hành động này không thể hoàn tác.
              </p>
            </div>

            {/* Order Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Khách hàng:</span>
                  <span className="font-medium">{orderToCancel.customer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Số điện thoại:</span>
                  <span className="font-medium">{orderToCancel.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng tiền:</span>
                  <span className="font-medium text-green-600">{orderToCancel.total.toLocaleString()}đ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phương thức thanh toán:</span>
                  <span className="font-medium">{orderToCancel.payment}</span>
                </div>
              </div>
            </div>

            {/* Cancel Reason */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Lý do huỷ đơn hàng</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={cancelReason === "Khách hàng hủy" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCancelReason("Khách hàng hủy")}
                  className="text-xs"
                >
                  Khách hàng hủy
                </Button>
                <Button
                  variant={cancelReason === "Hết hàng" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCancelReason("Hết hàng")}
                  className="text-xs"
                >
                  Hết hàng
                </Button>
                <Button
                  variant={cancelReason === "Không liên lạc được" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCancelReason("Không liên lạc được")}
                  className="text-xs"
                >
                  Không liên lạc được
                </Button>
                <Button
                  variant={cancelReason === "Lý do khác" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCancelReason("Lý do khác")}
                  className="text-xs"
                >
                  Lý do khác
                </Button>
              </div>
            </div>

            {/* Cancellation Fee */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Chi phí huỷ đơn:</span>
                <span className="text-sm font-semibold text-red-600">25,000đ</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Trong vòng 12h, người bán được phép hủy đơn. Sau thời gian đó, doanh nghiệp phải chịu phí hủy đơn trừ lý hợp lệ.
              </p>
            </div>

            {/* Valid Reason Complaint */}
            <div className="flex items-center gap-2 mb-6">
              <Checkbox
                id="valid-complaint"
                checked={isValidComplaint}
                onCheckedChange={(checked) => setIsValidComplaint(checked === true)}
              />
              <label htmlFor="valid-complaint" className="text-sm text-gray-700">
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
