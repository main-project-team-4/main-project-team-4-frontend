import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { AllItems, CategoryItem, TopItems, nearByItem } from '../apis/getItems/Item';
import styled from 'styled-components';
import Card from '../components/common/Card';
import { useParams, useLocation } from 'react-router-dom';
import { theme } from '../styles/theme';
import { getCookie } from '../utils/cookie';

export default function ViewItems() {
  const params = useParams();
  const location = useLocation();
  const path = location.pathname;
  const token = getCookie('token');

  // 검색 키워드 관리
  const [keyword, setKeyword] = useState('');
  const key = location.search.split('=')[1];
  const decodedString = decodeURIComponent(key);
  const [buttonState, setButtonState] = useState(false);
  const [sellingState, setSellingState] = useState('');

  const onClickAllItemState = () => {
    setButtonState(false);
    setSellingState('');
    refetch();
  };
  const onClickSellItemState = () => {
    setButtonState(true);
    setSellingState('SELLING');
    refetch();
  };

  useEffect(() => {
    setKeyword(decodedString);
  }, [decodedString]);

  // 무한스크롤
  const pageSize = 20;

  const fetchItems = ({ pageParam = 0 }) => {
    if (params.items === '최신 상품') {
      return AllItems({ page: pageParam, pageSize, Selling: sellingState });
    } else if (params.items === '인기 상품') {
      return TopItems({ page: pageParam, pageSize, Selling: sellingState });
    } else if (params.items === '내 주위 상품') {
      return nearByItem({ token, page: pageParam, pageSize, Selling: sellingState });
    } else if (params.items === 'category') {
      return CategoryItem(location.state?.id, location.state?.layer, pageParam);
    } else {
      throw new Error('Unknown item type');
    }
  };
  const {
    data: infiniteQueryData,
    fetchNextPage,
    refetch,
    isSuccess,
  } = useInfiniteQuery(['items', params.items, path, sellingState], fetchItems, {
    getNextPageParam: (_, pages) => {
      return pages.length;
    },
  });

  useEffect(() => {
    refetch();
  }, [path, refetch]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop >= offsetHeight) {
        fetchNextPage();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  let dataToRender;
  if (params.items === 'search') {
    dataToRender = location.state;
  }
  if (params.items !== 'search') {
    dataToRender = infiniteQueryData?.pages.flat() || [];
  }

  return (
    <Layout>
      <Title>
        {params.items === 'search' ? (
          <h4>
            <span>"{keyword}"</span>의 검색결과 {dataToRender?.length}개
          </h4>
        ) : (
          <>
            {params.items == 'category' ? (
              ''
            ) : (
              <>
                {params.items}
                <div>
                  <Allbutton buttonstate={buttonState ? 1 : 0} onClick={onClickAllItemState}>
                    전체 상품 보기
                  </Allbutton>
                  <Sellbutton buttonstate={buttonState ? 1 : 0} onClick={onClickSellItemState}>
                    구매가능 상품 보기
                  </Sellbutton>
                </div>
              </>
            )}

            {params.LargeCategory}
            {params.midCategoryId && ` - ${params.midCategoryId}`}
          </>
        )}
      </Title>
      {isSuccess && dataToRender?.length === 0 ? (
        <NotExits>
          {params.items === 'search' ? (
            <>
              <h3>{keyword}</h3>
              <p>에 대한 검색결과가 없습니다.</p>
            </>
          ) : (
            <p>아직 등록된 상품이 없습니다.</p>
          )}
        </NotExits>
      ) : (
        dataToRender && (
          <CardWrapper>
            {dataToRender.map((item: ItemType, index: number) => (
              <Card key={index} categoryTitle="" itemState={item.item_state} id={item.item_id} img={item.item_main_image} itemTitle={item.item_name} price={item.item_price} />
            ))}
          </CardWrapper>
        )
      )}
    </Layout>
  );
}

type ItemType = {
  item_id: number;
  item_name: string;
  item_main_image: string;
  item_price: string;
  item_state: 'SELLING' | 'RESERVED' | 'SOLDOUT';
  item_created_at: string;
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 78.125rem;
  gap: 1.25rem;
  flex-wrap: wrap;
  margin-top: 3.13rem;
  margin-bottom: 3.13rem;
`;

const CardWrapper = styled.div`
  display: flex;
  gap: 0.625rem;
  width: 78.125rem;
  flex-wrap: wrap;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 600;
  line-height: 33px;
  width: 100%;
  display: flex;
  align-items: center;
  align-self: flex-start;
  justify-content: space-between;

  span {
    font-size: 2rem;
    color: ${theme.pointColor};
  }
  div {
    display: flex;
    gap: 1rem;
  }
`;
const Allbutton = styled.button<{ buttonstate: number }>`
  width: 7.2rem;
  height: 1.75rem;
  border-radius: 0.28125rem;
  border: ${props => (props.buttonstate === 1 ? '1px solid #2667ff' : 'none')};
  background: ${props => (props.buttonstate === 1 ? '#fff' : '#2667ff')};
  color: ${props => (props.buttonstate === 1 ? '#2667ff' : '#fff')};

  cursor: pointer;
`;
const Sellbutton = styled.button<{ buttonstate: number }>`
  width: 7.2rem;
  height: 1.75rem;
  border-radius: 0.28125rem;
  border: ${props => (props.buttonstate === 0 ? '1px solid #2667ff' : 'none')};
  background: ${props => (props.buttonstate === 0 ? '#fff' : '#2667ff')};
  color: ${props => (props.buttonstate === 0 ? '#2667ff' : '#fff')};

  cursor: pointer;
`;

const NotExits = styled.div`
  margin-top: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h3 {
    font-size: 4rem;
    color: ${theme.pointColor};
  }
  p {
    font-size: 2rem;
  }
`;
