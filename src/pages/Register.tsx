import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import Image from '../components/register/Image';
import Category from '../components/register/Category';
import { theme } from '../styles/theme';
import { useInput, usePriceInput } from '../hooks/useInput';
import { getCookie } from '../utils/cookie';
import { modifyItem, uploadItem } from '../apis/posting/posting';
import { Modal } from '../components/common/Modal';
import { useLocation, useNavigate } from 'react-router-dom';

function RegistrationItem() {
  const [clicked, setClicked] = useState(true);
  const [inputCount, setInputCount] = useState(0);
  const [title, setTitle, titleHandleChange] = useInput('');
  const [explain, setExplain, explainHandleChange] = useInput('');
  const [price, setPrice, viewPrice, setViewPrice, notice, priceHandleChange] = usePriceInput();
  const [category, setCategory] = useState(0);
  const [deliveryfee, setDeliveryfee] = useState(true);
  const [viewModal, setViewModal] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [itemId, setItemId] = useState(0);

  //이미지 state 관리
  const [images, setImages] = useState<File[]>([]); // 최초에 파일 형태 그대로 담기며, 전체 이미지
  const [selectedPicture, setSelectedPicture] = useState('');
  const [viewImages, setViewImages] = useState<string[]>([]);
  const [mainImg, setMainImg] = useState<any>();
  const [subImg, setSubImg] = useState<File[]>([]);

  // 카테고리 state 관리
  const [largeSelected, setlargeSelected] = useState('대분류');
  const [midSelected, setMidSelected] = useState('중분류');
  const [categoryID, setCategoryID] = useState(0);

  const { state: detailItems } = useLocation() || {};
  const queryClient = useQueryClient();
  const token = getCookie('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    if (detailItems) {
      setViewImages(detailItems.item_image_list);
    }
  }, []);

  useEffect(() => {
    if (detailItems) {
      setImages(detailItems.item_image_list);
      setMainImg(detailItems.item_image_list[0]);
      setSelectedPicture(detailItems.item_image_list[0]);
      setTitle(detailItems.item_name);
      setCategory(detailItems.category_m_id);
      setExplain(detailItems.item_comment);
      setPrice(detailItems.item_price);
      setViewPrice(String(detailItems.item_price).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
      setDeliveryfee(detailItems.item_with_delivery_fee);
      setClicked(detailItems.item_with_delivery_fee);
      setlargeSelected(detailItems.category_l_name);
      setMidSelected(detailItems.category_m_name);
      setInputCount(detailItems.item_comment.length);
      setCategoryID(detailItems.category_l_id);
      setIsFormComplete(true);
      setItemId(detailItems.item_id);
    }
  }, []);

  useEffect(() => {
    const isComplete = title && explain && price && mainImg && category;
    setIsFormComplete(isComplete);
  }, [title, explain, price, mainImg, category, detailItems]);

  const onClickInclude = () => {
    setClicked(true);
    setDeliveryfee(true);
  };
  const onClickExclude = () => {
    setClicked(false);
    setDeliveryfee(false);
  };

  const InputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputCount(e.target.value.length);
    explainHandleChange(e);
  };

  // 상품 등록 mutation
  const mutation = useMutation(uploadItem, {
    onSuccess: response => {
      queryClient.invalidateQueries('uploadItem');
      if (response?.status === 200) {
        navigate(`/posting/${title}`, { state: { id: response.data.item_id } });
      }
    },
  });
  // 상품 수정 mutation
  const modifyMutation = useMutation(modifyItem, {
    onSuccess: response => {
      queryClient.invalidateQueries('modifyItem');
      if (response?.status === 200) {
        navigate(`/posting/${title}`, { state: { id: detailItems.item_id } });
      }
    },
  });

  // 상품 등록
  const saveItem = () => {
    const dataFormData = new FormData();
    dataFormData.append('main_image', mainImg);

    if (Array.isArray(subImg) && subImg.length > 0) {
      subImg.forEach(file => {
        dataFormData.append(`sub_image`, file);
      });
    } else {
      dataFormData.append('sub_image', '');
    }

    const data = {
      item_name: title,
      item_price: price,
      item_comment: explain,
      item_with_delivery_fee: deliveryfee,
      category_m_id: category,
    };

    const blobData = new Blob([JSON.stringify(data)], { type: 'application/json' });
    dataFormData.append('requestDto', blobData);
    mutation.mutate({ token, data: dataFormData });
  };

  // 상품 수정
  const modifyItemHandler = () => {
    const modifyArr: string[] = [];
    const dataFormData = new FormData();

    if (Array.isArray(subImg) && subImg.length > 0) {
      subImg.forEach(file => {
        if (!(file instanceof File)) {
          modifyArr.push(file);
        }
      });
    } else {
      dataFormData.append('sub_image', '');
    }

    const data = {
      item_name: title,
      item_price: price,
      item_comment: explain,
      item_with_delivery_fee: deliveryfee,
      category_m_id: category,
      item_main_image: mainImg,
      item_sub_image: modifyArr,
    };

    const blobData = new Blob([JSON.stringify(data)], { type: 'application/json' });
    dataFormData.append('requestDto', blobData);
    modifyMutation.mutate({ token, data: dataFormData, itemId });
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
          <Image
            setViewImages={setViewImages}
            viewImages={viewImages}
            images={images}
            setImages={setImages}
            selectedPicture={selectedPicture}
            setSelectedPicture={setSelectedPicture}
            setMainImg={setMainImg}
            setSubImg={setSubImg}
            detailItemState={detailItems ? true : false}
            detailItemId={detailItems.item_id}
          />

          <Layout>
            <h3>제목</h3>
            <input placeholder="제목을 입력해주세요" maxLength={88} value={title} onChange={titleHandleChange}></input>

            <Category
              setCategory={setCategory}
              largeSelected={largeSelected}
              setlargeSelected={setlargeSelected}
              midSelected={midSelected}
              setMidSelected={setMidSelected}
              categoryID={categoryID}
              setCategoryID={setCategoryID}
            />

            <PriceLayout>
              <h3>가격 </h3>
              {notice && <span>숫자만 입력해주세요</span>}
            </PriceLayout>
            <input placeholder="가격을 입력해주세요" value={viewPrice as number} onChange={priceHandleChange}></input>
            <DeliveryBox>
              <Delivery onClick={onClickInclude} className={clicked ? ' active' : ''}>
                배송비 포함
              </Delivery>
              <Delivery onClick={onClickExclude} className={clicked ? ' ' : 'active'}>
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
              <Btn onClick={() => navigate(-1)} backcolor="#AFB2B7">
                취소
              </Btn>
              <Btn
                backcolor={isFormComplete ? '#2667FF' : '#E7E8EA'}
                onClick={
                  isFormComplete
                    ? detailItems
                      ? modifyItemHandler
                      : saveItem
                    : () => {
                        setViewModal(true);
                      }
                }
              >
                {detailItems ? '상품 수정' : '상품등록'}
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
const Delivery = styled.button`
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
  line-height: 1.25rem;
  letter-spacing: 0.04rem;
  text-transform: uppercase;

  cursor: pointer;
`;
