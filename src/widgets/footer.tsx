export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter */}
        <div className="border-b border-success-foreground/20 pb-8 mb-8">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold mb-2">
              Đăng ký nhận thông tin khuyến mãi
            </h3>
            <p className="text-sm mb-4 opacity-90">
              Nhận ngay mã giảm giá và thông báo đặc biệt qua email
            </p>
            <div className="flex gap-2 flex-wrap">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 px-4 py-2 rounded-lg text-foreground"
              />
              <button className="px-6 py-2 bg-success-foreground text-success rounded-lg font-medium hover:opacity-90 transition-opacity">
                Đăng ký
              </button>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4">Công ty TNHH Farm Fresher</h4>
            <p className="text-sm opacity-90 mb-4">
              Kết nối người mua và người bán nông sản, đảm bảo chất lượng, tiện
              lợi và giá cả hợp lý
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="opacity-90 hover:opacity-100">
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a href="#" className="opacity-90 hover:opacity-100">
                  Cách thức hoạt động
                </a>
              </li>
              <li>
                <a href="#" className="opacity-90 hover:opacity-100">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="opacity-90 hover:opacity-100">
                  Chính sách vận chuyển
                </a>
              </li>
              <li>
                <a href="#" className="opacity-90 hover:opacity-100">
                  Chính sách đổi trả
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Danh mục sản phẩm</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="opacity-90 hover:opacity-100">
                  Trái cây tươi
                </a>
              </li>
              <li>
                <a href="#" className="opacity-90 hover:opacity-100">
                  Rau củ quả
                </a>
              </li>
              <li>
                <a href="#" className="opacity-90 hover:opacity-100">
                  Gạo & Ngũ cốc
                </a>
              </li>
              <li>
                <a href="#" className="opacity-90 hover:opacity-100">
                  Sản phẩm hữu cơ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Liên hệ</h4>
            <ul className="space-y-2 text-sm">
              <li className="opacity-90">123 Đường AB, Phường Cát Lái,</li>
              <li className="opacity-90">TP. Hồ Chí Minh</li>
              <li className="opacity-90 mt-4">1900 123 456</li>
              <li className="opacity-90">support@farmfresh.vn</li>
              <li className="opacity-90 mt-4">Thứ 2 - Chủ nhật</li>
              <li className="opacity-90">6:00 - 22:00</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-success-foreground/20 pt-8 text-center">
          <p className="text-sm opacity-90 mb-2">Chứng nhận bởi</p>
          <p className="text-sm font-medium mb-4">
            2025 FarmFresh. Tất cả quyền được bảo lưu
          </p>
          <p className="text-xs opacity-75">
            Nền tảng kết nối nông sản Việt - Tươi ngon từ nông trại đến bàn ăn
          </p>
        </div>
      </div>
    </footer>
  );
};
