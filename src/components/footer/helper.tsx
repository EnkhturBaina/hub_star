import Link from 'next/link';

type LinkProps = {
  href: string;
  title: string;
};
export const FooterLink: React.FC<LinkProps> = ({ href, title }) => {
  return (
    <Link
      href={href}
      className="lg:text-base text-sm mb-3 inline-block text-white hover:text-mainColor"
    >
      {title}
    </Link>
  );
};

type TitleProps = {
  title: string;
};
export const FooterTitle: React.FC<TitleProps> = ({ title }) => {
  return (
    <h4 className="mb-9  lg:text-itemtitle2 text-xl text-item title2 font-semibold text-gray-400">
      {title.toUpperCase()}
    </h4>
  );
};
