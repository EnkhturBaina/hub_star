import Motion from '@components/common/motion';
import { FooterLink, FooterTitle } from './helper';
import { Divider } from 'antd';
import { FacebookIcon, LinkedInIcon, XIcon } from '@components/common/icons';
import { useTranslation } from 'next-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
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
                    <FooterLink href="/hubstar/about" title={t('about')} />
                  </li>
                  <li>
                    <FooterLink href="/hubstar/research" title={t('commonSearch')} />
                  </li>
                  <li>
                    <FooterLink href="/hubstar/legally" title={t('legally')} />
                  </li>
                  <li>
                    <FooterLink href="/hubstar/terms" title={t('terms')} />
                  </li>
                  <li>
                    <FooterLink href="/hubstar/permission" title={t('permission')} />
                  </li>
                </ul>
              </Motion>

              <Motion>
                <FooterTitle title={t('support')} />
                <ul>
                  <li>
                    <FooterLink href="/support/feedback" title={t('feedback')} />
                  </li>
                  <li>
                    <FooterLink href="/support/membership" title={t('membership')} />
                  </li>
                  <li>
                    <FooterLink href="/support" title={t('support')} />
                  </li>
                  <li>
                    <FooterLink href="/support/faq" title={t('faq')} />
                  </li>
                  <li>
                    <FooterLink href="/support/introduction" title={t('introduction')} />
                  </li>
                </ul>
              </Motion>
              <Motion>
                <h4 className="mb-9 lg:text-itemtitle2 text-xl font-semibold text-gray-400 ">
                  {t('contact')}
                </h4>

                <ul className="lg:text-base text-sm">
                  <li>
                    <a href="#" className="mb-3 inline-block text-white hover:text-mainColor">
                      {t('phone')}: 9999-4698
                    </a>
                  </li>
                  <li>
                    <a href="#" className="mb-3 inline-block text-white hover:text-mainColor">
                      {t('mail')}: metastartllc@gmail.com
                    </a>
                  </li>
                  <li>
                    <a href="#" className="mb-3 inline-block text-white hover:text-mainColor">
                      {t('address')}: Улаанбаатар 14192, Сүхбаатар, 7-р хороо, Orient Center оффис 5
                      давхар
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
                  <FooterLink href="/training" title={t('training')} />
                  <Divider type="vertical" className="h-5 w-0.5 bg-white ml-5" />
                </li>
                <li className="flex flex-row">
                  <FooterLink href="/training/post-ad" title={t('postAd')} />
                  <Divider type="vertical" className="h-5 w-0.5 bg-white ml-5" />
                </li>
                <li className="flex flex-row">
                  <FooterLink href="/training/policy" title={t('policy')} />
                  <Divider type="vertical" className="h-5 w-0.5 bg-white ml-5" />
                </li>
                <li className="flex flex-row">
                  <FooterLink href="/training/register" title={t('register')} />
                </li>
              </ul>
              <p className="mt-4 text-gray-300 font-light">
                &copy; {new Date().getFullYear()} HubStar.MN - {t('siteDescription')}.
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
