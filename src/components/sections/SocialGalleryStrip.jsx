import { useRef, useState, useEffect } from "react";

const SINGLE_IMAGES = [
  {
    src: "https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/488059494_1004129358516332_2656857826478316228_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=dd6889&_nc_eui2=AeFiW13GfJ1FbZE0OCReeK-wpagHpDoLAuKlqAekOgsC4tvW1_Md0VJ6-jVUTHdsvJ--BY3QUoPzMejj9Q6RDo-i&_nc_ohc=4Kdg41oPSokQ7kNvwEPb_AP&_nc_oc=Ado5VBDDu9Nco85H0gTVquoW3FgHadLXT4gb7H7VzdyamHE-58oIG4DIWTvlwvs8P0rOZ_ZayTR3Q-ZJmRx9wOfh&_nc_zt=23&_nc_ht=scontent.fsgn5-15.fna&_nc_gid=KJa1c_SBFZ9bIHH2LjgohA&_nc_ss=7a3a8&oh=00_Af0YqSJUUGOyMnMbB85NA6XJzRYD_2Xe6xg6AHgURMLIAQ&oe=69D89C01",
    alt: "HUSSIO street",
  },
  {
    src: "https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/487560703_1004131815182753_3535529638721132431_n.jpg?stp=dst-jpg_s552x414_tt6&_nc_cat=111&ccb=1-7&_nc_sid=dd6889&_nc_eui2=AeGr0DYKCizF_K8L_4pz8O5CK2-_3uXbUq0rb7_e5dtSraK0Vpfkd00DUe58UB7E1jZeEimdVCPYdW3Huet6luAI&_nc_ohc=qtHFSh_wvvEQ7kNvwHJfgvq&_nc_oc=AdqW0rqMz1iA9aXYQ1wE535bQiynI30OhH5XVIHpDBrdaZkoR9qCseAOtb_qUb4qXILVndF7qCmCprBWVzM-tkgV&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=Kg_v9poNIhMXvoIOLHMJnQ&_nc_ss=7a3a8&oh=00_Af0wYo41L58C9CzhmAzFC3jyhOMvZFJQ4Mf_o7A7U52NPg&oe=69D88E37",
    alt: "HUSSIO polo",
  },
  {
    src: "https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/487811372_1004131481849453_4336069177163218857_n.jpg?stp=dst-jpg_s552x414_tt6&_nc_cat=105&ccb=1-7&_nc_sid=dd6889&_nc_eui2=AeGRbzcfm7_0KE5owlnNg-sDJFiCzyJz45EkWILPInPjkY8csRIUmuLqGublfSXUPM7P2jyOnrlLmURwY8TYhpKa&_nc_ohc=gYofBjJjLgUQ7kNvwGx38wT&_nc_oc=AdoYvxdbvAw8QqugXZjfNwY_17fz34XTYecyFCZoBFyPkP_OoNEooH-FPG15Owv9crjCuOY1Yp6dTSG2KjbWKr6B&_nc_zt=23&_nc_ht=scontent.fsgn5-15.fna&_nc_gid=Kg_v9poNIhMXvoIOLHMJnQ&_nc_ss=7a3a8&oh=00_Af1WSoVbavbhWxjrPpBZ2w4i5zbQK3z_2Z2IIKc6I7KITg&oe=69D88642",
    alt: "HUSSIO quần tây",
  },
  {
    src: "https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/487542616_1004139551848646_7343455003092487210_n.jpg?stp=dst-jpg_s552x414_tt6&_nc_cat=104&ccb=1-7&_nc_sid=dd6889&_nc_eui2=AeH4FFcelLlIzWL9UPsZxLba7-UQGQ1_M2Tv5RAZDX8zZFgu8n9unJHC7IMJ7_1s77f_1zRxFm01PbLrLsoSvMA8&_nc_ohc=n0wUvIMinn8Q7kNvwH5iUte&_nc_oc=AdpmgZxcBFJHJWCt08Ab39y0H19GWOT4Hsi0PqhaOj_kAG3nGzc003b-VV8qHCbAK4IxJCjlT5i47UHgEHEZ9t9y&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=bw0beq9GaVJTV0K9XM8izQ&_nc_ss=7a3a8&oh=00_Af17IYsWEW8382YNWSpj2Q9AI-LWasC0D354FfgqewHgMQ&oe=69D880C4",
    alt: "HUSSIO áo thun",
  },
  {
    src: "https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/488553603_1004181698511098_2473411443931119331_n.jpg?stp=dst-jpg_s552x414_tt6&_nc_cat=101&ccb=1-7&_nc_sid=dd6889&_nc_eui2=AeGAqOsmQfcXWM3v7BGSdneBXUyJYnjRuwtdTIlieNG7C-qzcrF0vTuBtYPBZiqvROCxt_dbL-g9OvIiL6C0_OjV&_nc_ohc=-HZPkx0J074Q7kNvwFkcgRU&_nc_oc=Adr0deTgW6xN1IahaJuHomCo27cyvWrd-ck5gMK30U7cxvKVa0CRZr5IlwU5DFCmKYQA-hLR-48OA977TjeWAYPo&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=R8DjwnQUP11tT3xE_AsyfA&_nc_ss=7a3a8&oh=00_Af0FcdKxKmZQt5iF5UbxeCYH2-8nNIFrT0w1x4aUq13ZZw&oe=69D8A86C",
    alt: "HUSSIO phụ kiện",
  },
  {
    src: "https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/487495298_1004137008515567_34476904756356910_n.jpg?stp=dst-jpg_s552x414_tt6&_nc_cat=102&ccb=1-7&_nc_sid=dd6889&_nc_eui2=AeEgh28GlRk6KGWkOwix0VvZz9sYx7AjSGjP2xjHsCNIaJkFpZTT2MEqaWVTYQDjLOtaAG-fM7r175WEltzB7ZHV&_nc_ohc=IN27zEyT_j4Q7kNvwFOC0zx&_nc_oc=AdqnsZIm62VVF9xMdAt6NpPnxvIWZrqsitKCQKQc2zYHxDlitAV7IvEsOyCdZRIICwJhCl6tzuFoU-q-yrIaxoUa&_nc_zt=23&_nc_ht=scontent.fsgn5-15.fna&_nc_gid=Kg_v9poNIhMXvoIOLHMJnQ&_nc_ss=7a3a8&oh=00_Af1-2jsO4DY-xForVjc-UETotcgsmcXDFlETKwBt7tANdg&oe=69D8AFDE",
    alt: "HUSSIO phụ kiện",
  },
  {
    src: "https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/487701341_1004142905181644_1980025980045472563_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=dd6889&_nc_eui2=AeG4QzT22S4n9RKpuHh3DRmwKXWFKBgTUR0pdYUoGBNRHbVMZb8Ymo53BtOn_0BgzjtK6KWK82Zh3Bsp4olUSEGS&_nc_ohc=pGgnA8mDtg4Q7kNvwGGAo7N&_nc_oc=AdrgWitksLjxynPABo3kkP9O-aQHAk94RqvvwyuEq8C7BbmeMYZuL9sALJtZ78cBbKBsXdyTI4BClPnIwM68FPFS&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=3InGf60D6R5hIprRjyr8jw&_nc_ss=7a3a8&oh=00_Af0DvnUg4HPoBrSmSHwH8eVYqqIrkfMKxcYjZiRDgGu1_w&oe=69D88C41",
    alt: "HUSSIO phụ kiện",
  },
  {
    src: "https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/488059494_1004129358516332_2656857826478316228_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=dd6889&_nc_eui2=AeFiW13GfJ1FbZE0OCReeK-wpagHpDoLAuKlqAekOgsC4tvW1_Md0VJ6-jVUTHdsvJ--BY3QUoPzMejj9Q6RDo-i&_nc_ohc=4Kdg41oPSokQ7kNvwEPb_AP&_nc_oc=Ado5VBDDu9Nco85H0gTVquoW3FgHadLXT4gb7H7VzdyamHE-58oIG4DIWTvlwvs8P0rOZ_ZayTR3Q-ZJmRx9wOfh&_nc_zt=23&_nc_ht=scontent.fsgn5-15.fna&_nc_gid=ioQPbSCVwptJCjPjpQfIVA&_nc_ss=7a3a8&oh=00_Af3diInhhKElt5R56s9IZz8LJDxGzSGDFlh28xTKsLidZA&oe=69D89C01",
    alt: "HUSSIO phụ kiện",
  },
  {
    src: "https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/487922241_1004130788516189_1041229699430154832_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=dd6889&_nc_eui2=AeF2uHwrx0aoLG3hahLULFFsI1Vqais5FPYjVWpqKzkU9nMhSsluH_itsap7Z0kiQwZSj5wrCN4EBWwT9_a3Tx59&_nc_ohc=b7HWfvNfV9oQ7kNvwG72CgN&_nc_oc=AdqU0N3uTWc112QJ-d68d9Wk58AASkjYXTd7R65YfBQZLmxC82u8JuLLr11O2jeC7LKKao1TOW35MzrABPwAvjgJ&_nc_zt=23&_nc_ht=scontent.fsgn5-15.fna&_nc_gid=74h3oUywnOSMqrLYoFF7xQ&_nc_ss=7a3a8&oh=00_Af3Pr8V8YJWYM8XWPin9y07hzokHPTbWBfLhuBo2wpL5pw&oe=69D89522",
    alt: "HUSSIO phụ kiện",
  },
  {
    src: "https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/487811372_1004131481849453_4336069177163218857_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=dd6889&_nc_eui2=AeGRbzcfm7_0KE5owlnNg-sDJFiCzyJz45EkWILPInPjkY8csRIUmuLqGublfSXUPM7P2jyOnrlLmURwY8TYhpKa&_nc_ohc=gYofBjJjLgUQ7kNvwGx38wT&_nc_oc=AdoYvxdbvAw8QqugXZjfNwY_17fz34XTYecyFCZoBFyPkP_OoNEooH-FPG15Owv9crjCuOY1Yp6dTSG2KjbWKr6B&_nc_zt=23&_nc_ht=scontent.fsgn5-15.fna&_nc_gid=XtjSn6_SXBeM2SUjn42ljw&_nc_ss=7a3a8&oh=00_Af1dJ7MmOImzQsPLeX4w5QfBktFrvH5Y8Ll0KcD0sq5zng&oe=69D88642",
    alt: "HUSSIO phụ kiện",
  },
  {
    src: "https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/487560703_1004131815182753_3535529638721132431_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=dd6889&_nc_eui2=AeGr0DYKCizF_K8L_4pz8O5CK2-_3uXbUq0rb7_e5dtSraK0Vpfkd00DUe58UB7E1jZeEimdVCPYdW3Huet6luAI&_nc_ohc=qtHFSh_wvvEQ7kNvwHJfgvq&_nc_oc=AdqW0rqMz1iA9aXYQ1wE535bQiynI30OhH5XVIHpDBrdaZkoR9qCseAOtb_qUb4qXILVndF7qCmCprBWVzM-tkgV&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=vxmlEKWG9liTVV9ZkuSKaA&_nc_ss=7a3a8&oh=00_Af2wnQUpEL_tgJSue0z-xgWmftPYbyI93M4f5H0kTsyWaQ&oe=69D88E37",
    alt: "HUSSIO phụ kiện",
  },
  {
    src: "https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/487605291_1004133781849223_4237788673015372282_n.jpg?stp=dst-jpg_s552x414_tt6&_nc_cat=109&ccb=1-7&_nc_sid=dd6889&_nc_eui2=AeGlq3qvGdad1erD3Fs_m9AXRA08QI1m_7xEDTxAjWb_vGq8keS7BBUScc7wNH026HGA8v-D0UXXBypeEh18chvO&_nc_ohc=Zyoo4vDwHz4Q7kNvwGkgiW_&_nc_oc=AdrrSnh-Dsbmq0TCyf-e98LMrEtjAtk9bRNCmI6IQW0OagECW7mJewielOwKewoxff3zpcscinUL09bZY_08CLHI&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=Kg_v9poNIhMXvoIOLHMJnQ&_nc_ss=7a3a8&oh=00_Af3St_5Kgw5CqIgZUBJVG8WXAErFWV5y-DwYvEXg2bXTnA&oe=69D8A866",
    alt: "HUSSIO phụ kiện",
  },
];

