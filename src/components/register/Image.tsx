import { useState, useRef, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

function Image({ setMainImg, setSubImg }) {
  const [images, setImages] = useState<string[]>([]);
  const [selectedPicture, setSelectedPicture] = useState('');
  const [viewAlert, setViewAlert] = useState(false);
  const [hovered, setHovered] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileRef?.current?.click();
  };

  const clickHandler = (index: number) => {
    setSelectedPicture(images[index]);
  };

  const handleRemoveImage = (e, index: number) => {
    e.stopPropagation();
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    if (images[index] === selectedPicture) {
      setSelectedPicture(newImages[0] || '');
    }
  };

  const handleMainImageRemove = () => {
    const index = images.indexOf(selectedPicture);
    if (index !== -1) {
      handleRemoveImage({ stopPropagation: () => {} }, index);
    }
  };

const uploadFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
  const files = event.currentTarget.files;

  if (files && files.length > 0) {
    const fileArray = Array.from(files);

    if (fileArray.length + images.length <= 5) {
      const imageArray = fileArray.map(file => URL.createObjectURL(file));
      setImages(prevImages => [...prevImages, ...imageArray]);
      setSelectedPicture(imageArray[0]);

      setMainImg(fileArray[0]); // File 객체를 직접 설정
      setSubImg(fileArray.slice(1)); // File 객체 배열을 직접 설정

      console.log('fileArray.slice(1)', fileArray.slice(1));
      event.currentTarget.value = null;

    } else {
      setViewAlert(true);
    }
  }
};


  useEffect(() => {
    if (viewAlert) {
      const timerId = setTimeout(() => {
        setViewAlert(false);
      }, 3000); // 3000ms = 3s

      return () => clearTimeout(timerId);
    }
  }, [viewAlert]);

  const onDragEnd = result => {
    if (!result.destination) return;

    const { source, destination } = result;
    const reorderedImages = Array.from(images);
    const [removed] = reorderedImages.splice(source.index, 1);
    reorderedImages.splice(destination.index, 0, removed);

    setImages(reorderedImages);
  };

  const showHoverAlert = () => {
    setHovered(true);
    setTimeout(() => {
      setHovered(false);
    }, 5000);
  };

  return (
    <Container imagelength={images.length}>
      {images.length === 0 ? (
        <>
          {viewAlert && <Notice>사진 첨부는 5개까지 가능합니다</Notice>}
          <Layout>
            <input ref={fileRef} type="file" multiple accept="image/*" onChange={uploadFiles} />
            <Explain>
              <span className="material-symbols-outlined">imagesmode</span>
              <h2>사진을 드래그하여 업로드 하세요</h2>
              <p>(0/5)</p>
              <FileBtn onClick={handleClick}>파일 열기</FileBtn>
            </Explain>
          </Layout>
        </>
      ) : (
        <>
          {viewAlert && <Notice className="short">사진 첨부는 5개까지 가능합니다</Notice>}
          <MainImg>
            <img src={selectedPicture} alt="" />
            <span className="material-symbols-outlined" onClick={handleMainImageRemove}>
              close
            </span>
          </MainImg>

          <DragDropContext onDragEnd={onDragEnd}>
            <ImgsLayout onMouseEnter={showHoverAlert}>
              <Droppable droppableId="droppable" direction="horizontal">
                {provided => (
                  <Imgs ref={provided.innerRef} {...provided.droppableProps}>
                    {images.map((image, index) => (
                      <Draggable key={image} draggableId={image} index={index}>
                        {provided => (
                          <Img ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={() => clickHandler(index)}>
                            {index === 0 && <div>대표 이미지</div>}
                            <img src={image} alt="" />
                            <span className="material-symbols-outlined" onClick={e => handleRemoveImage(e, index)}>
                              close
                            </span>
                          </Img>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Imgs>
                )}
              </Droppable>
              {images.length < 5 && (
                <AddPictures onClick={handleClick}>
                  <input ref={fileRef} type="file" multiple accept="image/*" onChange={uploadFiles} />
                  <span className="material-symbols-outlined">add_photo_alternate</span>
                  사진 추가
                </AddPictures>
              )}
            </ImgsLayout>
          </DragDropContext>
          {hovered && <Alert>드래그하면 이미지를 옮길 수 있어요</Alert>}
        </>
      )}
    </Container>
  );
}
export default Image;

const Container = styled.div<{ imagelength: number }>`
  width: 31.25rem;
  /* height: 32.5rem; */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const FileBtn = styled.button`
  all: unset;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 9.9375rem;
  height: 2.5rem;
  background-color: #9aa0a6;
  border-radius: 0.1875rem;
  border: 1px dotted #9aa0a6;
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1.25rem;
  letter-spacing: 0.04rem;
  color: #ffffff;
  cursor: pointer;

  span {
    margin-bottom: 0.3rem;
  }
`;
const Notice = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  padding: 1.25rem 0;
  background-color: #5656567d;
  color: white;
  bottom: 26px;
  z-index: 1;

  &.short {
    bottom: 100px;
  }
`;

const Layout = styled.div`
  width: 31.25rem;
  height: 35.9rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ececec;
  border: 1px dashed ${theme.deactivateBtn};
  margin-top: 1.3rem;
  border-radius: 0.75rem;
  input {
    width: 100%;
    height: 100%;
    display: none;
  }

  span {
    font-size: 3rem;
    color: #9aa0a6;
  }
`;
const Explain = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex-direction: column;
  gap: 0.94rem;

  h2 {
    width: 13.625rem;
    height: 1.1875rem;
    font-size: 1rem;
    font-weight: 400;
  }
`;

const MainImg = styled.div`
  position: relative;
  width: 31.25rem;
  height: 31.25rem;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
  background-color: white;
  img {
    width: 100%;
    height: 100%;
    border-radius: 0.75rem;
  }
  span {
    position: absolute;
    font-size: 1rem;
    top: 7px;
    right: 7px;
    border-radius: 50%;
    background-color: #565656a3;
    color: white;
    cursor: pointer;
  }
`;
const ImgsLayout = styled.div`
  display: flex;
`;

const Imgs = styled.div`
  display: flex;
  align-items: center;
  /* width: 29rem; */
  gap: 0.8rem;
  flex-wrap: wrap;
  button {
    width: 5rem;
    height: 5rem;
    input {
      display: none;
    }
  }
`;
const AddPictures = styled.button`
  all: unset;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${theme.cancelBtn};
  width: 5rem;
  height: 5rem;
  margin-left: 0.8rem;
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1.25rem;
  letter-spacing: 0.04rem;
  border-radius: 0.1875rem;
  color: #ffffff;
  cursor: pointer;

  span {
    margin-bottom: 0.3rem;
  }
  input {
    display: none;
  }
`;

const Img = styled.div`
  position: relative;
  width: 5rem;
  height: 5rem;
  border: 1px solid #90909096;
  background-color: white;
  img {
    width: 100%;
    height: 100%;
  }
  span {
    font-size: 0.75rem;
    position: absolute;
    margin: 5px;
    top: 2px;
    right: 2px;
    border-radius: 50%;
    background-color: #565656a3;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #000000a1;
    }
  }
  div {
    width: 100%;
    height: 15px;
    line-height: 15px;
    font-size: 12px;
    text-align: center;
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: #59595974;
  }
`;

const Alert = styled.div`
  margin-top: 1rem;
  color: ${theme.cancelBtn};
`;
