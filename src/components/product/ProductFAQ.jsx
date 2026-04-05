import { useState } from "react";

const faqData = [
  {
    question: "Chất liệu áo có bị nóng khi mặc ngoài trời không?",
    answer: "Tuyệt đối không. Áo được làm từ 95% Cotton Pique cao cấp với cấu trúc dệt lỗ thoáng khí, giúp thấm hút mồ hôi cực tốt. Bạn sẽ luôn cảm thấy mát mẻ và khô thoáng kể cả khi hoạt động dưới trời nắng.",
  },
  {
    question: "Áo có bị xù lông hay phai màu sau khi giặt máy không?",
    answer: "Hussio sử dụng công nghệ nhuộm màu hoạt tính và xử lý sợi vải chuyên sâu, giúp áo giữ màu cực tốt và không bị xù lông sau nhiều lần giặt. Tuy nhiên, chúng tôi khuyên bạn nên lộn trái áo và giặt ở chế độ nhẹ để bảo quản sản phẩm tốt nhất.",
  },
  {
    question: "Tôi nên chọn size nào để mặc vừa vặn nhất?",
    answer: "Áo có form Regular Fit truyền thống, không quá bó sát cũng không quá rộng. Bạn có thể tham khảo bảng size chi tiết của chúng tôi. Nếu bạn thích mặc thoải mái hoặc có bụng, có thể cân nhắc tăng lên 1 size.",
  },
  {
    question: "Chính sách đổi hàng của Hussio như thế nào?",
    answer: "Hussio hỗ trợ đổi size hoặc đổi mẫu khác trong vòng 7 ngày kể từ khi nhận hàng. Sản phẩm đổi phải còn nguyên tem mác, chưa qua sử dụng và giặt là. Vui lòng liên hệ hotline hoặc nhắn tin cho fanpage để được hỗ trợ nhanh nhất.",
  },
];

export function ProductFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-neutral-50 py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-light text-neutral-900 md:text-5xl">
            Câu hỏi thường gặp
          </h2>
          <p className="mt-4 text-neutral-500">
            Mọi thắc mắc của bạn về sản phẩm Áo Polo Tết Hussio đều được giải đáp tại đây.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className="overflow-hidden rounded-2xl border border-neutral-200 bg-white"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="text-sm font-bold text-neutral-900">
                  {faq.question}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`text-neutral-400 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-[300px] border-t border-neutral-100 p-6" : "max-h-0"
                }`}
              >
                <p className="text-sm leading-relaxed text-neutral-600">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
