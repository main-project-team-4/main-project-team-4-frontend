import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { confirmBuyer, selectBuyer } from '../../apis/posting/posting';
import { getCookie } from '../../utils/cookie';
import { useState } from 'react';
import { Modal } from '../common/Modal';

type SelectType = {
  setSelectedView: React.Dispatch<React.SetStateAction<string>>;
  setSelected: (state: string) => void;
  setSelectBuyer: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  itemId: number;
};
function SelectbuyerModal({ setSelectedView, setSelected, setSelectBuyer, setIsOpen, itemId }: SelectType) {
  const token = getCookie('token');
  const [buyerId, setBuyerId] = useState(0);
  const [buttonState, setButtonState] = useState(false);
  const queryClient = useQueryClient();
  const [modalState, setModalState] = useState(false);

  const { data } = useQuery('selectBuyer', () => selectBuyer({ token, itemId }));

  const mutation = useMutation(confirmBuyer, {
    onSuccess: async () => {
      queryClient.invalidateQueries('confirmBuyer');
      setModalState(true);
    },
    onError: error => {
      console.log(error);
    },
  });

  const onClickCancel = () => {
    setSelectBuyer(false);
    setIsOpen(false);
  };

  const onClickPickBuyer = (memberId: number) => {
    setBuyerId(memberId);
    setButtonState(true);
  };

  const onClickConfirmBuyer = () => {
    mutation.mutate({ token, itemId, memberId: buyerId });
  };

  // useEffect(() => {
  //   if (modalState) {

  //   }
  // }, [modalState]);

  const modalClose = () => {
    setModalState(false);
    setSelectedView('판매 완료');
    setSelected('SOLDOUT');
    setSelectBuyer(false);
    setIsOpen(false);
  };

  return (
    <Overlay>
      {modalState && <Modal modalClose={modalClose} modalInfo="판매완료!" />}
      <Container>
        <p>구매자 선택</p>
        <ChatList>
          <p>채팅목록</p>
          {data?.map((buyer: BuyerType) => {
            return (
              <Chatbox isselected={buyerId === buyer.member_id ? 1 : 0} onClick={() => onClickPickBuyer(buyer.member_id)} key={buyer.member_id}>
                <img src={buyer.member_image ? buyer.member_image : 'https://ifh.cc/g/kXNjcT.jpg'} />
                <p>{buyer.member_nickname}</p>
              </Chatbox>
            );
          })}
        </ChatList>
        <ButtonBox buttonstate={buttonState ? 1 : 0}>
          <button className="cancel-Btn" onClick={onClickCancel}>
            취소
          </button>
          <button className="clear-Btn" onClick={onClickConfirmBuyer}>
            선택완료
          </button>
        </ButtonBox>
      </Container>
    </Overlay>
  );
}

export default SelectbuyerModal;

type BuyerType = {
  chatroom_id: number;
  member_id: number;
  member_image: null | string;
  member_nickname: string;
};
const Overlay = styled.div`
  z-index: 19;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  overflow: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(20, 22, 23, 0.4);
`;

const Container = styled.div`
  width: 33.75rem;
  height: 40.625rem;
  flex-shrink: 0;

  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid var(--outline-color, #e7e8ea);

  p {
    margin: 1.38rem auto 1.38rem 1.38rem;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const ChatList = styled.div`
  height: 30.87rem;

  border-top: 0.0625rem solid ${theme.outline};
  border-bottom: 0.0625rem solid ${theme.outline};
  padding: 1.38rem;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: 0.31rem;
`;

const Chatbox = styled.div<{ isselected: number }>`
  width: 30.625rem;
  height: 3.25rem;

  display: flex;
  align-items: center;
  gap: 0.62rem;

  border-radius: 0.75rem;
  background: #fafafa;
  border: ${props => (props.isselected === 1 ? '1px solid var(--point-color, #2667ff)' : null)};

  padding: 0.38rem 0.75rem;
  box-sizing: border-box;
  img {
    width: 2.5rem;
    height: 2.5rem;
  }
  p {
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const ButtonBox = styled.div<{ buttonstate: number }>`
  display: flex;
  gap: 0.625rem;

  margin: 1.37rem 1.37rem 1.37rem 16.75rem;

  button {
    width: 7.5rem;
    height: 2.3125rem;
    border-radius: 0.5rem;
    border: none;

    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-transform: uppercase;
    color: white;
    cursor: pointer;
  }
  .cancel-Btn {
    background-color: ${theme.cancelBtn};
  }
  .clear-Btn {
    background-color: ${props => (props.buttonstate === 1 ? theme.pointColor : theme.outline)};
  }
`;
