import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-lime-400/15 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.08),transparent_45%),radial-gradient(circle_at_80%_40%,rgba(255,255,255,0.06),transparent_50%),radial-gradient(circle_at_40%_90%,rgba(255,255,255,0.05),transparent_55%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2">
          {/* Left */}
          <section>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Farm Fresh • 404
            </div>

            <h1 className="mt-6 text-5xl font-extrabold tracking-tight sm:text-6xl">
              Trang không tồn tại
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
              Trang bạn đang tìm kiếm có thể đã được di chuyển, đổi địa chỉ, hoặc không còn khả dụng
              trên Farm Fresh. Vui lòng quay về trang chủ hoặc tiếp tục duyệt sản phẩm.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-400 to-lime-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-emerald-300/60"
              >
                Trở về trang chủ
                <span className="ml-2 transition group-hover:translate-x-0.5">→</span>
              </Link>

              {/* Đổi href này theo route thực tế của bạn (ví dụ: /products hoặc /shop) */}
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 backdrop-blur transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                Xem danh mục sản phẩm
              </Link>
            </div>

            <div className="mt-10 text-xs text-slate-400">
              Mã lỗi: <span className="font-mono text-slate-300">404</span>
            </div>
          </section>

          {/* Right */}
          <section className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-slate-200">Farm Fresh</div>
                    <div className="mt-1 text-xs text-slate-400">
                      Không tìm thấy nội dung theo đường dẫn hiện tại.
                    </div>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-200">
                    404 Not Found
                  </div>
                </div>

                <div className="mt-8 grid place-items-center">
                  <div className="relative">
                    <div className="absolute -inset-8 rounded-full bg-emerald-400/10 blur-3xl" />
                    <div className="relative grid h-56 w-56 place-items-center rounded-3xl border border-white/10 bg-slate-900/40">
                      {/* Simple icon */}
                      <svg
                        className="h-20 w-20 text-slate-200/90"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M10 18a8 8 0 1 1 5.293-14.01A8 8 0 0 1 10 18Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M21 21l-4.35-4.35"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M7.5 9.5h5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>

                      <div className="mt-2 text-center">
                        <div className="text-sm font-semibold text-slate-200">Không có kết quả</div>
                        <div className="mt-1 text-xs text-slate-400">
                          Vui lòng kiểm tra lại đường dẫn.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-xl border border-white/10 bg-slate-950/40 p-4 font-mono text-xs text-slate-300">
                  <div className="text-slate-400">system</div>
                  <div className="mt-2">
                    <span className="text-emerald-300">status</span>: 404
                    <br />
                    <span className="text-cyan-300">message</span>: The requested page was not
                    found.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center text-xs text-slate-400">
              Nếu bạn truy cập từ một liên kết trong hệ thống, vui lòng cập nhật liên kết hoặc điều
              hướng lại từ trang chủ.
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
