import { Link } from "react-router-dom";

export function BrandStory() {
  return (
    <section className="bg-white py-24 lg:py-36">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:gap-24">
          {/* Hình ảnh */}
          <div className="w-full lg:w-1/2">
            <div className="relative overflow-hidden rounded-3xl bg-neutral-100">
              <img
                src="https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/641084185_1261760979419834_7027115287485158097_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeGUDl1ij-oIJKnzitPyMJM9OCqUiRnO7g44KpSJGc7uDnyGfgeL9Zm2hnrmDV5VPktydIJcdXptMBfG8_LWJX7J&_nc_ohc=NEwQwoekIb4Q7kNvwG0RyjT&_nc_oc=AdrzztLQWQMYHNUHztt1ts2zawcKBF6ztvH1QLthhtaTocTjTHqGGVamVAXo7YJv9Psb8Sh_fzN2ZHqJV3j0rgeJ&_nc_zt=23&_nc_ht=scontent.fsgn5-15.fna&_nc_gid=2IyvfF5ucqeP7U00DZkzOA&_nc_ss=7a3a8&oh=00_Af3HVEv1geNLNBS4IzaLB27AHNZSWXC-lntYrdqS4EtGAA&oe=69D87907"
                alt="HUSSIO Crafters"
                className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
              />
              {/* Badge overlay */}
              <div className="absolute bottom-6 right-6 rounded-2xl bg-white/95 px-5 py-4 shadow-lg backdrop-blur-sm">
                <p className="font-serif text-3xl font-light text-neutral-900">
                  5+
                </p>
                <p className="mt-0.5 font-sans text-[10px] uppercase tracking-widest text-neutral-500">
                  Năm kinh nghiệm
                </p>
              </div>
            </div>
          </div>

          {/* Nội dung */}
          <div className="w-full text-center lg:w-1/2 lg:text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400">
              Câu chuyện thương hiệu
            </span>
            <h2 className="mt-8 font-serif text-4xl font-light leading-tight text-neutral-900 md:text-5xl lg:text-6xl">
              Kiến tạo phong cách
              <br />
              Bản lĩnh phái mạnh
            </h2>
            <p className="mt-10 text-base leading-relaxed text-neutral-600 lg:text-lg">
              Tại HUSSIO, chúng tôi không chỉ tạo ra trang phục, chúng tôi kiến
              tạo một lối sống. Mỗi sản phẩm là kết quả của sự tỉ mỉ trong từng
              đường kim mũi chỉ, sự chọn lọc khắt khe về chất liệu và sự thấu
              hiểu sâu sắc về nhu cầu của người đàn ông hiện đại.
            </p>
            <p className="mt-6 text-base leading-relaxed text-neutral-600 lg:text-lg">
              Chúng tôi tin rằng, trang phục chính là ngôn ngữ không lời mạnh mẽ
              nhất để khẳng định bản sắc cá nhân. Hãy để HUSSIO đồng hành cùng
              bạn trong hành trình chinh phục những đỉnh cao mới.
            </p>

            {/* Stats row */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-neutral-100 pt-10">
              {[
                { value: "5.000+", label: "Khách hàng" },
                { value: "32+", label: "BST mỗi năm" },
                { value: "4.9/5", label: "Đánh giá TB" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="font-serif text-2xl font-light text-neutral-900 md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 font-sans text-xs uppercase tracking-widest text-neutral-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                to="/products"
                className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-900 transition-all hover:gap-5"
              >
                <span>Khám phá HUSSIO</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
