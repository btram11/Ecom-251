import NavBar from "@/components/Navbar";
export default function SearchPage() {
    return (
        <div className="min-h-screen bg-gray-100 w-11/12 max-auto">
            <NavBar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <h1 className="text-2xl font-semibold mb-6">Kết quả tìm kiếm</h1>
                <p>Hiện chưa có sản phẩm nào trong mục tìm kiếm.</p>
            </main>     
        </div>
    );
}   