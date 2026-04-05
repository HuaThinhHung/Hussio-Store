import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ProductGallery } from "../components/product/ProductGallery";
import { ProductInfo } from "../components/product/ProductInfo";
import { ProductAccordion } from "../components/product/ProductAccordion";
import { ProductBenefits } from "../components/product/ProductBenefits";
import { ProductStats } from "../components/product/ProductStats";
import { ProductFAQ } from "../components/product/ProductFAQ";
import { RelatedProducts } from "../components/product/RelatedProducts";
import { useCart } from "../context/CartContext";
import { productService } from "../services/productService";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  /** false = luôn hiện ảnh chính `image`; true = đổi ảnh theo màu (colorImages) */
  const [galleryFollowsColor, setGalleryFollowsColor] = useState(false);

  const colors = useMemo(() => {
    if (!product) return [];
    return product.colors?.length ? product.colors : ["Mặc định"];
  }, [product]);

  const galleryImages = useMemo(() => {
    if (!product) return [];
    const seen = new Set();
    const result = [];
    const add = (url) => {
      if (url && !seen.has(url)) {
        seen.add(url);
        result.push(url);
      }
    };
    product.images?.forEach(add);
    Object.values(product.colorImages || {}).forEach(add);
    const main = product.image || product.images?.[0] || "";
    if (main && !seen.has(main)) {
      result.unshift(main);
    }
    return result;
  }, [product]);

  const mainHeroSrc = useMemo(() => {
    if (!product) return "";
    return (
      product.image ||
      product.images?.[0] ||
      galleryImages[0] ||
      ""
    );
  }, [product, galleryImages]);

  const activeGallerySrc = useMemo(() => {
    if (!product) return "";
    if (
      galleryFollowsColor &&
      selectedColor &&
      product.colorImages?.[selectedColor]
    ) {
      return product.colorImages[selectedColor];
    }
    return mainHeroSrc;
  }, [product, galleryFollowsColor, selectedColor, mainHeroSrc]);

  useEffect(() => {
    if (!product || colors.length === 0) return;
    setSelectedColor((prev) =>
      prev && colors.includes(prev) ? prev : colors[0],
    );
  }, [product?.id, colors]);

  useEffect(() => {
    setGalleryFollowsColor(false);
  }, [product?.id]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        setProduct(data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="bg-white font-sans text-neutral-900 antialiased">
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="flex text-xs font-medium uppercase tracking-widest text-neutral-400">
          <Link to="/" className="hover:text-neutral-900">Trang chủ</Link>
          <span className="mx-2">/</span>
          <span className="hover:text-neutral-900 cursor-pointer">{product.category}</span>
          <span className="mx-2">/</span>
          <span className="text-neutral-900">{product.name}</span>
        </nav>
      </div>

      {/* Product Hero Section */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <ProductGallery
            images={galleryImages.length > 0 ? galleryImages : product.images || []}
            activeSrc={activeGallerySrc}
          />
          <div className="flex flex-col gap-12">
            <ProductInfo
              product={product}
              selectedColor={selectedColor}
              onColorChange={(c) => {
                setSelectedColor(c);
                setGalleryFollowsColor(true);
              }}
              onAddToCart={async (qty, sz, clr) => {
                await addToCart(product, qty, sz, clr);
              }}
              onBuyNow={async (qty, sz, clr) => {
                await addToCart(product, qty, sz, clr);
                navigate("/cart");
              }}
            />
            <ProductAccordion />
          </div>
        </div>
      </section>

      {/* Product Description Block */}
      <section className="border-t border-neutral-100 bg-white py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400">
            Phong cách Tết Việt
          </span>
          <h2 className="mt-6 font-serif text-4xl font-light leading-tight text-neutral-900 md:text-6xl">
            Lịch lãm và Nam tính <br /> Khởi đầu năm mới trọn vẹn
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-neutral-600">
            {product.description}
          </p>
          <div className="mt-12 grid grid-cols-2 gap-8 text-left md:grid-cols-4">
            <div className="flex flex-col gap-2">
              <span className="text-xl font-bold">01.</span>
              <span className="text-xs font-bold uppercase tracking-widest">Thiết kế giới hạn</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xl font-bold">02.</span>
              <span className="text-xs font-bold uppercase tracking-widest">Vải Cotton Luxury</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xl font-bold">03.</span>
              <span className="text-xs font-bold uppercase tracking-widest">Form dáng chuẩn</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xl font-bold">04.</span>
              <span className="text-xs font-bold uppercase tracking-widest">Độ bền vượt trội</span>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle Image Section */}
      <section className="relative h-[600px] w-full overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1610652420120-209458fe8e9c?q=80&w=1600&auto=format&fit=crop" 
          alt="Hussio Lifestyle" 
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 inset-y-0 bg-black/30" />
        <div className="absolute inset-x-0 inset-y-0 flex items-center justify-center text-center text-white">
          <div className="max-w-2xl px-4">
            <h2 className="font-serif text-4xl font-light italic md:text-6xl">
              "Fashion is an extension of your personality."
            </h2>
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.4em]">
              Hussio Men's Collection 2026
            </p>
          </div>
        </div>
      </section>

      <ProductBenefits />

      {/* Feature Block 1: Material */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-16 md:flex-row">
            <div className="w-full overflow-hidden rounded-3xl md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1598522339138-829148b11225?q=80&w=1000&auto=format&fit=crop" 
                alt="Quality Material" 
                className="h-[500px] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="w-full md:w-1/2">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Đỉnh cao chất liệu</span>
              <h2 className="mt-4 font-serif text-3xl font-light text-neutral-900 md:text-5xl">Chất liệu cao cấp - Linh hồn của HUSSIO</h2>
              <p className="mt-6 text-neutral-600">
                Dòng vải độc quyền của Hussio mang lại khả năng thoáng khí tuyệt vời, giữ cho bạn luôn mát mẻ và tự tin trong mọi hoàn cảnh. 
                Sợi vải được chải kỹ để loại bỏ tạp chất, mang lại bề mặt mịn màng và bền bỉ hơn 2x so với vải thông thường.
              </p>
              <button className="mt-8 rounded-full border border-neutral-900 px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all hover:bg-neutral-900 hover:text-white">
                Tìm hiểu thêm
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Block 2: Fit */}
      <section className="bg-neutral-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-16 md:flex-row-reverse">
            <div className="w-full overflow-hidden rounded-3xl md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1621335829175-95f437384d7c?q=80&w=1000&auto=format&fit=crop" 
                alt="Perfect Fit" 
                className="h-[500px] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="w-full md:w-1/2">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Form dáng chuẩn nam</span>
              <h2 className="mt-4 font-serif text-3xl font-light text-neutral-900 md:text-5xl">Regular Fit - Sự cân bằng hoàn hảo</h2>
              <p className="mt-6 text-neutral-600">
                Form dáng được nghiên cứu dựa trên chỉ số hình thể của đàn ông Việt, mang lại sự vừa vặn tối ưu. 
                Vai áo vuông vức, độ dài tay áo hợp lý cùng phần thân áo ôm nhẹ, giúp bạn trông cao ráo và mạnh mẽ hơn.
              </p>
              <div className="mt-8 flex gap-4">
                <div className="h-2 w-2 rounded-full bg-red-600" />
                <div className="h-2 w-2 rounded-full bg-neutral-300" />
                <div className="h-2 w-2 rounded-full bg-neutral-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductStats />
      <ProductFAQ />
      <RelatedProducts />
    </div>
  );
}
