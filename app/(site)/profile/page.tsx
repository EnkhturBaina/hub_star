import Image from "next/image";

const Profile = () => {
  return (
    <>
      {/* <!-- ===== Blog Grid Start ===== --> */}
      <section className="py-20 lg:py-20 xl:py-20">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 xl:px-0">
          <div className="flex flex-col">
            <Image
              width={100}
              height={400}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="p_bg"
              src={"/images/profile_bg.png"}
              className="relative h-auto w-full"
              loading="lazy"
            />
            <div>
              <span>Б.Батзаяа</span>
              <p>“Таван-Орд” ХХК - Маркетингийн менежер</p>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ===== Blog Grid End ===== --> */}
    </>
  );
};

export default Profile;
