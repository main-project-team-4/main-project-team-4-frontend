import styled from 'styled-components';

export default function Chat() {
  return (
    <Layout>
      <ChatList>
        <h3>채팅 목록</h3>
        <UserList>
          <User>
            <img src="https://ifh.cc/g/APoRmB.jpg" alt="" />
            사용자123456
          </User>
        </UserList>
      </ChatList>

      <ChatContainer>
        <Name>Jhon Abraham</Name>
        <MessageLayout>
          <br />
          <Message>Jhon Abraham</Message>
          <Message>Hello! Nazrul How are you?</Message>
        </MessageLayout>
        {/* <Message>
          <strong>Jhon Abraham</strong>
          <p>Hello! Nazrul How are you?</p>
        </Message> */}
        <ChatInput>
          <input type="text" />
          <button>
            <span className="material-symbols-outlined">send</span>
          </button>
        </ChatInput>
      </ChatContainer>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  height: 53.25rem;
  margin-top: 3.13rem;
  gap: 0.63rem;
`;

const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  width: 25.5rem;
  background-color: #e9e9e9;
  border-radius: 0.75rem;

  h3 {
    font-size: 1.75rem;
    font-weight: 600;
    margin: 1.88rem 0 1.25rem 1.88rem;
  }
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.63rem;
`;

const User = styled.div`
  display: flex;
  width: 21.75rem;
  height: 4.25rem;
  box-sizing: border-box;
  padding: 0.875rem 0.75rem;
  align-items: center;
  border-radius: 0.75rem;
  background: #fafafa;
  gap: 0.75rem;

  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
  }
`;

const ChatContainer = styled.div`
  width: 48.875rem;
  height: 53.25rem;
  border-radius: 0.75rem;
`;

const Name = styled.div`
  width: 48.875rem;
  height: 5.5rem;
  border-radius: 0.75rem 0.75rem 0rem 0rem;
  padding: 1.87rem 0 0 1.87rem;

  background: #fff;
  font-size: 1.5rem;
  font-weight: 600;
`;

const MessageLayout = styled.div`
  padding: 1.87rem 3.12rem;
  height: 42.25rem;
  background-color: #f1f1f1;
`;

const Message = styled.div`
  max-width: 15rem;
  /* text-align: center; */
  padding: 0.94rem;
  margin-bottom: 10px;
  background-color: #ffffff;
  border-radius: 5px;
`;
const ChatInput = styled.div`
  display: flex;
  align-items: center;
  padding: 0.9375rem 1.25rem;
  align-items: flex-start;
  gap: 1rem;
  background-color: white;
  border-radius: 0rem 0rem 0.75rem 0.75rem;

  input {
    all: unset;
    width: 100%;
    padding: 0.9375rem 1.25rem;
    border-radius: 3.125rem;
    background-color: #f1f1f1;
  }

  button {
    all: unset;
    padding: 0.5rem;
    border-radius: 0.75rem;
    background-color: #f1f1f1;
  }
`;
