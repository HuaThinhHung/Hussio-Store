import { useState } from "react";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "Chính sách đổi trả như thế nào?",
    answer: "HUSSIO hỗ trợ đổi trả trong vòng 30 ngày kể từ ngày nhận hàng. Sản phẩm đổi trả phải còn nguyên tem mác, chưa qua sử dụng và còn trong tình trạng ban đầu. Quý khách vui lòng liên hệ hotline 1800.xxxx để được hướng dẫn.",
  },
  {
    question: "Thời gian giao hàng bao lâu?",
    answer: "Đơn hàng nội thành TP.HCM và Hà Nội sẽ được giao trong 1-2 ngày. Các tỉnh thành khác: 3-5 ngày. Đơn hàng từ 2.000.000₫ được miễn phí vận chuyển toàn quốc.",
  },
  {
    question: "Làm sao để chọn size phù hợp?",
    answer: "Bạn có thể tham khảo bảng size chi tiết trong trang sản phẩm hoặc đo trực tiếp các số đo cơ thể và đối chiếu với bảng size của chúng tôi. Đội ngũ tư vấn luôn sẵn sàng hỗ trợ qua hotline.",
  },
  {
    question: "HUSSIO có cửa hàng trực tiếp không?",
    answer: "Hiện tại HUSSIO có hệ thống cửa hàng tại TP.HCM, Hà Nội và Đà Nẵng. Bạn có thể đến trực tiếp để thử và chọn sản phẩm ưng ý nhất.",
  },
  {
    question: "Có hỗ trợ thanh toán qua thẻ không?",
    answer: "HUSSIO chấp nhận thanh toán qua: Tiền mặt, Chuyển khoản, Thẻ ATM nội địa, Thẻ Visa/Mastercard, Ví điện tử (Momo, ZaloPay, VNPay) và Trả góp 0% qua thẻ tín dụng.",
  },
];

function IconPlus(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
    </svg>
  );
}

function IconMinus(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
    </svg>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-neutral-50 py-20">
      <div className="mx-auto max-w-[800px] px-5 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            Câu hỏi thường gặp
          </h2>
          <p className="mt-3 text-neutral-500">
            Giải đáp những thắc mắc của bạn về HUSSIO
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl bg-white shadow-sm"
            >
              <button
                className="flex w-full items-center justify-between p-5 text-left transition hover:bg-neutral-50"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="pr-4 font-medium text-neutral-900">
                  {faq.question}
                </span>
                <span className={`shrink-0 rounded-full p-1 transition-colors ${openIndex === index ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-500"}`}>
                  {openIndex === index ? (
                    <IconMinus className="h-4 w-4" />
                  ) : (
                    <IconPlus className="h-4 w-4" />
                  )}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-96" : "max-h-0"}`}
              >
                <p className="px-5 pb-5 text-sm leading-relaxed text-neutral-600">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-neutral-500">
            Không tìm thấy câu trả lời?{" "}
            <Link to="/contact" className="font-semibold text-neutral-900 underline">
              Liên hệ hỗ trợ
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
