import { useState } from "react";

const accordionData = [
  {
    id: "details",
    title: "Chi tiết sản phẩm",
    content: (
      <div className="space-y-4">
        <p>Áo Polo Tết Hussio là sự kết hợp hoàn hảo giữa nét truyền thống và phong cách hiện đại. Với thiết kế tinh tế, tỉ mỉ trong từng đường kim mũi chỉ, đây là lựa chọn hàng đầu cho phái mạnh trong dịp lễ hội đầu năm.</p>
        <ul className="list-inside list-disc space-y-2">
          <li>Kiểu dáng: Regular Fit thoải mái nhưng vẫn tôn dáng</li>
          <li>Cổ áo bo thun tinh tế, không bị giãn sau nhiều lần giặt</li>
          <li>Logo Hussio thêu nổi sang trọng bên ngực trái</li>
          <li>Đường xẻ tà nhẹ nhàng, tạo sự linh hoạt khi di chuyển</li>
        </ul>
      </div>
    ),
  },
  {
    id: "material",
    title: "Chất liệu",
    content: (
      <div className="space-y-4">
        <p>Chúng tôi sử dụng dòng vải Cotton Pique cao cấp được xử lý đặc biệt để mang lại trải nghiệm tốt nhất:</p>
        <ul className="list-inside list-disc space-y-2">
          <li>95% Cotton tự nhiên: Thấm hút mồ hôi vượt trội, thoáng khí tối đa</li>
          <li>5% Spandex: Tạo độ co giãn 4 chiều, giữ form áo luôn như mới</li>
          <li>Công nghệ Cool-Touch: Cảm giác mát lạnh ngay khi chạm vào da</li>
          <li>Màu nhuộm an toàn, bền màu theo thời gian</li>
        </ul>
      </div>
    ),
  },
  {
    id: "care",
    title: "Hướng dẫn bảo quản",
    content: (
      <ul className="list-inside list-disc space-y-2">
        <li>Giặt máy ở chế độ nhẹ với nước lạnh hoặc ấm dưới 40°C</li>
        <li>Không sử dụng thuốc tẩy hoặc chất tẩy rửa mạnh</li>
        <li>Lộn trái áo khi giặt và phơi để giữ màu tốt hơn</li>
        <li>Ủi ở nhiệt độ trung bình, tránh ủi trực tiếp lên hình thêu/in</li>
        <li>Nên phơi trong bóng râm, tránh ánh nắng gắt trực tiếp</li>
      </ul>
    ),
  },
  {
    id: "shipping",
    title: "Chính sách giao hàng",
    content: (
      <ul className="list-inside list-disc space-y-2">
        <li>Giao hàng nhanh toàn quốc từ 2-4 ngày làm việc</li>
        <li>Miễn phí vận chuyển cho đơn hàng từ 500.000 VNĐ</li>
        <li>Kiểm tra hàng thoải mái trước khi thanh toán (Ship COD)</li>
        <li>Hỗ trợ đổi size trong vòng 7 ngày nếu không vừa</li>
      </ul>
    ),
  },
];

export function ProductAccordion() {
  const [openId, setOpenId] = useState("details");

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="divide-y divide-neutral-200 border-y border-neutral-200">
      {accordionData.map((item) => (
        <div key={item.id} className="py-2">
          <button
            onClick={() => toggle(item.id)}
            className="flex w-full items-center justify-between py-4 text-left transition-all"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-neutral-900">
              {item.title}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className={`text-neutral-400 transition-transform duration-300 ${openId === item.id ? "rotate-180" : ""}`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openId === item.id ? "max-h-[500px] pb-6" : "max-h-0"
            }`}
          >
            <div className="text-sm leading-relaxed text-neutral-600">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
