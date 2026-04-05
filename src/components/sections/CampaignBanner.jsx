import { Link } from "react-router-dom";

export function CampaignBanner() {
  return (
    <section className="bg-neutral-900 py-16 lg:py-24">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="group relative w-full overflow-hidden rounded-3xl lg:w-1/2">
            <img
              src="https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/654769151_1282793010649964_1821103949442832904_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeEXjqKiBDAaYnw_-FAvIULN7_uVrSezjFDv-5WtJ7OMUDCYmbklOsl13MIMpcE5TlM2E1-OQLavbqIywuxGoe5Y&_nc_ohc=EKTdxezQpHoQ7kNvwG8F4Ta&_nc_oc=AdqOKc8A5uu5t7kJ-BYL-EEv1Vm_s21FfV04XnS6_8gxrgyCMSog4mb73ppaP6isjAz67ynzNclGzCn5fhSn2iDH&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=0C3_pEPwXRrHCqeC6ShdDA&_nc_ss=7a3a8&oh=00_Af0XdPnAHvMiEVu2wi1oj2Qk5roBtOxh0eHCPsXTZ18VKg&oe=69D882F5"
              alt="Holiday Collection"
              className="aspect-video w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-neutral-900/30 transition-opacity group-hover:opacity-40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">
                New Arrivals
              </span>
              <h3 className="mt-4 font-serif text-3xl font-light md:text-5xl">
                Sự lựa chọn đúng đắn
              </h3>
              <Link
                to="/collection/tet"
                className="mt-8 rounded-full bg-white px-10 py-3.5 text-[10px] font-bold uppercase tracking-widest text-neutral-900 transition-all hover:bg-neutral-900 hover:text-white active:scale-95"
              >
                Khám phá ngay
              </Link>
            </div>
          </div>

          <div className="group relative w-full overflow-hidden rounded-3xl lg:w-1/2">
            <img
              src="https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/654692739_1279345667661365_2936353971763839355_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeE6giIv8ONcddd5G_WuPwhEjahvgt7mlyONqG-C3uaXIy4KgUdjTaQgqKxgl_aKrDKY7Jqmw61cs00u245oYn1d&_nc_ohc=1enxrNPMYVEQ7kNvwHmW6wg&_nc_oc=AdpEZTtu6KEVqhlDmG9kPW_cHYUvOpqpCsE9nHtirRdxHxrBGMoG1Hs5dLGjINsDqaaXP9uNJnbpkCdKeMcXQtoX&_nc_zt=23&_nc_ht=scontent.fsgn5-15.fna&_nc_gid=eOGoq_1FDTM6knLSGdw1FQ&_nc_ss=7a3a8&oh=00_Af1hBzkOA-RGz7NcLOuKc5RP_kD2yCFtwBfey4mZGTsHAA&oe=69D899B8"
              alt="Urban Style"
              className="aspect-video w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-neutral-900/30 transition-opacity group-hover:opacity-40" />
            <div className="absolute inset-x-0 inset-y-0 flex flex-col items-center justify-center text-center text-white">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">
                New Arrivals
              </span>
              <h3 className="mt-4 font-serif text-3xl font-light md:text-5xl">
                Phong cách dẫn đầu
              </h3>
              <Link
                to="/collection/new"
                className="mt-8 rounded-full bg-white px-10 py-3.5 text-[10px] font-bold uppercase tracking-widest text-neutral-900 transition-all hover:bg-neutral-900 hover:text-white active:scale-95"
              >
                Xem chi tiết
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
