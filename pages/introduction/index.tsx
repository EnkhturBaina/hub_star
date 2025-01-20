import Image from 'next/image';
import React from 'react';

const Introduction: React.FC = () => {
  return (
    <section className="pb-2 lg:pb-2 xl:pb-4 pt-52">
      <h1>Нэвтрэх хэсэг</h1>
      <div className="grid grid-cols-2">
        <Image
          src={'/images/introduction/app-login.png'}
          alt="app-login"
          width={200}
          height={400}
        />
        <div>
          <p>Hub star программд ажиллахын тулд нэвтрэх шаардлагатай</p>
          <p>
            Hub star программд нэвтрэхдээ шинээр бүртгэл үүсгэж, үүсгэсэн бүртгэлээрээ хялбар
            нэвтэрнэ. Өөрийн бүртгэл үүсгэсэн утасны дугаар болон имэйл хаягаа нэр хэсэгт оруулан
            үүсгэсэн нууц үгээ оруулан нэвтрэх товчийг дарснаар программд нэвтэрнэ.
          </p>
        </div>
      </div>
      <h1>Бүртгэл үүсгэх</h1>
      <div className="grid grid-cols-2">
        <div className="flex">
          <Image
            src={'/images/introduction/app-register.png'}
            alt="app-login"
            width={200}
            height={400}
          />
          <Image
            src={'/images/introduction/app-otp.png'}
            alt="app-login"
            width={200}
            height={400}
          />
        </div>
        <div>
          <p>
            Хэрвээ таньд Hub star-д нэвтрэх эрх байхгүй бол программд нэвтрэхийн тулд бүртгэл
            үүсгэнэ
          </p>
          <ul>
            <li>
              - Өөрийн утасны дугаар эсвэл имэйл хаягаараа бүртгэл үүсгэнэ.Шинээр нэвтрэх нууц үг
              үүсгэн баталгаажуулна.
            </li>
            <li>- Hub star программыг ашиглах үйлчилгээний нөхцөлтэй танилцаж баталгаажуулна.</li>
            <li>
              - Бүртгүүлэх товчийг дарснаар таны бүртгүүлсэн утасны дугаар эсвэл имэйл хаягт
              баталгаажуулалтын код илгээгдэх болно.
            </li>
            <li>
              - Кодыг хуулан баталгаажуулалт хэсэгт оруулснаар таны бүртгэл үүсэж нэвтрэх эрхтэй
              болно.
            </li>
            <li>
              - Бүртгэл үүсгэсний дараа нэвтрэх хэсэгт өөрийн бүртгэл үүсгэсэн утасны дугаар эсвэл
              имэйл хаяг болон нууц үгээ оруулснаар программд нэвтэрнэ.
            </li>
          </ul>
        </div>
      </div>

      <h1>Үндсэн дэлгэц</h1>
      <div className="grid grid-cols-2">
        <Image src={'/images/introduction/app-home.png'} alt="app-login" width={200} height={400} />
        <div>
          <p>Үйлчилгээ нэмэх хэсэг</p>
          <p>- Энэ хэсэгт хэрэглэгчид шинээр үйлчилгээ байршуулна.</p>
          <p>Ангилал хэсэг</p>
          <p>- Энэ хэсэгт нийт үйлчилгээний чиглэлүүд харагдах болно.</p>
          <p>Профайл хэсэг</p>
          <p>- Энэ хэсэгт таны бүх мэдээлэл байршина.</p>
          <p>Мэдэгдлийн хэсэг</p>
          <p>- Энэ хэсэгт таны бүх мэдээлэл байршина.</p>
          <p>Өөрийн үйлчилгээ хэсэг</p>
          <p>
            - Энэ хэсэгт таны байршуулсан, хийгдэж буй, хадгалсан, үйлчилгээний түүх харагдах болно.
          </p>
          <p>Хэрэглэгчдийн хэсэг</p>
          <p>
            - Энэ хэсэгт үйлчилгээ захиалагчид, ажил гүйцэтгэгчид, ханган нийлүүлэгчид, тээврийн
            үйлчилгээ үзүүлэгчид, машин механизмын үйлчилгээ үзүүлэгчдийн мэдээллүүд харагдах болно.
          </p>
          <p>Мэдээллийн хэсэг</p>
          <p>- Энэ хэсэгт танд зориулсан мэдээ, мэдээлэл, зар сурталчилгаа байршина</p>
          <p>Онцгой үйлчилгээний хэсэг</p>
          <p>
            - Энэ хэсэгт та нээлттэй сонгон шалгаруулалт зарлах болон оролцох, зөвлөх үйлчилгээ авах
            болон байршуулах, олон улсаас бараа бүтээгдэхүүн борлуулах болон захиалах, материалын
            бүх төрлийн үйлчилгээ байршуулах болон үйлчилгээ авах, салбарын сургалтын мэдээлэл
            оруулах болон мэдээлэл авах, төслийн төсөв гаргах үйлчилгээ байршуулах болон үйлчилгээ
            авах боломжтой.
          </p>
          <p>Зөвлөмжүүд хэсэг</p>
          <p>
            - Энэ хэсэгт ажил хийж гүйцэтгэхэд шаардлагатай хууль, норм ба дүрмүүд, стандарт,
            ажил гүйцэтгэх аргачлал зөвлөмжүүд харах боломжтой. 
          </p>
          <p>Үйлчилгээнүүд хэсэг</p>
          <p>- Энэ хэсэгт нийт хэрэглэгчдийн байршуулсан үйлчилгээнүүдийг харах болно </p>
        </div>
      </div>
      <h1>Профайл хэсэг</h1>
      <div className="grid grid-cols-2">
        <Image
          src={'/images/introduction/app-profile.png'}
          alt="app-login"
          width={200}
          height={400}
        />
        <div>
          <p>- Ковер зураг оруулах</p>
          <p>- Профайл зураг оруулах</p>
          <p>- Профайл зураг оруулах</p>
          <p>Хэрэглэгчийн нэр нь профайл засах хэсгийг баталгаажуулснаар үүсгэгдэнэ.</p>
          <p>
            - Мөн баталгаажуулалт хийгдсэн хэрэглэгчийн профайл нэрийн урд байгаа тэмдэг идэвхжиж
            харагдана.
          </p>
          <p>Баталгаажуулалтыг хур системээр хийнэ.</p>
          <p>Таны олон нийтэд нээлттэй оруулсан байгаа үйлчилгээ.</p>
          <p>Таны оруулсан үйлчилгээг бусад хэрэглэгч хүлээн авсан, хэрэгжиж байгаа мэдээлэл</p>
          <p>Таны бусад хэрэглэгчидийн оруулсан үйлчилгээг хадгалсан мэдээлэл</p>
          <p>Таны оруулсан үйлчилгээ хийгдэж дууссан, хадгалагдсан мэдээлэл</p>
          <p>Хэрэглэгчийн төлбөр төлөх, хүлээн авах дансны мэдээлэл</p>
          <p>Таны үйлчилгээг захиалсан, хүлээн авсан, баталгаажуулахыг хүссэн тухай мэдээлэл</p>
          <p>Hub star программ нь Монгол, Англи, Хятад хэл дээр ажиллах боломжтой</p>
          <p>
            Hub star программ дээрх өөрийн профайлыг устгах. Анхааруулга! Устгасан профайлаар дахин
            бүртгэл үүсгэж нэвтрэх дохиололд админд хандах шаардлагатай
          </p>
          <p>Системээс гарах</p>
        </div>
      </div>
      <h1>Профайл баталгаажуулах</h1>
      <div className="grid grid-cols-2">
        <div className="flex">
          <Image
            src={'/images/introduction/app-confirmation1.png'}
            alt="app-login"
            width={200}
            height={400}
          />
          <Image
            src={'/images/introduction/app-confirmation2.png'}
            alt="app-login"
            width={200}
            height={400}
          />
        </div>
        <div>
          <p>Hub star программыг бүрэн ашиглахын тулд профайл үүсгэх шаардлагатай</p>
          <p>
            Hub star программд үйлчилгээ байршуулах, үйлчилгээ авах зэрэг программыг бүрэн ашиглахын
            тулд профайл баталгаажуулалтаа хийх шаардлагатай.
          </p>
        </div>
      </div>

      <h1>Баталгаажуулалт</h1>
      <p>
        Hub star программд үйлчилгээ байршуулах, үйлчилгээ авах зэрэг программыг бүрэн ашиглахын
        тулд Хур Дан системээр баталгаажуулалтаа хийлгэх шаардлагатай.
      </p>
      <h1>Үйлчилгээ байршуулах</h1>
      <div className="grid grid-cols-2">
        <div>
          <Image
            src={'/images/introduction/app-new-service.png'}
            alt="app-login"
            width={800}
            height={400}
          />
        </div>
        <div>
          <p>
            Hub star программд үйлчилгээ байршуулахад онцгой үйлчилгээ эсвэл энгийн үйлчилгээ
            байршуулахаас шалтгаалан аль нэг төрлийг сонгоно.
          </p>
          <p>
            Та өөрийн үйлчилгээг байршуулах төрлийг сонгосны дараа шаардлагатай хэсгүүдийг бөглөн
            хадгалах товчийг дарснаар таны үйлчилгээ байршина.
          </p>
        </div>
      </div>
      <h1>Байршуулсан үйлчилгээ</h1>
      <div className="grid grid-cols-2">
        <Image
          src={'/images/introduction/app-service.png'}
          alt="app-login"
          width={200}
          height={400}
        />
        <div>
          <p>
            - Hub star программ дээр байршуулсан үйлчилгээг хэрэглэгч тус бүрээр харах боломжтой
            бөгөөд шүүлтүүр, хайлт ашиглан хэрэгцээт үйлчилгээгээ олох боломжтой.
          </p>
          <p>
            - Та өөрийн хэрэгцээтэй байгаа үйлчилгээг байршуулсан үйлчилгээнд нэвтэрч үйлчилгээ
            захиалах товчийг дарснаар та үйлчилгээ байршуулагчтай хэрэглэгчидтэй холбогдох боломжтой
            болно.
          </p>
          <p>
            - Мөн та үйлчилгээ байршуулагчийн профайлыг үзсэнээр хийж гүйцэтгэсэн үйлчилгээний
            түүхийг харах боломжтой.
          </p>
        </div>
      </div>

      <h1>Байршуулсан үйлчилгээ</h1>
      <p>
        Мөн та үйлчилгээ байршуулагчын профайлыг үзсэнээр хийж гүйцэтгэсэн үйлчилгээний түүхийг
        харах боломжтой
      </p>
      <p>Үйлчилгээ үзүүлэгчийн хийсэн ажлуудийн үнэлгээг харах боломжтой</p>
      <h1>Үйлчилгээ захиалах</h1>
      <div className="grid grid-cols-2">
        <div className="flex">
          <Image
            src={'/images/introduction/app-notify.png'}
            alt="app-login"
            width={200}
            height={400}
          />
          <Image
            src={'/images/introduction/app-notify2.png'}
            alt="app-login"
            width={200}
            height={400}
          />
        </div>
        <div>
          <p>
            Үйлчилгээг байршуулагч мэдэгдлийг зөвшөөрсөн /татгалзах/ товчийг дарсан дохиололд
            захиалагчдад иргэж мэдэгдэл ирэх бөгөөд хоёр талын хийгдэж буй ажил хэсэгт байршина.
          </p>
        </div>
      </div>

      <h1>Хийгдэж буй ажил дуусгах</h1>
      <div className="grid grid-cols-2">
        <Image
          src={'/images/introduction/app-done-service.png'}
          alt="app-login"
          width={800}
          height={400}
        />
        <div>
          <p>
            - Хийгдэж буй ажлын хэсэгт байршсан ажлын үйлчилгээний төлөв хэсгийн төлөв солих
            товчлуурыг дарна.
          </p>
          <p>
            - Үйлчилгээний төлөв солих хэсгийн нэмэлт цонхонд ажил дуусгавар болгосон тайлбар,
            үйлчилгээ үзүүлэгчийг дүгнэсэн 0-10 оноо бүхий 5 одноос үнэлгээ өгч хадгалснаар ажил
            үйлчилгээний түүх хэсэгт шилжинэ.
          </p>
        </div>
      </div>

      <h1>Зөвлөмжүүд</h1>
      <div className="grid grid-cols-2">
        <Image
          src={'/images/introduction/app-done-service.png'}
          alt="app-login"
          width={800}
          height={400}
        />
        <div>
          <p>- Хэрэглэгчид өөрт шаардлагатай зөвлөмжүүдийг авах боломжтой.</p>
          <p>
            - Бүтээн байгуулалтын салбарын  ажил хийхэд  зөвшөөрөл өгөх , хяналт шалгалт хийх,
            заавар зөвлөмж өгөх зэрэг үйл ажиллагааг хариуцдаг төрийн болон төрийн бус байгууллагууд
            хувийн  хэвшлийн байгууллагууд.
          </p>
          <p>
            - Бүтээн байгуулалтын ажил хийж гүйцэтгэх жишиг заавар зөвлөмж, арга аргачлал,
            технологийн карт, видео бичлэг.
          </p>
          <p>
            - Барилга бүтээн байгуулалтын ажил  хийж гүйцэтгэх  ажлын дараалал, ажлын үе шат болгонд
            хяналт хийх зааварчилгаа, ажил хүлээж авах жишиг зааварчилгаа.
          </p>
        </div>
      </div>
      <h1>Нэвтрэх хэсэг</h1>
      <div className="grid grid-cols-2">
        <Image src={'/images/introduction/login.png'} alt="app-login" width={800} height={400} />
        <div>
          <p>Hub star программд ажиллахын тулд нэвтрэх шаардлагатай </p>
          <p>
            - Hub star программд нэвтрэхдээ шинээр бүртгэл үүсгэж, үүсгэсэн бүртгэлээрээ хялбар
            нэвтэрнэ. Өөрийн бүртгэл үүсгэсэн утасны дугаар болон и-мэйл хаягаа нэр хэсэгт оруулан
            үүсгэсэн нууц үгээ оруулан нэвтрэх товчийг дарснаар программд нэвтэрнэ.
          </p>
        </div>
      </div>
      <h1>Бүртгэл үүсгэх</h1>
      <div className="grid grid-cols-2">
        <div>
          <Image
            src={'/images/introduction/register.png'}
            alt="register"
            width={800}
            height={400}
          />
          <Image src={'/images/introduction/otp.png'} alt="register" width={800} height={400} />
        </div>
        <div>
          <p>Hub star программд нэвтрэхийн тулд бүртгэл үүсгэнэ.</p>
          <p>- Өөрийн утасны дугаар эсвэл имэйл хаягаараа бүртгэл үүсгэнэ.</p>
          <p>- Шинээр нэвтрэх нууц үг үүсгэн баталгаажуулна.</p>
          <p>- Hub star программыг ашиглах үйлчилгээний нөхцөлтэй танилцаж баталгаажуулана.</p>
          <p>
            - Бүртгүүлэх товчийг дарснаар таны бүртгүүлсэн утасны дугаар эсвэл имэйл хаяганд
            баталгаажуулалтын код илгээгдэх болно.
          </p>
          <p>
            - Кодыг хуулан баталгаажуулалт хэсэгт оруулснаар таны бүртгэл үүсэж нэвтрэх эрхтэй
            болно.
          </p>
          <p>
            - Бүртгэл үүсэгсний дараа нэвтрэх хэсэгт өөрийн бүртгэл үүсгэсэн утасны дугаар эсвэл
            имэйл хаяга, нууц үгээ оруулснаар программд нэвтрэнэ.
          </p>
        </div>
      </div>
      <h1>Үндсэн дэлгэц</h1>
      <div className="grid grid-cols-2">
        <Image src={'/images/introduction/home.png'} alt="home" width={800} height={400} />
        <div>
          <p>Үйлчилгээ нэмэх хэсэг</p>
          <p>- Энэ хэсэгт хэрэглэгчид шинээр үйлчилгээ байршуулна.</p>
          <p>Ангилал хэсэг</p>
          <p>- Энэ хэсэгт нийт үйлчилгээний чиглэлүүд харагдах болно.</p>
          <p>Профайл хэсэг</p>
          <p>- Энэ хэсэгт таны бүх мэдээлэл байршина.</p>
          <p>Мэдэгдэлийн хэсэг</p>
          <p>- Энэ хэсэгт танд ирсэн мэдээллүүд харагдах болно</p>
          <p>Өөрийн үйлчилгээ хэсэг</p>
          <p>
            - Энэ хэсэгт таны байршуулсан, хийгдэж буй, хадгалсан, үйлчилгээний түүх харагдах болно
          </p>
          <p>Хэрэглэгчдийн хэсэг</p>
          <p>
            - Энэ хэсэгт үйлчилгээ захиалагчид, ажил гүйцэтгэгчид, ханган нийлүүлэгчид, тээврийн
            үйлчилгээ үзүүлэгчид, машин механизмын үйлчилгээ үзүүлэгчдийн мэдээллүүд харагдах болно
          </p>
          <p>Мэдээллийн хэсэг</p>
          <p>-Энэ хэсэгт танд зориулсан мэдээ, мэдээлэл, зар сурталчилгаа байршина</p>
          <p>Онцгой үйлчилгээний хэсэг</p>
          <p>
            - Энэ хэсэгт та нээлттэй сонгон шалгаруулалт зарлах болон оролцох, зөвлөх үйлчилгээ авах
            болон байршуулах, олон улсаас бараа бүтээгдэхүүн борлуулах  болон захиалах, материалын
            бүх төрлийн үйлчилгээ байршуулах болон үйлчилгээ авах, салбарын сургалтын мэдээлэл
            оруулах болон мэдээлэл авах, төслийн төсөв гаргах үйлчилгээ байршуулах болон үйлчилгээ
            авах боломжтой.
          </p>
          <p>Зөвлөмжүүд хэсэг</p>
          <p>
            - Энэ хэсэгт ажил хийж гүйцэтгэхэд шаардлагатай хууль, норм ба дүрмүүд, стандарт, ажил
            гүйцэтгэх аргачлал зөвлөмжүүд харах боломжтой. 
          </p>
          <p>Үйлчилгээнүүд хэсэг</p>
          <p>- Энэ хэсэгт нийт хэрэглэгчдийн байршуулсан үйлчилгээнүүдийг харах болно </p>
        </div>
      </div>
      <h1>Профайл хэсэг</h1>
      <div className="grid grid-cols-2">
        <Image src={'/images/introduction/profile.png'} alt="home" width={800} height={400} />
        <div>
          <p>- Ковер зураг оруулах</p>
          <p>- Профайл зураг оруулах</p>
          <p>
            - Хэрэглэгчийн нэр нь профайл засах хэсгийг баталгаажуулснаар үүсгэгдэнэ. Мөн
            баталгаажуулалт хийгдсэн хэрэглэгчийн профайл нэрийн урд байгаа тэмдэг идэвхжиж
            харагдана.
          </p>
          <p>- Баталгаажуулалтыг хур системээр хийнэ.</p>
          <p>- Таны олон нийтэд нээлттэй оруулсан байгаа үйлчилгээ.</p>
          <p>- Таны оруулсан үйлчилгээг бусад хэрэглэгч хүлээн авсан, хэрэгжиж байгаа мэдээлэл</p>
          <p>- Таны бусад хэрэглэгчдийн оруулсан үйлчилгээг хадгалсан мэдээлэл</p>
          <p>- Таны оруулсан үйлчилгээ хийгдэж дууссан, хадгалагдсан мэдээлэл</p>
          <p>- Хэрэглэгчийн төлбөр төлөх, хүлээн авах дансны мэдээлэл</p>
          <p>- Таны үйлчилгээг захиалсан, хүлээн, баталгаажуулахыг хүссэн авсан тухай мэдээлэл</p>
          <p>- Hub star программ нь Монгол, Англи, Хятад хэл дээр ажиллах боломжтой</p>
          <p>
            - Hub star программ дээрх өөрийн профайлыг устгах. Анхааруулга! Устгасан профайлаар
            дахин бүртгэл үүсгэж нэвтрэх тохиолдолд админд хандах шаардлагатай
          </p>
          <p>- Hub star программаас гарах</p>
        </div>
      </div>
      <h1>Үйлчилгээ байршуулах</h1>
      <div className="grid grid-cols-2">
        <Image src={'/images/introduction/new-service.png'} alt="home" width={800} height={400} />
        <div>
          <p>
            Hub star программд үйлчилгээ байршуулахад онцгой үйлчилгээ эсвэл энгийн үйлчилгээ
            байршуулахаас шалтгаалан аль нэг төрлийг сонгоно
          </p>
          <p>
            Та өөрийн үйлчилгээг байршуулах төрлийг сонгосны дараа шаардлагатай цонхнуудыг бөглөн
            хадгалах товчийг дарснаар таны үйлчилгээ байршина.
          </p>
        </div>
      </div>
      <h1>Үйлчилгээ захиалах</h1>
      <div className="grid grid-cols-2">
        <Image src={'/images/introduction/notify.png'} alt="home" width={800} height={400} />
        <p>
          Үйлчилгээг байршуулагч мэдэгдлийг зөвшөөрсөн /татгалзах/ товчийг дарсан тохиолдолд
          захиалагчдад иргэж мэдэгдэл ирэх бөгөөд хоёр талын хийгдэж буй ажил хэсэгт байршина.
        </p>
      </div>
    </section>
  );
};

export default Introduction;
