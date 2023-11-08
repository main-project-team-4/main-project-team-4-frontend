import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { getCookie } from '../../utils/cookie';
import { changeImages } from '../../apis/mypage/members';
import { theme } from '../../styles/theme';
import imageCompression from 'browser-image-compression';

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
      <ProfileImage>
        {image !== '' ? (
          <img src={image} />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70" fill="none">
            <path
              d="M0.605186 54.0187C8.85981 63.7926 21.205 70 35 70C48.795 70 61.1402 63.7926 69.3948 54.0187C59.2367 48.2769 47.501 45 35 45C22.499 45 10.7633 48.2769 0.605186 54.0187ZM50 15C50 23.2843 43.2843 30 35 30C26.7157 30 20 23.2843 20 15C20 6.71573 26.7157 0 35 0C43.2843 0 50 6.71573 50 15Z"
              fill="white"
            />
          </svg>
        )}
      </ProfileImage>
      <PencilImage back={confirm ? 0 : 1}>
        <input ref={inputRef} type="file" accept="image/*" onChange={saveImgFile} />
        {confirm ? (
          <span onClick={confirmImage} style={{ background: `${theme.pointColor}`, color: 'white' }} className="material-symbols-outlined">
            done
          </span>
        ) : (
          <svg onClick={changeImage} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <g clipPath="url(#clip0_473_8532)">
              <path
                d="M11.332 2.00004C11.5071 1.82494 11.715 1.68605 11.9438 1.59129C12.1725 1.49653 12.4177 1.44775 12.6654 1.44775C12.913 1.44775 13.1582 1.49653 13.387 1.59129C13.6157 1.68605 13.8236 1.82494 13.9987 2.00004C14.1738 2.17513 14.3127 2.383 14.4074 2.61178C14.5022 2.84055 14.551 3.08575 14.551 3.33337C14.551 3.58099 14.5022 3.82619 14.4074 4.05497C14.3127 4.28374 14.1738 4.49161 13.9987 4.66671L4.9987 13.6667L1.33203 14.6667L2.33203 11L11.332 2.00004Z"
                stroke="#272E3F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_473_8532">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
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
