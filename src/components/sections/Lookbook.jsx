import { Link } from "react-router-dom";

const images = [
  {
    src: "/images/mega-menu/tet.png",
    label: "BST Tết 2026",
    span: "row-span-2",
  },
  {
    src: "https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/630570155_1250574787205120_4568184214848731373_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeGKdYUymeqd-WHW8K4F1BkhY8XWe19L_6ZjxdZ7X0v_pnb4Wqe1obmAo8xzZ0Ah9wak5FQoD6xsDa-hrnuz6ZUa&_nc_ohc=FXon330otq0Q7kNvwE86una&_nc_oc=AdotPZTNfpbN3cKpB4BooKZKU_oPvLtvaUvjKZx6hbxz4zE0CQ7i99SQFvmyFkgrj_8F-zn5ixnpjLEbKa5PoquB&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=Fplc5Qgv3J09OtBij3KnCw&_nc_ss=7a3a8&oh=00_Af2gEOjox4NVwSF2Hyjy4ELzGtMid0yjLsI5XEKXMUQCqA&oe=69D88B24",
    label: "Minimal Luxe",
    span: "",
  },
  {
    src: "https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/631661407_1250574823871783_3797770245923946988_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeFSo5T3UWMlb_vZQQ_Pu93DjqYqy4kWuoqOpirLiRa6inHCFZ2ebQY23VxGZJtKXnKZhEh8PiRcJM3NgJM1YZKq&_nc_ohc=i4VNTTPQUJ8Q7kNvwExqjwE&_nc_oc=AdorbBS3zAvoXn7cKAyA9cTWpmc5eHJqrjqP-Tl-5AVFxSc9naGYgokh32qfrrL-2ji8tfhtceLFvtgp-LtsdCNv&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=0MYDbQdbMgvIp2Tvyw8_jg&_nc_ss=7a3a8&oh=00_Af2Q07SqkGwtuEUbquMFoKUybQHyiYo5RxPiUlzVcbKptg&oe=69D88E6E",
    label: "Urban Style",
    span: "",
  },
  {
    src: "https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/629661628_1250574880538444_5687902432743434045_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeH633oCGGMFLvt8pQOmlX8iVdn8v71lJo1V2fy_vWUmjcLaYLkdmngNm6M3cO6gy8-lPbRJXeAAmfS7iVE5uQPf&_nc_ohc=oS5rmOf-20IQ7kNvwEGswWV&_nc_oc=AdoegfMsUVXvlWpFNhMu2ETUpyZ-CDjEGKpIdRZ28hyEfanbb9hCD2KMy3u928A0Q5PEFthAUexCKLLC9fS6zdfr&_nc_zt=23&_nc_ht=scontent.fsgn5-15.fna&_nc_gid=nIjyeAkLR6RfYbRbtIDT-Q&_nc_ss=7a3a8&oh=00_Af0qQKPBLDsUL3pTywPF5bVJ7CDAkXHp2PShG2qHMU6k4A&oe=69D874AD",
    label: "Premium Cotton",
    span: "row-span-2 col-span-2",
  },
  {
    src: "https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/635148703_1252209733708292_7119516201003221940_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeHLvuqOsPrrITVn0tyTYd5b7H74rLWsqpnsfvistayqmZLHMtW74rEZvl5FitO5_vIMvlpnh7MMtl0jwc4t30Q3&_nc_ohc=tlPP2Ws2jD8Q7kNvwGBuJth&_nc_oc=Adp7DbYa-Mv428go_w-8CMhdWnEsjLpwb924fnOoHMHY0utZCOUoTBHgS8EZaornjjeo3CKmZPvFjMk5amV3kRWb&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=iv6_gQ_MzdIEa_vc0sQLYA&_nc_ss=7a3a8&oh=00_Af3Thl9zLSbj7mNuuX3SUZTvQrq1rI-GBDFTD5f3W8sWKw&oe=69D8A769",
    label: "Accessories",
    span: "",
  },
  {
    src: "https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/629227167_1250651837197415_2388318557996556162_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeHZ6PW7R9uOkvV3U0iTxFXlpxZP_FuKnZunFk_8W4qdm0rc2zmQms3GTVYhFcE9zeQUhaMirP6MrWEC6OqtxPEy&_nc_ohc=mqhlzz3i8fYQ7kNvwHZi2OY&_nc_oc=AdphPMj0tYqtw5omEYVjB1omMfIk_DdLP7EJ8WynfF9udErv7tyjiFAEbM8RB4SHOTnoO9PDX0igWMKHpUlFx0pO&_nc_zt=23&_nc_ht=scontent.fsgn5-15.fna&_nc_gid=p9sFSZ0YibXqTDabJADB_A&_nc_ss=7a3a8&oh=00_Af0p0S7sHRoGkURsdLioT2nzAysGaFU0DW7kdUaMW-vhoA&oe=69D88F8C",
    label: "Streetwear",
    span: "",
  },
];

export function Lookbook() {
  return (
    <section className="bg-neutral-50 py-24 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="mb-14 flex flex-col items-center text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-neutral-400">
            #HUSSIO
          </span>
          <h2 className="mt-4 font-serif text-4xl font-light text-neutral-900 md:text-5xl lg:text-6xl">
            Cảm hứng phong cách
          </h2>
          <p className="mt-5 max-w-md text-sm text-neutral-500">
            Khám phá bộ sưu tập ảnh thực tế từ cộng đồng HUSSIO.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {images.map((img, index) => (
            <div
              key={index}
              className={`group/lookbook relative overflow-hidden rounded-2xl bg-neutral-200 ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.label}
                className="h-full w-full object-cover transition-transform duration-1000 group-hover/lookbook:scale-110"
                style={
                  img.span.includes("row-span-2") ? { gridRow: "span 2" } : {}
                }
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/lookbook:opacity-100" />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-4 opacity-0 transition-opacity duration-500 group-hover/lookbook:opacity-100">
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-white sm:text-xs">
                  {img.label}
                </span>
                <div className="mt-2 h-[2px] w-6 bg-white transition-all duration-300 group-hover/lookbook:w-12" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center sm:gap-6">
          <Link
            to="/products"
            className="rounded-full border border-neutral-300 px-10 py-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-900 transition-all hover:border-neutral-900 hover:bg-neutral-900 hover:text-white active:scale-95"
          >
            Mua trọn bộ sưu tập
          </Link>
          <a
            href="#"
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500 transition-all hover:text-neutral-900"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span>Theo dõi @HUSSIO</span>
          </a>
        </div>
      </div>
    </section>
  );
}
