import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import IntroSection from '@/components/introduction/IntroSection';
import { Button } from '@nextui-org/react';
import { classNames } from '@/utils/util';
import IntroSectionWeb from '@/components/introduction/IntroSectionWeb';

const appSections = [
  {
    id: 'app-login',
    name: 'Нэвтрэх хэсэг',
  },
  {
    id: 'app-register',
    name: 'Бүртгүүлэх',
  },
  {
    id: 'app-home',
    name: 'Үндсэн дэлгэц',
  },
  {
    id: 'app-profile',
    name: 'Профайл хэсэг',
  },
  {
    id: 'app-profile-confirmation',
    name: 'Профайл баталгаажуулах',
  },
  {
    id: 'app-confirmation',
    name: 'Баталгаажуулалт',
  },
  {
    id: 'app-new-ad',
    name: 'Үйлчилгээ байршуулах',
  },
  {
    id: 'app-ads',
    name: 'Байршуулсан үйлчилгээ',
  },
  {
    id: 'app-ad-order',
    name: 'Үйлчилгээ захиалах',
  },
  {
    id: 'app-ad-doing',
    name: 'Хийгдэж буй ажил дуусгах',
  },
  {
    id: 'app-advice',
    name: 'Зөвлөмжүүд',
  },
];
const webSections = [
  {
    id: 'login',
    name: 'Нэвтрэх хэсэг',
  },
  {
    id: 'register',
    name: 'Бүртгүүлэх',
  },
  {
    id: 'home',
    name: 'Үндсэн дэлгэц',
  },
  {
    id: 'profile',
    name: 'Профайл хэсэг',
  },
  {
    id: 'profile-confirmation',
    name: 'Профайл баталгаажуулах',
  },
  {
    id: 'confirmation',
    name: 'Баталгаажуулалт',
  },
  {
    id: 'new-ad',
    name: 'Үйлчилгээ байршуулах',
  },
  {
    id: 'ads',
    name: 'Байршуулсан үйлчилгээ',
  },
  {
    id: 'ad-order',
    name: 'Үйлчилгээ захиалах',
  },
  {
    id: 'ad-doing',
    name: 'Хийгдэж буй ажил дуусгах',
  },
  {
    id: 'advice',
    name: 'Зөвлөмжүүд',
  },
];

