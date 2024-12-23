import { FacebookIcon, XIcon } from '@components/common/icons';
import { Modal } from 'antd';
import { FacebookShareButton, TwitterShareButton } from 'next-share';

interface ShareAdProps {
  url: string;
  openShareModal?: boolean;
  onClose?: () => void;
}

const ShareAd: React.FC<ShareAdProps> = ({ url, openShareModal, onClose }) => {
  return (
    <Modal title="Хуваалцах" open={openShareModal} onCancel={onClose}>
      <FacebookShareButton url={url} className="mr-2 border border-gray-300 p-2 rounded-md">
        <FacebookIcon />
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <XIcon />
      </TwitterShareButton>
    </Modal>
  );
};
export default ShareAd;
