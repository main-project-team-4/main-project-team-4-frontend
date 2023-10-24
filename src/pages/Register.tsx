import styled from 'styled-components';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import Image from '../components/register/Image';
import Category from '../components/register/Category';
import { theme } from '../styles/theme';
import { useInput, usePriceInput } from '../hooks/useInput';
import { getCookie } from '../utils/cookie';
import { uploadItem } from '../apis/posting/posting';
import Modal from '../components/common/Modal';

function RegistrationItem() {
  const [clicked, setClicked] = useState(0);
  const [inputCount, setInputCount] = useState(0);
  const [title, titleHandleChange] = useInput('');
  const [explain, explainHandleChange] = useInput('');
  const [price, viewPrice, notice, priceHandleChange] = usePriceInput('');
  const [mainImg, setMainImg] = useState<File | null>(null);
  const [subImg, setSubImg] = useState<File[]>([]);
  const [category, setCategory] = useState(0);
  const [deliveryfee, setDeliveryfee] = useState(true);
  const [viewModal, setViewModal] = useState(false);

  const isFormComplete = title && explain && price && mainImg && category;

  const queryClient = useQueryClient();
  const token = getCookie('token');

  const onClickInclude = () => {
    setClicked(0);
    setDeliveryfee(true);
  };
  const onClickExclude = () => {
    setClicked(1);
    setDeliveryfee(false);
  };

  const InputHandler = e => {
    setInputCount(e.target.value.length);
    explainHandleChange(e);
  };

  // 상품 등록
  const mutation = useMutation(uploadItem, {
    onSuccess: () => {
      queryClient.invalidateQueries('uploadItem');
    },
  });

  const saveItem = () => {
    const dataFormData = new FormData();

    if (mainImg instanceof File) {
      // mainImg가 File 타입인지 확인
      dataFormData.append('main_image', mainImg);
    }

    if (Array.isArray(subImg) && subImg.length > 0) {
      // subImg가 배열이며, 길이가 0보다 큰지 확인
      subImg.forEach(file => {
        if (file instanceof File) {
          // 각 항목이 File 타입인지 확인
          dataFormData.append(`sub_image`, file);
        }
      });
    }
    const data = {
      item_name: title,
      item_price: price,
      item_comment: explain,
      item_with_delivery_fee: deliveryfee,
      category_m_id: category,
    };

    // requestDto의 데이터를 FormData에 추가
    const blobData = new Blob([JSON.stringify(data)], { type: 'application/json' });
    dataFormData.append('requestDto', blobData);

    mutation.mutate({ token, data: dataFormData }); // FormData 전송
  };
  return (
    <>
      {viewModal && (
        <Modal
          modalClose={() => {
            setViewModal(false);
          }}
          modalInfo={'모든 정보를 입력해 주세요'}
        />
      )}
      <Container>
        <h1>상품등록</h1>
        <RegistrationBox>
          <Image setMainImg={setMainImg} setSubImg={setSubImg} />

          <Layout>
            <h3>제목</h3>
            <input placeholder="제목을 입력해주세요" maxLength={88} value={title} onChange={titleHandleChange}></input>

            <Category setCategory={setCategory} />

            <PriceLayout>
              <h3>가격 </h3>
              {notice && <span>숫자만 입력해주세요</span>}
            </PriceLayout>
            <input placeholder="가격을 입력해주세요" value={viewPrice} onChange={priceHandleChange}></input>
            <DeliveryBox>
              <Delivery onClick={onClickInclude} className={clicked === 0 ? ' active' : ''}>
                배송비 포함
              </Delivery>
              <Delivery onClick={onClickExclude} className={clicked === 1 ? ' active' : ''}>
                배송비 미포함
              </Delivery>
            </DeliveryBox>
            <h3>설명</h3>
            <textarea placeholder="설명을 입력해주세요" maxLength={2000} onChange={InputHandler} value={explain}></textarea>
            <p>
              <span>{inputCount}</span>
              <span> / 2000 자</span>
            </p>
            <BtnLayout>
              <Btn backcolor="#AFB2B7">취소</Btn>
              <Btn
                backcolor={isFormComplete ? '#2667FF' : '#E7E8EA'}
                onClick={
                  isFormComplete
                    ? saveItem
                    : () => {
                        setViewModal(true);
                      }
                }
              >
                상품등록
              </Btn>
            </BtnLayout>
          </Layout>
        </RegistrationBox>
      </Container>
    </>
  );
}

export default RegistrationItem;

const Container = styled.div`
  width: 75rem;
  max-height: 60rem;
  margin-top: 3.13rem;
  padding: 1.88rem;
  background-color: white;
  border-radius: 0.75rem;

  h1 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1.25rem;
  }
`;

const RegistrationBox = styled.div`
  display: flex;
  padding: 0rem 0.625rem;
  box-sizing: border-box;
  justify-content: center;
  align-items: flex-start;
  gap: 1.875rem;
`;

const Layout = styled.div`
  width: 35.625rem;

  display: flex;
  flex-direction: column;
  h3 {
    margin-bottom: 0.3125rem;
    font-size: 1.125rem;
    font-weight: 600;
  }
  input {
    display: flex;
    width: 35.625rem;
    padding: 0.75rem 1.25rem;
    align-items: center;
    margin-bottom: 1.25rem;
    box-sizing: border-box;
    font-weight: 500;
    font-size: 1rem;
    border-radius: 0.75rem;
    background-color: ${theme.inputColor};
    border: none;
    outline: none;
  }

  textarea {
    width: 35.625rem;
    min-height: 14.4375rem;
    max-height: 21.4375rem;
    border-radius: 0.75rem;
    padding: 1rem 1.25rem;
    box-sizing: border-box;
    background-color: ${theme.inputColor};
    border: none;
    margin-bottom: 5px;
    font-size: 1rem;
    font-weight: 500;
  }
  p {
    text-align: right;
  }
`;

const PriceLayout = styled.div`
  display: flex;
  align-items: center;
  span {
    font-size: 0.8rem;
    margin-left: 1rem;
    margin-bottom: 4px;
    color: ${theme.pointColor};
  }
`;

const DeliveryBox = styled.div`
  height: 2.4375rem;
  margin-top: 0.62rem;
  margin-bottom: 1.25rem;

  display: flex;
  gap: 0.62rem;
`;
const Delivery = styled.button<ButtonType>`
  all: unset;
  padding: 0.625rem 1.5rem;
  box-sizing: border-box;
  height: 2.4375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6.25rem;
  border: none;
  font-size: 0.875rem;
  border: 1px solid ${theme.deactivateBtn};
  color: #8e8e8e;
  font-weight: 500;
  &.active {
    border: 1px solid ${theme.pointColor};
    color: ${theme.pointColor};
  }
  cursor: pointer;
`;

const BtnLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.25rem;
  margin-bottom: 3.06rem;
  gap: 0.62rem;
`;
const Btn = styled.div<{ backcolor: string }>`
  width: 8.125rem;
  height: 2.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 0.5rem;
  background: ${props => props.backcolor};
  border: none;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25rem; /* 142.857% */
  letter-spacing: 0.04rem;
  text-transform: uppercase;

  cursor: pointer;
`;