export function SocialGalleryStrip() {
  const scrollRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scrollBy = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const step = Math.min(el.clientWidth * 0.75, 400);
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <h2 className="font-sans text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl md:text-3xl">
          #hussiolife with{" "}
          <span className="font-bold text-neutral-500">@hussiostore</span>
        </h2>
      </div>

      <div className="relative mt-8 lg:mt-10">
        <button
          type="button"
          onClick={() => scrollBy("left")}
          disabled={!canLeft}
          aria-label="Xem ảnh trước"
          className="absolute left-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/90 text-neutral-800 shadow-md backdrop-blur-sm transition hover:bg-white disabled:pointer-events-none disabled:opacity-25 pointer-fine:flex sm:left-4 sm:h-12 sm:w-12 lg:left-6"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scrollBy("right")}
          disabled={!canRight}
          aria-label="Xem ảnh sau"
          className="absolute right-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/90 text-neutral-800 shadow-md backdrop-blur-sm transition hover:bg-white disabled:pointer-events-none disabled:opacity-25 pointer-fine:flex sm:right-4 sm:h-12 sm:w-12 lg:right-6"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto px-[max(1rem,env(safe-area-inset-left,0px))] pb-2 pt-1 sm:gap-4 lg:gap-5 lg:px-12 lg:pr-[max(3rem,env(safe-area-inset-right,0px))] lg:pl-[max(3rem,env(safe-area-inset-left,0px))]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          {SINGLE_IMAGES.map((item, index) => (
            <div
              key={`${index}-${item.src.slice(-40)}`}
              className="relative aspect-3/4 w-[min(72vw,240px)] shrink-0 snap-start overflow-hidden rounded-xl bg-neutral-100 sm:w-[260px] lg:w-[280px]"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
