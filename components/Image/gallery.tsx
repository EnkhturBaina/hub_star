import { Button } from '@heroui/react';
import Image from 'next/image';
import { useRef } from 'react';
import { Slide, SlideshowRef } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { ButtonGroup } from 'semantic-ui-react';
type Props = {
  images: string[];
};
const Gallery: React.FC<Props> = ({ images }) => {
  const slideRef = useRef<SlideshowRef>(null);
  return (
    <div className="slide-container">
      <Slide indicators={true} ref={slideRef}>
        {images.map((slideImage, index) => (
          <div key={index}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '400px',
                backgroundSize: 'cover',
              }}
            />
            <Image src={slideImage} alt="" fill />
          </div>
        ))}
      </Slide>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '50px 0' }}>
        <ButtonGroup>
          {images.map((item, index) => (
            <Button
              key={index}
              onPress={() => slideRef.current.goTo(index)}
              style={{ backgroundImage: `url(${item})` }}
            ></Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
};
export default Gallery;
