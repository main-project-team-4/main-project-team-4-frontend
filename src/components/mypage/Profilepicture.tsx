import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { getCookie } from '../../utils/cookie';
import { changeImages } from '../../apis/mypage/members';

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
  const [image, setImage] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState<FormData>(new FormData());
  const [confirm, setConfirm] = useState(false);
  const queryClient = useQueryClient();

  const token = getCookie('token');

  const saveImgFile = () => {
    if (inputRef.current) {
      const file = inputRef.current.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImage(reader.result as string);

          const newFormData = new FormData();
          newFormData.append('image', file);

          setFormData(newFormData);
          setConfirm(true);
        };
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
      <ProfileImage>{image !== '' ? <img src={image} /> : <span className="material-symbols-outlined">person</span>}</ProfileImage>
      <PencilImage>
        <input ref={inputRef} type="file" accept="image/*" onChange={saveImgFile} />
        {confirm ? (
          <span onClick={confirmImage} className="material-symbols-outlined">
            done
          </span>
        ) : (
          <span onClick={changeImage} className="material-symbols-outlined">
            edit
          </span>
        )}
      </PencilImage>
      <h3>{data?.member_nickname}</h3>
    </Container>
  );
}

export default Profilepicture;

const Container = styled.div`
  width: 9.375rem;
  height: 12.8125rem;

  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;

  position: relative;

  h3 {
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.04rem;
  }
`;

const ProfileImage = styled.div`
  width: 9.375rem;
  height: 9.375rem;
  background-color: #f2f4f8;
  border-radius: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 9.375rem;
    height: 9.375rem;
    border-radius: 100%;
  }

  span {
    font-size: 4.375rem;
    color: #c1c7cd;
  }
`;

const PencilImage = styled.div`
  width: 3.125rem;
  height: 3.125rem;
  flex-shrink: 0;
  background-color: #dbdbdb;

  cursor: pointer;

  border-radius: 100%;

  position: absolute;
  top: 6rem;
  right: 0rem;

  display: flex;
  align-items: center;
  justify-content: center;

  input {
    display: none;
  }
`;
