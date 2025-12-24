export interface Order {
  id: string;
  customerName: string;
  products: number;
  total: string;
  status: "Chờ xử lý" | "Đang giao" | "Hoàn thành" | "Đã hủy";
  date: string;
}

 const recentOrders: Order[] = [
  {
    id: "#DH001234",
    customerName: "Nguyễn Văn An",
    products: 3,
    total: "245,000 đ",
    status: "Chờ xử lý",
    date: "24/12/2025 10:30",
  },
  {
    id: "#DH001233",
    customerName: "Trần Thị Bình",
    products: 2,
    total: "180,000 đ",
    status: "Đang giao",
    date: "24/12/2025 09:15",
  },
  {
    id: "#DH001232",
    customerName: "Lê Minh Châu",
    products: 5,
    total: "520,000 đ",
    status: "Hoàn thành",
    date: "23/12/2025 18:45",
  },
  {
    id: "#DH001231",
    customerName: "Phạm Quang Dũng",
    products: 1,
    total: "120,000 đ",
    status: "Hoàn thành",
    date: "23/12/2025 16:20",
  },
  {
    id: "#DH001230",
    customerName: "Hoàng Mai Linh",
    products: 4,
    total: "390,000 đ",
    status: "Đã hủy",
    date: "23/12/2025 14:00",
  },
];


const statusColors = {
  "Chờ xử lý": "bg-yellow-100 text-yellow-700",
  "Đang giao": "bg-blue-100 text-blue-700",
  "Hoàn thành": "bg-green-100 text-green-700",
  "Đã hủy": "bg-red-100 text-red-700",
};

export function RecentOrders() {
  return (
    <div className="">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-['Alexandria:Bold',sans-serif] text-[18px] text-gray-900 mb-1">
            Đơn hàng gần đây
          </h3>
          <p className="font-['Alexandria:Regular',sans-serif] text-[13px] text-gray-500">
            Danh sách đơn hàng mới nhất
          </p>
        </div>
        <button className="px-4 py-2 text-[#00b143] font-['Alexandria:Medium',sans-serif] text-[13px] hover:bg-green-50 rounded-lg transition-colors">
          Xem tất cả
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-['Alexandria:Medium',sans-serif] text-[13px] text-gray-600">
                Mã đơn
              </th>
              <th className="text-left py-3 px-4 font-['Alexandria:Medium',sans-serif] text-[13px] text-gray-600">
                Khách hàng
              </th>
              <th className="text-left py-3 px-4 font-['Alexandria:Medium',sans-serif] text-[13px] text-gray-600">
                Số SP
              </th>
              <th className="text-left py-3 px-4 font-['Alexandria:Medium',sans-serif] text-[13px] text-gray-600">
                Tổng tiền
              </th>
              <th className="text-left py-3 px-4 font-['Alexandria:Medium',sans-serif] text-[13px] text-gray-600">
                Trạng thái
              </th>
              <th className="text-left py-3 px-4 font-['Alexandria:Medium',sans-serif] text-[13px] text-gray-600">
                Thời gian
              </th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-4">
                  <span className="font-['Alexandria:Medium',sans-serif] text-[13px] text-gray-900">
                    {order.id}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="font-['Alexandria:Regular',sans-serif] text-[13px] text-gray-700">
                    {order.customerName}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="font-['Alexandria:Regular',sans-serif] text-[13px] text-gray-700">
                    {order.products}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="font-['Alexandria:Medium',sans-serif] text-[13px] text-gray-900">
                    {order.total}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full font-['Alexandria:Medium',sans-serif] text-[12px] ${
                      statusColors[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="font-['Alexandria:Regular',sans-serif] text-[12px] text-gray-500">
                    {order.date}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
