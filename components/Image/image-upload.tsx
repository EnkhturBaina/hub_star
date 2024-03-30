import { ReferenceService } from '@/service/reference/reference.service';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface IProps {
  className?: string;
  children: React.ReactNode;
  setFileId: (fileId: number) => void;
}
const ImageUpload: React.FC<IProps> = ({ className, children, setFileId }) => {
  const onDrop = useCallback(async (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    try {
      ReferenceService.fileUpload(file).then(response => {
        if (response.success) {
          setFileId(response.response.id);
          response.response.id;
        }
      });
    } catch (err) {
      console.error(err);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div className={className} {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
    </div>
  );
};
export default ImageUpload;
