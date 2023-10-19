import styled from 'styled-components';
import { DetailItem } from '../../apis/getItems/Item';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { putWishes, checkWishes } from '../../apis/posting/posting';
import { getCookie } from '../../utils/cookie';

export default function DetailPosting() {
  const location = useLocation();
  const { id } = location.state || {};
  const token = getCookie('token');

  const { data: detailItems } = useQuery(['detailitem', id], () => {
    return DetailItem(id);
  });
  const [mainImg, setMainImg] = useState('');

  useEffect(() => {
    if (detailItems) {
      setMainImg(detailItems.item_image_list[0]);
    }
  }, [detailItems]);

  //찜하기
  const [wishState, setWishState] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation(putWishes, {
    onSuccess: () => {
      queryClient.invalidateQueries(['putwishes', detailItems.item_id]);
      setWishState(!wishState);
    },
  });
  const onClickHeart = () => {
    mutation.mutate({ token, itemId: detailItems.item_id });
    setWishState(wishState);
  };

  // 찜여부 확인
  const { data: isWishing } = useQuery(['checkWishes', location.state.id], () => checkWishes({ token, itemId: location.state.id }));
  useEffect(() => {
    if (isWishing !== undefined && isWishing !== null) {
      setWishState(isWishing.is_wishing);
    }
  }, [isWishing]);

  return detailItems ? (
    <Container>
      <ImageComtainer>
        <img className="firstImg" src={mainImg} alt="게시물"></img>
        <ImageBox>{detailItems.item_image_list?.map((item: string, index: number) => <img key={index} alt="게시물" onClick={() => setMainImg(item)} />)}</ImageBox>
      </ImageComtainer>
      <PostingContainer>
        <PostingBox>
          <h1>{detailItems.item_name}</h1>
          <h3>{`${detailItems?.category_l_name} > ${detailItems?.category_m_name}`}</h3>
          <div>{detailItems.item_comment}</div>
        </PostingBox>
        <PriceBox state={wishState ? 1 : 0}>
          <h1>{Number(detailItems.item_price).toLocaleString()} 원</h1>
          <div>
            <button onClick={onClickHeart} className="Follow-Button">
              <span className="material-symbols-outlined">favorite</span>
            </button>
            <button className="Chat-Button">채팅하기</button>
          </div>
        </PriceBox>
      </PostingContainer>
    </Container>
  ) : null;
}

const Container = styled.div`
  width: 75rem;
  height: 40.1875rem;
  box-sizing: border-box;

  display: flex;
  align-items: flex-start;
  gap: 3.12rem;
`;

const ImageComtainer = styled.div`
  width: 37.5rem;
  height: 40.1875rem;
  gap: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .firstImg {
    width: 37.5rem;
    height: 30.625rem;
    border-radius: 0.75rem;
  }
`;
const ImageBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  width: 37.5rem;
  height: 8.8125rem;

  img {
    width: 8.8125rem;
    height: 8.8125rem;
    border-radius: 0.75rem;
  }
`;

const PostingContainer = styled.div`
  width: 34.375rem;
  height: 40.1875rem;
  gap: 1.5rem;
`;

const PostingBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  width: 34.375rem;
  height: 30.1875rem;

  h1 {
    font-size: 2.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  h3 {
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.5rem;
  }

  div {
    width: 34.375rem;
    height: 22.0625rem;

    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.015rem;
  }
`;

const PriceBox = styled.div<{ state: number }>`
  margin-top: 1.5rem;
  width: 34.375rem;
  height: 8.5rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  div {
    display: flex;
    gap: 0.75rem;
  }

  h1 {
    margin-left: auto;
    font-size: 2.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 0.75rem;
  }

  .Follow-Button {
    display: flex;
    width: 3.25rem;
    height: 3.25rem;
    padding: 1rem 1.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    border-radius: 0.5rem;

    span {
      color: ${props => (props.state === 1 ? 'red' : 'none')};
    }

    &:hover {
    }
  }

  .Chat-Button {
    display: flex;
    width: 30.375rem;
    padding: 1rem 1.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    border-radius: 0.5rem;
    text-align: center;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.25rem;
    &:hover {
    }
  }
`;
