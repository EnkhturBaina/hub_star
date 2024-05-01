'use client';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
type Props = {
  items: string[];
};
const BreadCrumbs: React.FC<Props> = ({ items }) => (
  <Breadcrumbs
    separator="/"
    itemClasses={{
      separator: 'px-2',
    }}
  >
    {items?.map((item, index) => {
      return <BreadcrumbItem key={index}>{item}</BreadcrumbItem>;
    })}
  </Breadcrumbs>
);

export default BreadCrumbs;
