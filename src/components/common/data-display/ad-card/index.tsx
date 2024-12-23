import { Avatar, Card, Space } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { ShareAd } from '@components/ad';
import { SaveIcon, ShareIcon } from '@components/common/icons';

const AdCard: React.FC = () => {
  const [isShareModal, setIsShareModal] = useState(false);

  const actions: React.ReactNode[] = [
    <div key="save">
      <Space>
        <SaveIcon width={24} height={24} /> Хадгалах
      </Space>
    </div>,
    <div key="edit">Зөвлөмж</div>,
    <div key="share" onClick={() => setIsShareModal(true)}>
      <Space>
        <ShareIcon /> Хуваалцах
      </Space>
    </div>,
  ];

  return (
    <>
      <ShareAd
        url="https://www.hubstar.mn"
        openShareModal={isShareModal}
        onClose={() => setIsShareModal(false)}
      />
      <Card
        loading={false}
        actions={actions}
        //   hoverable
        style={{ width: 300 }}
        cover={<Image width={240} height={240} alt="image" src={'/signin_bg.jpg'} />}
      >
        <Card.Meta
          avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
          title={<Link href="/ad/detail">Card title</Link>}
          description={
            <>
              <p>This is the description</p>
              <p>This is the description</p>
            </>
          }
        />
      </Card>
    </>
  );
};
export default AdCard;
