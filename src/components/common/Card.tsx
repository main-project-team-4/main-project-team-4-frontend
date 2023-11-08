import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { theme } from '../../styles/theme';
import { ReviewInputModal, ReviewModal } from '../mypage/ReviewModal';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getReviews } from '../../apis/shop/shop';
import { getCookie } from '../../utils/cookie';
import { DeleteReview } from '../../apis/shop/shop';
import { Modal } from './Modal';
import CardPencilSvg from '../../assets/svgs/CardPencilSvg';
import TrashSvg from '../../assets/svgs/TrashSvg';
interface CardProps {
  id: number;
  img: string;
  itemTitle: string;
  price: string;
  categoryTitle: string;
  itemState: 'SELLING' | 'RESERVED' | 'SOLDOUT';
  storePath?: boolean;
  dataName?: string;
  review?: boolean;
  shopId?: number;
  reviewId?: number;
}

export default function Card({ id, img, itemTitle, price, itemState, categoryTitle, storePath, dataName, review, shopId, reviewId }: CardProps) {
  const navigate = useNavigate();
  const token = getCookie('token');
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(false);
  const formattedPrice = Number(price).toLocaleString('ko-KR');
  // 모달 상태관리
  const [modalState, setModalState] = useState(false);
  useEffect(() => {}, [modalState]);
  const modalConfirm = () => {
    setModalState(false);
  };
  const modalOpen = event => {
    event.stopPropagation();
    setModalState(true);
  };
  const modalClose = () => {
    setModalState(false);
  };
  const close = () => {
    setModal(false);
  };
  const [displayItemState, setDisplayItemState] = useState('');
  useEffect(() => {
    switch (itemState) {
      case 'RESERVED':
        setDisplayItemState('예약중');
        break;
      case 'SOLDOUT':
        setDisplayItemState('판매완료');
        break;
      case 'SELLING':
        setDisplayItemState('판매중');
        break;
      default:
        setDisplayItemState('');
    }
  }, [itemState]);

  //리뷰 정보 가져오기
  const { data: reviewInfo, refetch } = useQuery('reviewData', () => getReviews({ itemId: id, token }), { enabled: false });

  const ReviewOnClick = event => {
    event.stopPropagation();
    refetch();
    setModalState(true);
  };

  //리뷰 삭제
  const deleteMutation = useMutation(DeleteReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(['deleteReview', reviewId]);
      setModal(true);
    },
  });

  const onClickDelete = event => {
    event.stopPropagation();

    if (reviewId && token) {
      deleteMutation.mutate({ reviewId, token });
    }
  };

  //리뷰 수정 버튼
  const onClickReviewChange = event => {
    event.stopPropagation();
    refetch();
    setModalState(true);
  };

  return (
    <>
      {modal && <Modal modalClose={close} modalInfo="삭제가 완료되었습니다"></Modal>}
      {modalState && dataName === 'ordered' && <ReviewInputModal reviewId={reviewId} reviewInfo={reviewInfo} setModalState={setModalState} itemId={id} shopId={shopId} modalClose={modalClose} />}
      {modalState && dataName === 'sales' && <ReviewModal reviewInfo={reviewInfo} modalClose={modalClose} />}
      <Layout
        onClick={event => {
          event.stopPropagation();
          navigate(`/posting/${itemTitle}`, { state: { id } });
        }}
        displaybtn={categoryTitle !== '인기 상품' && categoryTitle !== '최신 상품' ? 1 : 0}
        storepath={storePath ? 1 : 0}
        sales={dataName === 'sales' || dataName === 'ordered' ? 1 : 2}
      >
        <Image src={img} />
        <TextLayout>
          {categoryTitle !== '인기 상품' && categoryTitle !== '최신 상품' && <Sale>{displayItemState}</Sale>}
          <h1>{itemTitle}</h1>
          <Price>{formattedPrice}원</Price>
        </TextLayout>

        {['sales', 'ordered'].includes(dataName) && (
          <>
            {dataName === 'ordered' && (
              <>
                {review ? (
                  <BtnLayout>
                    <Btn onClick={onClickDelete} long={'short'} delete={'delete'} sales={dataName === 'sales' ? 1 : 2}>
                      <TrashSvg /> 리뷰삭제
                    </Btn>
                    <Btn onClick={onClickReviewChange} long={'short'} sales={dataName === 'sales' ? 1 : 2}>
                      <CardPencilSvg /> 리뷰수정
                    </Btn>
                  </BtnLayout>
                ) : (
                  <BtnLayout>
                    <Btn long={'long'} onClick={event => modalOpen(event)}>
                      <CardPencilSvg /> 리뷰작성
                    </Btn>
                  </BtnLayout>
                )}
              </>
            )}

            {dataName === 'sales' && (
              <>
                {review ? (
                  <BtnLayout>
                    <Btn review={review ? 1 : 0} onClick={ReviewOnClick} long={'long'} sales={dataName === 'sales' ? 1 : 2}>
                      <CardPencilSvg /> 리뷰보기
                    </Btn>
                  </BtnLayout>
                ) : (
                  <BtnLayout>
                    <Btn
                      review={review ? 1 : 0}
                      onClick={event => {
                        event.stopPropagation();
                      }}
                      sales={dataName === 'sales' ? 1 : 2}
                      long={'long'}
                    >
                      <CardPencilSvg /> 리뷰가 아직 없어요
                    </Btn>
                  </BtnLayout>
                )}
              </>
            )}
          </>
        )}
      </Layout>
    </>
  );
}

const Layout = styled.div<{ displaybtn: number; storepath: number; sales?: number }>`
  width: ${props => (props.sales === 1 ? '19.0625rem' : props.storepath ? '18.125rem' : '19.0625rem')};
  height: ${props => (props.sales === 1 ? '25.9375rem' : props.displaybtn ? '22.4375rem' : '20rem')};
  border-radius: 0.5rem;
  cursor: pointer;
  border: 1px solid ${theme.outline};
  background-color: white;
  box-sizing: border-box;
  padding-bottom: 1.25rem;
`;

const Image = styled.img`
  width: 100%;
  height: 14.25rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  border-bottom: 1px solid #e7e8ea7e;
`;

const TextLayout = styled.div`
  display: flex;
  padding: 0rem 1rem;
  box-sizing: border-box;
  flex-direction: column;

  width: 19.0625rem;

  gap: 0.62rem;

  h1 {
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    height: 1.375rem;
    width: 17rem;
    overflow: hidden;
    text-align: left;
  }
`;

const Sale = styled.div`
  width: 4.5rem;
  height: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 6.25rem;
  background: #ececec;

  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.25rem;
  letter-spacing: 0.04rem;
  color: black;
`;

const Price = styled.div`
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: left;
`;

const BtnLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.62rem;
  gap: 0.5rem;
`;

const Btn = styled.button<{ sales: number; long: string; review: number; delete: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: ${props => (props.long === 'long' ? '17.0625rem' : '8.28125rem')};
  height: 2.6875rem;
  border-radius: 0.5rem;
  background: ${props => (props.sales === 1 ? (props.review ? theme.navy : 'gray') : props.delete === 'delete' ? theme.cancelBtn : theme.pointColor)};

  padding: 0.75rem 1rem;
  box-sizing: border-box;
  border: none;
  color: white;
  cursor: pointer;
`;
