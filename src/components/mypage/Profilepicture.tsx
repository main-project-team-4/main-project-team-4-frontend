import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { getCookie } from '../../utils/cookie';
import { changeImages } from '../../apis/mypage/members';
import { theme } from '../../styles/theme';
import imageCompression from 'browser-image-compression';
import ProfileSvg from '../../assets/svgs/ProfileSvg';
import PencilSvg from '../../assets/svgs/PencilSvg';

type DataInfo = {
  data: {
    location_name: string;
    member_id: number;
    member_image: string;
    member_nickname: string;
    shop_id: number;
  };
};

function Profilepicture({ data }: DataInfo) {
  const [image, setImage] = useState('https://ifh.cc/g/kXNjcT.jpg');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState<FormData>(new FormData());
  const [confirm, setConfirm] = useState(false);
  const queryClient = useQueryClient();
  const token = getCookie('token');

  // 이미지 저장
  const saveImgFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      const file = event.currentTarget.files[0];
      const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 840,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        const result = await imageCompression.getDataUrlFromFile(compressedFile);

        const newFile = new File([compressedFile], 'image.jpeg', { type: 'image/jpeg' });
        console.log(newFile);

        const newFormData = new FormData();
        newFormData.append('image', newFile);

        setImage(result);
        setFormData(newFormData);
        setConfirm(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (data?.member_image) {
      setImage(data?.member_image);
    }
  }, [data?.member_image]);

  // 이미지 추가
  const mutation = useMutation(changeImages, {
    onSuccess: () => {
      queryClient.invalidateQueries('profileImage');
      queryClient.invalidateQueries('myInfo');
    },
  });
  const changeImage = () => {
    inputRef.current?.click();
  };
  const confirmImage = () => {
    mutation.mutate({ token, formData });
    setConfirm(false);
  };
  return (
    <Container>
      <ProfileImage>{image !== '' ? <img src={image} /> : <ProfileSvg />}</ProfileImage>
      <PencilImage back={confirm ? 0 : 1}>
        <input ref={inputRef} type="file" accept="image/*" onChange={saveImgFile} />
        {confirm ? (
          <span onClick={confirmImage} style={{ background: `${theme.pointColor}`, color: 'white' }} className="material-symbols-outlined">
            done
          </span>
        ) : (
          <div onClick={changeImage}>
            <PencilSvg />
          </div>
        )}
      </PencilImage>
      <h3>{data?.member_nickname}</h3>
    </Container>
  );
}

export default Profilepicture;

const Container = styled.div`
  width: 6rem;
  height: 9.0625rem;

  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;

  position: relative;

  h3 {
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

const ProfileImage = styled.div`
  width: 5.625rem;
  height: 5.625rem;

  border-radius: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 5.625rem;
    height: 5.625rem;
    border-radius: 100%;
  }

  svg {
    width: 5.625rem;
    height: 5.625rem;
    font-size: 4.375rem;
    color: #c1c7cd;
    background-color: ${theme.navy};
    border-radius: 100%;
  }
`;

const PencilImage = styled.div<{ back: number }>`
  width: 2.125rem;
  height: 2.125rem;
  flex-shrink: 0;
  background-color: ${props => (props.back ? 'white' : theme.pointColor)};

  cursor: pointer;

  border-radius: 100%;

  position: absolute;
  top: 3.5rem;
  right: -0.2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  input {
    display: none;
  }
`;
