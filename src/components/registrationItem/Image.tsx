import { useState, useRef } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

function Image() {
  const [images, setImages] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileRef?.current?.click();
  };
  const uploadFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;

    if (files) {
      const imageArray = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(imageArray);
    }
  };

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    setImages(oldImage => {
      const copyImages = [...oldImage];
      copyImages.splice(source.index, 1);
      copyImages.splice(destination.index, 0, draggableId);
      return copyImages;
    });
  };
  return (
    <Container imageLength={images.length}>
      {images.length !== 0 ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="two">
            {provider => (
              <ImageBox ref={provider.innerRef} {...provider.droppableProps}>
                {images.map((url, index) => (
                  <Draggable key={url} draggableId={url} index={index}>
                    {provider => (
                      <div ref={provider.innerRef} {...provider.dragHandleProps} {...provider.draggableProps}>
                        <img src={url} alt={`images${index}`} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provider.placeholder}
              </ImageBox>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <>
          <ImageIcon>
            <span className="material-symbols-outlined">imagesmode</span>
          </ImageIcon>
          <input ref={fileRef} type="file" multiple accept="image/*" onChange={uploadFiles} />
          <h2>파일을 드래그하여 업로드 하세요</h2>
          <button onClick={handleClick}>파일 열기</button>
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

  display: flex;

  background-color: #ececec;
  border: 1px dashed #000;
  gap: 0.9375rem;

  input {
    width: 100%;
    height: 100%;

    /* display: none; */
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
const ImageBox = styled.div`
  width: 31.25rem;
  height: 37.5rem;

  display: flex;
  flex-wrap: wrap;
  position: relative;

  > div:first-child img {
    width: 31.25rem;
    height: 29.2rem;
  }

  > div:not(:first-child) img {
    width: 7.8125rem;
    height: 7.8125rem;
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
