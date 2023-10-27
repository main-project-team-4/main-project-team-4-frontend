import styled from 'styled-components';
import { theme } from '../../styles/theme';

type ModalProps = {
  modalClose: () => void;
  modalConfirm?: () => void;
  modalInfo: string;
};

export function Modal({ modalClose, modalInfo }: ModalProps) {
  return (
    <>
      <Overlay>
        <Container>
          <H3 className="nick">{modalInfo}</H3>
          <Confirm onClick={modalClose} className="confirmBtn">
            확인
          </Confirm>
        </Container>
      </Overlay>
    </>
  );
}

export function ModalWithClose({ modalConfirm, modalClose, modalInfo }: ModalProps) {
  return (
    <>
      <Overlay>
        <Container>
          <H3 className="nick">{modalInfo}</H3>
          <BtnLayout>
            <Btn onClick={modalClose} className="confirmBtn">
              취소
            </Btn>
            <Btn onClick={modalConfirm} className="confirmBtn">
              확인
            </Btn>
          </BtnLayout>
        </Container>
      </Overlay>
    </>
  );
}

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
  width: 25rem;
  height: 10rem;
  background-color: white;
  border: 1px solid ${theme.outline};
  border-radius: 0.75rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;

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
  color: white;

  cursor: pointer;
`;

const BtnLayout = styled.div`
  display: flex;
  gap: 1rem;
`;

const Btn = styled.button`
  margin-top: 2.5rem;
  width: 8rem;
  height: 2.5rem;
  padding: 0.625rem 2.5rem;

  border-radius: 0.5rem;
  background: ${theme.navy};
  border: none;
  color: white;

  cursor: pointer;
`;
