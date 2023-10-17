import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

function Image() {
  const [images, setImages] = useState<string[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileRef?.current?.click();
  };

  const handleImageClick = (index: number) => {
    setSelectedIndices(prev => {
      if (prev.includes(index) || prev.length === 2) {
        return [];
      } else {
        return [...prev, index];
      }
    });
  };

  useEffect(() => {
    if (selectedIndices.length === 2) {
      const [first, second] = selectedIndices;
      const newImages = [...images];
      [newImages[first], newImages[second]] = [newImages[second], newImages[first]];
      setImages(newImages);
      setSelectedIndices([]);
    }
  }, [selectedIndices, images]);

  const uploadFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;

    if (files) {
      const imageArray = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(imageArray);
    }
  };

  return (
    <Container imageLength={images.length}>
      <input ref={fileRef} type="file" multiple accept="image/*" onChange={uploadFiles} />
      {images.length === 0 ? (
        <>
          {' '}
          <ImageIcon>
            <span className="material-symbols-outlined">imagesmode</span>
          </ImageIcon>
          <Explain>
            <h2>파일을 드래그하여 업로드 하세요</h2>
            <button onClick={handleClick}>파일 열기</button>
          </Explain>
        </>
      ) : (
        <>
          {' '}
          <ImageBox>
            {images.map((image, index) => (
              <Img index={index} isSelected={selectedIndices.includes(index)} onClick={() => handleImageClick(index)}>
                <img src={image} />
              </Img>
            ))}
          </ImageBox>
        </>
      )}
    </Container>
  );
}

export default Image;

const Container = styled.div<{ imageLength: number }>`
  width: 31.25rem;
  height: 37.5rem;

  box-sizing: border-box;
  padding: 5.94rem 6.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  background-color: #ececec;
  border: 1px dashed #000;
  gap: 0.9375rem;

  input {
    width: 100%;
    height: 100%;
    display: none;
    position: absolute;
    top: 0%;
  }

  h2 {
    width: 13.625rem;
    height: 1.1875rem;

    font-size: 1rem;
    font-weight: 400;
  }

  button {
    width: 9.9375rem;
    height: 2.5rem;

    border-radius: 0.5rem;
    background: #9aa0a6;
    border: none;

    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.25rem;
    letter-spacing: 0.04rem;
    color: #ffffff;

    cursor: pointer;
  }
`;

const ImageIcon = styled.div`
  width: 12.6rem;
  height: 12.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 3rem;
    color: #9aa0a6;
  }
`;
const Explain = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
  gap: 0.94rem;
`;

const ImageBox = styled.div`
  position: absolute;
  top: 0%;

  display: flex;
  flex-wrap: wrap;
`;
const Img = styled.div<{ index: number; isSelected: boolean }>`
  img {
    width: ${props => (props.index === 0 ? '31.25rem' : '7.8125rem')};
    height: ${props => (props.index === 0 ? '29.25rem' : '7.8845rem')};
    filter: ${props => (props.isSelected ? 'brightness(50%)' : 'none')};
  }
`;