const Introduction: React.FC = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>('app-login');
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = [...appSections, ...webSections].map(item =>
        document.getElementById(item.id)
      );
      const currentSection = sectionElements.find(
        section =>
          section &&
          section.getBoundingClientRect().top <= window.innerHeight / 2 &&
          section.getBoundingClientRect().bottom >= window.innerHeight / 2
      );

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <section className="pb-2 lg:pb-2 xl:pb-4 pt-16">
      <div className="flex flex-row pt-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto">
          <IntroSection
            className=""
            id="app-login"
            title="Нэвтрэх хэсэг"
            imagePaths={['/images/introduction/app-login.png']}
            descriptions={[
              'Hub star программд ажиллахын тулд нэвтрэх шаардлагатай',
              `Hub star программд нэвтрэхдээ шинээр бүртгэл үүсгэж, үүсгэсэн бүртгэлээрээ хялбар
                нэвтэрнэ. Өөрийн бүртгэл үүсгэсэн утасны дугаар болон имэйл хаягаа нэр хэсэгт
                оруулан үүсгэсэн нууц үгээ оруулан нэвтрэх товчийг дарснаар программд нэвтэрнэ.`,
            ]}
          />
          <IntroSection
            className=""
            id="app-register"
            title="Бүртгэл үүсгэх"
            imagePaths={[
              '/images/introduction/app-register.png',
              '/images/introduction/app-otp.png',
            ]}
            descriptions={[
              'Хэрвээ таньд Hub star-д нэвтрэх эрх байхгүй бол программд нэвтрэхийн тулд бүртгэл үүсгэнэ',
              '- Өөрийн утасны дугаар эсвэл имэйл хаягаараа бүртгэл үүсгэнэ.Шинээр нэвтрэх нууц үг үүсгэн баталгаажуулна.',
              '- Hub star программыг ашиглах үйлчилгээний нөхцөлтэй танилцаж баталгаажуулна.',
              '- Бүртгүүлэх товчийг дарснаар таны бүртгүүлсэн утасны дугаар эсвэл имэйл хаягт баталгаажуулалтын код илгээгдэх болно.',
              '- Кодыг хуулан баталгаажуулалт хэсэгт оруулснаар таны бүртгэл үүсэж нэвтрэх эрхтэй болно.',
              '- Бүртгэл үүсгэсний дараа нэвтрэх хэсэгт өөрийн бүртгэл үүсгэсэн утасны дугаар эсвэл имэйл хаяг болон нууц үгээ оруулснаар программд нэвтэрнэ.',
            ]}
          />
          <IntroSection
            className=""
            id="app-home"
            title="Үндсэн дэлгэц"
            imagePaths={['/images/introduction/app-home.png']}
            descriptions={[
              'Үйлчилгээ нэмэх хэсэг',
              '- Энэ хэсэгт хэрэглэгчид шинээр үйлчилгээ байршуулна.',
              'Ангилал хэсэг',
              '- Энэ хэсэгт нийт үйлчилгээний чиглэлүүд харагдах болно.',
              'Профайл хэсэг',
              '- Энэ хэсэгт таны бүх мэдээлэл байршина.',
              'Мэдэгдлийн хэсэг',
              '- Энэ хэсэгт таны бүх мэдээлэл байршина.',
              'Өөрийн үйлчилгээ хэсэг',
              '- Энэ хэсэгт таны байршуулсан, хийгдэж буй, хадгалсан, үйлчилгээний түүх харагдах болно.',
              'Хэрэглэгчдийн хэсэг',
              '- Энэ хэсэгт үйлчилгээ захиалагчид, ажил гүйцэтгэгчид, ханган нийлүүлэгчид, тээврийн үйлчилгээ үзүүлэгчид, машин механизмын үйлчилгээ үзүүлэгчдийн мэдээллүүд харагдах болно.',
              'Мэдээллийн хэсэг',
              '- Энэ хэсэгт танд зориулсан мэдээ, мэдээлэл, зар сурталчилгаа байршина',
              'Онцгой үйлчилгээний хэсэг',
              `- Энэ хэсэгт та нээлттэй сонгон шалгаруулалт зарлах болон оролцох, зөвлөх үйлчилгээ
                авах болон байршуулах, олон улсаас бараа бүтээгдэхүүн борлуулах болон захиалах,
                материалын бүх төрлийн үйлчилгээ байршуулах болон үйлчилгээ авах, салбарын сургалтын
                мэдээлэл оруулах болон мэдээлэл авах, төслийн төсөв гаргах үйлчилгээ байршуулах
                болон үйлчилгээ авах боломжтой.`,
              'Зөвлөмжүүд хэсэг',
              '- Энэ хэсэгт ажил хийж гүйцэтгэхэд шаардлагатай хууль, норм ба дүрмүүд, стандарт, ажил гүйцэтгэх аргачлал зөвлөмжүүд харах боломжтой.',
              'Үйлчилгээнүүд хэсэг',
              '- Энэ хэсэгт нийт хэрэглэгчдийн байршуулсан үйлчилгээнүүдийг харах болно',
            ]}
          />
          <IntroSection
            className=""
            id="app-profile"
            title="Профайл хэсэг"
            imagePaths={['/images/introduction/app-profile.png']}
            descriptions={[
              '- Ковер зураг оруулах',
              '- Профайл зураг оруулах',
              'Хэрэглэгчийн нэр нь профайл засах хэсгийг баталгаажуулснаар үүсгэгдэнэ.',
              '- Мөн баталгаажуулалт хийгдсэн хэрэглэгчийн профайл нэрийн урд байгаа тэмдэг идэвхжиж харагдана.',
              'Баталгаажуулалтыг хур системээр хийнэ.',
              'Таны олон нийтэд нээлттэй оруулсан байгаа үйлчилгээ.',
              'Таны оруулсан үйлчилгээг бусад хэрэглэгч хүлээн авсан, хэрэгжиж байгаа мэдээлэл',
              'Таны бусад хэрэглэгчидийн оруулсан үйлчилгээг хадгалсан мэдээлэл',
              'Таны оруулсан үйлчилгээ хийгдэж дууссан, хадгалагдсан мэдээлэл',
              'Хэрэглэгчийн төлбөр төлөх, хүлээн авах дансны мэдээлэл',
              'Таны үйлчилгээг захиалсан, хүлээн авсан, баталгаажуулахыг хүссэн тухай мэдээлэл',
              'Hub star программ нь Монгол, Англи, Хятад хэл дээр ажиллах боломжтой',
              'Hub star программ дээрх өөрийн профайлыг устгах. Анхааруулга! Устгасан профайлаар дахин бүртгэл үүсгэж нэвтрэх дохиололд админд хандах шаардлагатай',
              'Системээс гарах',
            ]}
          />
          <IntroSection
            className=""
            id="app-profile-confirmation"
            title="Профайл баталгаажуулах"
            imagePaths={[
              '/images/introduction/app-profile-confirmation1.png',
              '/images/introduction/app-profile-confirmation2.png',
            ]}
            descriptions={[
              'Hub star программыг бүрэн ашиглахын тулд профайл үүсгэх шаардлагатай',
              'Hub star программд үйлчилгээ байршуулах, үйлчилгээ авах зэрэг программыг бүрэн ашиглахын тулд профайл баталгаажуулалтаа хийх шаардлагатай.',
            ]}
          />
          <IntroSection
            className=""
            id="app-confirmation"
            title="Баталгаажуулалт"
            imagePaths={[
              '/images/introduction/app-confirmation1.png',
              '/images/introduction/app-confirmation2.png',
              '/images/introduction/app-confirmation3.png',
            ]}
            descriptions={[
              'Hub star программд үйлчилгээ байршуулах, үйлчилгээ авах зэрэг программыг бүрэн ашиглахын тулд Хур Дан системээр баталгаажуулалтаа хийлгэх шаардлагатай.',
            ]}
          />
          <IntroSection
            className=""
            id="app-new-ad"
            title="Үйлчилгээ байршуулах"
            imagePaths={[
              '/images/introduction/app-new-service1.png',
              '/images/introduction/app-new-service2.png',
              '/images/introduction/app-new-service3.png',
            ]}
            descriptions={[
              'Hub star программд үйлчилгээ байршуулахад онцгой үйлчилгээ эсвэл энгийн үйлчилгээ байршуулахаас шалтгаалан аль нэг төрлийг сонгоно.',
              'Та өөрийн үйлчилгээг байршуулах төрлийг сонгосны дараа шаардлагатай хэсгүүдийг бөглөн хадгалах товчийг дарснаар таны үйлчилгээ байршина.',
            ]}
          />
          <IntroSection
            className=""
            id="app-ads"
            title="Байршуулсан үйлчилгээ"
            imagePaths={['/images/introduction/app-service.png']}
            descriptions={[
              '- Hub star программ дээр байршуулсан үйлчилгээг хэрэглэгч тус бүрээр харах боломжтой бөгөөд шүүлтүүр, хайлт ашиглан хэрэгцээт үйлчилгээгээ олох боломжтой.',
              `- Та өөрийн хэрэгцээтэй байгаа үйлчилгээг байршуулсан үйлчилгээнд нэвтэрч
                  үйлчилгээ захиалах товчийг дарснаар та үйлчилгээ байршуулагчтай хэрэглэгчидтэй
                  холбогдох боломжтой болно.`,
              '- Мөн та үйлчилгээ байршуулагчийн профайлыг үзсэнээр хийж гүйцэтгэсэн үйлчилгээний түүхийг харах боломжтой.',
            ]}
          />
          <IntroSection
            className=""
            id="app-ad-order"
            title="Үйлчилгээ захиалах"
            imagePaths={[
              '/images/introduction/app-notify.png',
              '/images/introduction/app-notify2.png',
            ]}
            descriptions={[
              `Үйлчилгээг байршуулагч мэдэгдлийг зөвшөөрсөн /татгалзах/ товчийг дарсан дохиололд
                  захиалагчдад иргэж мэдэгдэл ирэх бөгөөд хоёр талын хийгдэж буй ажил хэсэгт
                  байршина.`,
            ]}
          />
          <IntroSection
            className=""
            id="app-ad-doing"
            title="Хийгдэж буй ажил дуусгах"
            imagePaths={['/images/introduction/app-done-service.png']}
            descriptions={[
              '- Хийгдэж буй ажлын хэсэгт байршсан ажлын үйлчилгээний төлөв хэсгийн төлөв солих товчлуурыг дарна.',
              `- Үйлчилгээний төлөв солих хэсгийн нэмэлт цонхонд ажил дуусгавар болгосон тайлбар,
                  үйлчилгээ үзүүлэгчийг дүгнэсэн 0-10 оноо бүхий 5 одноос үнэлгээ өгч хадгалснаар
                  ажил үйлчилгээний түүх хэсэгт шилжинэ.`,
            ]}
          />
          <IntroSection
            className=""
            id="app-advice"
            title="Зөвлөмжүүд"
            imagePaths={['/images/introduction/app-done-service.png']}
            descriptions={[
              '- Хэрэглэгчид өөрт шаардлагатай зөвлөмжүүдийг авах боломжтой.',
              `- Бүтээн байгуулалтын салбарын  ажил хийхэд  зөвшөөрөл өгөх , хяналт шалгалт хийх,
                  заавар зөвлөмж өгөх зэрэг үйл ажиллагааг хариуцдаг төрийн болон төрийн бус
                  байгууллагууд хувийн  хэвшлийн байгууллагууд.`,
              `- Бүтээн байгуулалтын ажил хийж гүйцэтгэх жишиг заавар зөвлөмж, арга аргачлал,
                  технологийн карт, видео бичлэг.`,
              `- Барилга бүтээн байгуулалтын ажил  хийж гүйцэтгэх  ажлын дараалал, ажлын үе шат
                  болгонд хяналт хийх зааварчилгаа, ажил хүлээж авах жишиг зааварчилгаа.`,
            ]}
          />
          {/* WEB */}
          <IntroSectionWeb
            className=""
            id="login"
            title="Нэвтрэх хэсэг"
            imagePaths={['/images/introduction/login.png']}
            descriptions={[
              'Hub star программд ажиллахын тулд нэвтрэх шаардлагатай ',
              `- Hub star программд нэвтрэхдээ шинээр бүртгэл үүсгэж, үүсгэсэн бүртгэлээрээ
                  хялбар нэвтэрнэ. Өөрийн бүртгэл үүсгэсэн утасны дугаар болон и-мэйл хаягаа нэр
                  хэсэгт оруулан үүсгэсэн нууц үгээ оруулан нэвтрэх товчийг дарснаар программд
                  нэвтэрнэ.`,
            ]}
          />
          <IntroSectionWeb
            className=""
            id="register"
            title="Бүртгэл үүсгэх"
            imagePaths={['/images/introduction/register.png', '/images/introduction/otp.png']}
            descriptions={[
              'Hub star программд нэвтрэхийн тулд бүртгэл үүсгэнэ.',
              '- Өөрийн утасны дугаар эсвэл имэйл хаягаараа бүртгэл үүсгэнэ.',
              '- Шинээр нэвтрэх нууц үг үүсгэн баталгаажуулна.',
              '- Hub star программыг ашиглах үйлчилгээний нөхцөлтэй танилцаж баталгаажуулана.',
              '- Бүртгүүлэх товчийг дарснаар таны бүртгүүлсэн утасны дугаар эсвэл имэйл хаяганд баталгаажуулалтын код илгээгдэх болно.',
              '- Кодыг хуулан баталгаажуулалт хэсэгт оруулснаар таны бүртгэл үүсэж нэвтрэх эрхтэй болно.',
              '- Бүртгэл үүсэгсний дараа нэвтрэх хэсэгт өөрийн бүртгэл үүсгэсэн утасны дугаар эсвэл имэйл хаяга, нууц үгээ оруулснаар программд нэвтрэнэ.',
            ]}
          />
          <IntroSectionWeb
            className=""
            id="home"
            title="Үндсэн дэлгэц"
            imagePaths={['/images/introduction/home.png']}
            descriptions={[
              'Үйлчилгээ нэмэх хэсэг',
              '- Энэ хэсэгт хэрэглэгчид шинээр үйлчилгээ байршуулна.',
              'Ангилал хэсэг',
              '- Энэ хэсэгт нийт үйлчилгээний чиглэлүүд харагдах болно.',
              'Профайл хэсэг',
              '- Энэ хэсэгт таны бүх мэдээлэл байршина.',
              'Мэдэгдэлийн хэсэг',
              '- Энэ хэсэгт танд ирсэн мэдээллүүд харагдах болно',
              'Өөрийн үйлчилгээ хэсэг',
              '- Энэ хэсэгт таны байршуулсан, хийгдэж буй, хадгалсан, үйлчилгээний түүх харагдах болно',
              'Хэрэглэгчдийн хэсэг',
              `- Энэ хэсэгт үйлчилгээ захиалагчид, ажил гүйцэтгэгчид, ханган нийлүүлэгчид,
                  тээврийн үйлчилгээ үзүүлэгчид, машин механизмын үйлчилгээ үзүүлэгчдийн мэдээллүүд
                  харагдах болно`,
              'Мэдээллийн хэсэг',
              '-Энэ хэсэгт танд зориулсан мэдээ, мэдээлэл, зар сурталчилгаа байршина',
              'Онцгой үйлчилгээний хэсэг',
              `- Энэ хэсэгт та нээлттэй сонгон шалгаруулалт зарлах болон оролцох,
                  зөвлөх үйлчилгээ авах болон байршуулах, олон улсаас бараа бүтээгдэхүүн борлуулах 
                  болон захиалах, материалын бүх төрлийн үйлчилгээ байршуулах болон үйлчилгээ авах,
                  салбарын сургалтын мэдээлэл оруулах болон мэдээлэл авах, төслийн төсөв
                  гаргах үйлчилгээ байршуулах болон үйлчилгээ авах боломжтой.`,
              'Зөвлөмжүүд хэсэг',
              '- Энэ хэсэгт ажил хийж гүйцэтгэхэд шаардлагатай хууль, норм ба дүрмүүд, стандарт, ажил гүйцэтгэх аргачлал зөвлөмжүүд харах боломжтой.',
              'Үйлчилгээнүүд хэсэг',
              '- Энэ хэсэгт нийт хэрэглэгчдийн байршуулсан үйлчилгээнүүдийг харах болно',
            ]}
          />
          <IntroSectionWeb
            className=""
            id="profile"
            title="Профайл хэсэг"
            imagePaths={['/images/introduction/home.png']}
            descriptions={[
              '- Ковер зураг оруулах',
              '- Профайл зураг оруулах',
              '- Хэрэглэгчийн нэр нь профайл засах хэсгийг баталгаажуулснаар үүсгэгдэнэ. Мөн баталгаажуулалт хийгдсэн хэрэглэгчийн профайл нэрийн урд байгаа тэмдэг идэвхжиж харагдана.',
              '- Баталгаажуулалтыг хур системээр хийнэ.',
              '- Таны олон нийтэд нээлттэй оруулсан байгаа үйлчилгээ.',
              '- Таны оруулсан үйлчилгээг бусад хэрэглэгч хүлээн авсан, хэрэгжиж байгаа мэдээлэл',
              '- Таны бусад хэрэглэгчдийн оруулсан үйлчилгээг хадгалсан мэдээлэл',
              '- Таны оруулсан үйлчилгээ хийгдэж дууссан, хадгалагдсан мэдээлэл',
              '- Хэрэглэгчийн төлбөр төлөх, хүлээн авах дансны мэдээлэл',
              '- Таны үйлчилгээг захиалсан, хүлээн, баталгаажуулахыг хүссэн авсан тухай мэдээлэл',
              '- Hub star программ нь Монгол, Англи, Хятад хэл дээр ажиллах боломжтой',
              '- Hub star программ дээрх өөрийн профайлыг устгах. Анхааруулга! Устгасан профайлаар дахин бүртгэл үүсгэж нэвтрэх тохиолдолд админд хандах шаардлагатай',
              '- Hub star программаас гарах',
            ]}
          />
          <IntroSectionWeb
            className=""
            id="new-ad"
            title="Үйлчилгээ байршуулах"
            imagePaths={['/images/introduction/new-service.png']}
            descriptions={[
              'Hub star программд үйлчилгээ байршуулахад онцгой үйлчилгээ эсвэл энгийн үйлчилгээ байршуулахаас шалтгаалан аль нэг төрлийг сонгоно',
              'Та өөрийн үйлчилгээг байршуулах төрлийг сонгосны дараа шаардлагатай цонхнуудыг бөглөн хадгалах товчийг дарснаар таны үйлчилгээ байршина.',
            ]}
          />
          <IntroSectionWeb
            className=""
            id="ad-order"
            title="Үйлчилгээ захиалах"
            imagePaths={['/images/introduction/notify.png']}
            descriptions={[
              'Үйлчилгээг байршуулагч мэдэгдлийг зөвшөөрсөн /татгалзах/ товчийг дарсан тохиолдолд захиалагчдад иргэж мэдэгдэл ирэх бөгөөд хоёр талын хийгдэж буй ажил хэсэгт байршина.',
            ]}
          />
        </div>

        <div className="mx-15 max-w-sm top-20 sticky h-screen">
          <div className="text-lg font-bold">Mobile version</div>
          {appSections.map((item, index) => (
            <Button
              key={index}
              radius="sm"
              variant="light"
              className={classNames(
                'my-1 font-bold w-full justify-start',
                activeSection == item.id ? 'bg-mainColor text-white' : 'text-[#909294]'
              )}
              onClick={() => router.push(`#${item.id}`)}
            >
              {item.name}
            </Button>
          ))}
          <div className="text-lg font-bold">Web version</div>
          {webSections.map((item, index) => (
            <Button
              key={index}
              radius="sm"
              variant="light"
              className={classNames(
                'my-1 font-bold w-full justify-start',
                activeSection == item.id ? 'bg-mainColor text-white' : 'text-[#909294]'
              )}
              onClick={() => router.push(`#${item.id}`)}
            >
              {item.name}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Introduction;
