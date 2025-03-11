import { ReferenceService } from '@services/reference/reference.service';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface IProps {
  className?: string;
  children: React.ReactNode;
  setFileId: (fileId: number) => void;
}
const ImageUpload: React.FC<IProps> = ({ className, children, setFileId }) => {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      try {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
          throw new Error('Unsupported file type. Please upload JPEG, PNG, or JPG files.');
        }
        const response = await ReferenceService.fileUpload(file); // Wait for the response
        if (response.success) {
          setFileId(response.response.id); // Call setFileId with the file ID
        } else {
          throw new Error('File upload failed.'); // Handle unsuccessful file upload
        }
      } catch (err) {
        console.error('File upload error:', err);
      }
    },
    [setFileId]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div className={className} {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
    </div>
  );
};
export default ImageUpload;
