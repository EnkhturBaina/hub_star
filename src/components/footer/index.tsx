import Motion from '@components/common/motion';
import { FooterLink, FooterTitle } from './helper';
import { Divider } from 'antd';
import { FacebookIcon, LinkedInIcon, XIcon } from '@components/common/icons';

const Footer: React.FC = () => {
  return (
    <footer className="border-stroke bg-mainDark">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8 2xl:px-0">
        {/* <!-- Footer Top --> */}
        <div className="border-b pt-10 lg:pt-15 pb-6">
          <div className="flex flex-wrap gap-8 lg:justify-between lg:gap-0">
            <div className="flex w-full flex-col gap-8 md:flex-row md:justify-between md:gap-0">
              <Motion>
                <FooterTitle title="hubstar" />
                <ul>
                  <li>
                    <FooterLink href="/hubstar/about" title="Бидний тухай" />
                  </li>
                  <li>
                    <FooterLink href="/hubstar/research" title="Нийтлэг хайлт" />
                  </li>
                  <li>
                    <FooterLink href="/hubstar/legally" title="Хууль эрх зүй" />
                  </li>
                  <li>
                    <FooterLink href="/hubstar/terms" title="Үйлчилгээний нөхцөл" />
                  </li>
                  <li>
                    <FooterLink href="/hubstar/permission" title="Тусгай зөвшөөрөл" />
                  </li>
                </ul>
              </Motion>

              <Motion>
                <FooterTitle title="Тусламж" />
                <ul>
                  <li>
                    <FooterLink href="/support/feedback" title="Санал хүсэлт илгээх" />
                  </li>
                  <li>
                    <FooterLink href="/support/membership" title="Хамтран ажиллах" />
                  </li>
                  <li>
                    <FooterLink href="/support" title="Тусламжын хэсэг" />
                  </li>
                  <li>
                    <FooterLink href="/support/faq" title="Түгээмэл асуулт хариулт" />
                  </li>
                  <li>
                    <FooterLink href="/support/introduction" title="Үйлчилгээний танилцуулга" />
                  </li>
                </ul>
              </Motion>
              <Motion>
                <h4 className="mb-9 lg:text-itemtitle2 text-xl font-semibold text-gray-400 ">
                  ХОЛБОО БАРИХ
                </h4>

                <ul className="lg:text-base text-sm">
                  <li>
                    <a href="#" className="mb-3 inline-block text-white hover:text-mainColor">
                      Утас: 9999-4698
                    </a>
                  </li>
                  <li>
                    <a href="#" className="mb-3 inline-block text-white hover:text-mainColor">
                      Имэйл: metastartllc@gmail.com
                    </a>
                  </li>
                  <li>
                    <a href="#" className="mb-3 inline-block text-white hover:text-mainColor">
                      Хаяг: Улаанбаатар 14192, Сүхбаатар, 7-р хороо, Orient Center оффис 5 давхар
                    </a>
                  </li>
                </ul>
              </Motion>
            </div>
          </div>
          {/* <!-- Footer Top --> */}

          {/* <!-- Footer Bottom --> */}
          <div className="flex flex-col flex-wrap items-center justify-center gap-5 border-stroke py-7 lg:flex-row lg:justify-between lg:gap-0">
            <Motion>
              <ul className="flex flex-wrap items-center gap-4">
                <li className="flex flex-row">
                  <FooterLink href="/training" title="Хэрэглэх заавар" />
                  <Divider type="vertical" className="h-5 w-0.5 bg-white ml-5" />
                </li>
                <li className="flex flex-row">
                  <FooterLink href="/training/new_ad" title="Сурталчилгаа байршуулах" />
                  <Divider type="vertical" className="h-5 w-0.5 bg-white ml-5" />
                </li>
                <li className="flex flex-row">
                  <FooterLink href="/training/policy" title="Нууцлалын бодлого" />
                  <Divider type="vertical" className="h-5 w-0.5 bg-white ml-5" />
                </li>
                <li className="flex flex-row">
                  <FooterLink href="/training/register" title="Бүртгүүлэх" />
                </li>
              </ul>
              <p className="mt-4 text-gray-300 font-light">
                &copy; {new Date().getFullYear()} HubStar.MN - Монголын барилгын нэгдсэн портал
                сайт.
              </p>
            </Motion>

            <Motion className="animate_top flex flex-row items-center flex-wrap">
              <ul className="flex items-center gap-5">
                <li>
                  <a
                    href="https://www.facebook.com/HubStarMN?mibextid=ZbWKwL"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookIcon aria-label="facebook" />
                  </a>
                </li>
                <li>
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                    <XIcon aria-label="x" />
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon aria-label="linkedin" />
                  </a>
                </li>
              </ul>
            </Motion>
          </div>
          {/* <!-- Footer Bottom --> */}
        </div>
      </div>
    </footer>
  );
};
export default Footer;
