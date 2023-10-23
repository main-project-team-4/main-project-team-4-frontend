import styled from 'styled-components';
import { theme } from '../../styles/theme';

type ModalProps = {
  modalClose: () => void;
  modalInfo: string;
};

function Modal({ modalClose, modalInfo }: ModalProps) {
  return (
    <>
      <Overlay />
      <Container>
        <H3 className="nick">{modalInfo}</H3>
        <Confirm onClick={modalClose} className="confirmBtn">
          확인
        </Confirm>
      </Container>
    </>
  );
}

export default Modal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2); // 반투명한 검은색 배경
  z-index: 10; // 모달 뒤에 위치하도록 z-index 설정
`;

const Container = styled.div`
  width: 25rem;
  height: 10rem;
  background-color: ${theme.white};
  border: 1px solid ${theme.outline};
  border-radius: 0.75rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
`;
const H3 = styled.h4`
  font-size: 1rem;
  font-weight: 400;
  margin-top: 2.5rem;
`;

const Confirm = styled.button`
  margin-top: 2.5rem;
  width: 22.5rem;
  height: 2.5rem;
  padding: 0.625rem 2.5rem;

  border-radius: 0.5rem;
  background: ${theme.navy};
  border: none;
  color: ${theme.white};

  cursor: pointer;
`;
