'use client';
import AdSkeleton from '@/components/Skeleton/AdSkeleton';
import { ReferenceService } from '@/service/reference/reference.service';
import { FooterMenuPage } from '@/types/reference';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

/** TODO ETR bro Menu page */
type Props = {
  params: {
    slug: number;
  };
};
const MenuPage: NextPage<Props> = ({ params }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<FooterMenuPage>();
  useEffect(() => {
    ReferenceService.getMenuPage(params.slug)
      .then(res => {
        if (res.success) {
          setPage(res.response);
          setLoading(false);
        }
      })
      .catch(err => toast.error(err));
  }, [params]);
  return (
    <section className="pt-35 lg:pt-40 xl:pt-42.5">
      {loading ? (
        <AdSkeleton />
      ) : (
        <div>
          <div>{page.image && page.image.path}</div>
          <div>{page.title}</div>
          <div>{page.description}</div>
          <div dangerouslySetInnerHTML={{ __html: page.body }} />
        </div>
      )}
    </section>
  );
};
export default MenuPage;
