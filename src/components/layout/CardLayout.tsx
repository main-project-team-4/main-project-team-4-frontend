import styled from 'styled-components';
import Card from '../common/Card';
import { useNavigate, useLocation } from 'react-router-dom';
import TabLayout from './TabLayout';
import StoreSvg from '../../assets/svgs/StoreSvg';

type TabDataType = {
  icon: string;
  text: string;
};

type TabDataName = 'ordered' | 'sales' | 'wishlist';

const defaultTabData: TabDataType = {
  icon: 'production_quantity_limits',
  text: '구매 완료한 상품이 없습니다.',
};

const getTabData = (dataName?: TabDataName): TabDataType => {
  const NameMatch: Record<TabDataName, TabDataType> = {
    ordered: {
      icon: 'production_quantity_limits',
      text: '구매 완료한 상품이 없습니다.',
    },
    sales: {
      icon: 'sell',
      text: '판매 완료한 상품이 없습니다.',
    },
    wishlist: {
      icon: 'favorite',
      text: '찜한 상품이 없습니다.',
    },
  };

  return dataName ? NameMatch[dataName] : defaultTabData;
};

export default function CardLayout({ storeState, title, data, shop_Id, dataName }: ParamsTypeType) {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const goShop = path.includes('/posting');
  const storePath = path.includes('/store');

  const tabData = getTabData(dataName);

  const move = () => {
    navigate(`items/${title}`);
  };

  return (
    <>
      <Layout title={title}>
        {data && (
          <>
            <Title
              title={title}
              onClick={() => {
                if (storeState) {
                  navigate(`/store/${shop_Id}`, { state: shop_Id });
                } else move();
              }}
            >
              {storeState && <StoreSvg />}
              {title}
            </Title>
            <CardWrapper>
              {data && data.length === 0 ? (
                <>
                  {tabData ? (
                    <>
                      <TabLayout icon={tabData.icon} text={tabData.text} />
                    </>
                  ) : (
                    <>
                      <TabLayout icon="production_quantity_limits" text="판매 상품이 없습니다." />
                    </>
                  )}
                </>
              ) : (
                <>
                  {data.map((item: ItemType) => (
                    <Card
                      key={item.item_id}
                      storePath={storePath}
                      categoryTitle={title}
                      itemState={item.item_state}
                      id={item.item_id}
                      img={item.item_main_image}
                      itemTitle={item.item_name}
                      price={item.item_price}
                      dataName={dataName}
                      review={item.is_review_written}
                      shopId={item.shop_id}
                      reviewId={item.review_id}
                    />
                  ))}
                </>
              )}
            </CardWrapper>

            {goShop ? (
              <ViewAll onClick={() => navigate(`/store/${shop_Id}`, { state: shop_Id })}>
                <span>상점가기</span>
                <span className="material-symbols-outlined">chevron_right</span>
              </ViewAll>
            ) : path === '/mypage' || storePath ? null : (
              <ViewAll onClick={move}>
                <span>전체보기</span>
                <span className="material-symbols-outlined">chevron_right</span>
              </ViewAll>
            )}
          </>
        )}
      </Layout>
    </>
  );
}

// 타입
type ParamsTypeType = {
  data: ItemType[];
  title: string;
  shop_Id?: string;
  storeState?: boolean;
  dataName?: TabDataName;
};
type ItemType = {
  category_m_id: 2;
  category_m_name: string;
  item_created_at: string;
  item_id: number;
  item_main_image: string;
  item_name: string;
  item_price: string;
  item_state: 'SELLING' | 'RESERVED' | 'SOLDOUT';
  member_id: number;
  member_nickname: string;
  is_review_written: boolean;
  shop_id: number;
  review_id: number;
};

// 스타일
const Layout = styled.div<{ title: string }>`
  display: flex;
  flex-direction: column;
  width: 78.125rem;

  gap: 1.25rem;
  margin-top: ${props => (props.title === '인기 상품' ? '3.34rem' : '')};
  position: relative;
`;

const CardWrapper = styled.div`
  display: flex;
  gap: 0.62rem;
  width: 78.125rem;
  flex-wrap: wrap;
`;

const Title = styled.p`
  display: flex;
  align-items: center;
  gap: 0.38rem;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  align-self: flex-start;
  cursor: pointer;
`;

const ViewAll = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  align-self: flex-end;
  align-items: center;

  p {
    color: #000;
    font-weight: 500;
  }
`;
