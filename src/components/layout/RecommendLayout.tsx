import styled from 'styled-components';
import { theme } from '../../styles/theme';
import RecommendCard from '../common/RecommendCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CrownSvg from '../../assets/svgs/CrownSvg';

type RecommendType = {
  title: string;
  data: ItemType[];
};

type ItemType = {
  category_m_id: number;
  category_m_name: string;
  item_created_at: string;
  item_id: number;
  item_main_image: string;
  item_name: string;
  item_price: string;
  item_state: 'SELLING' | 'RESERVED' | 'SOLDOUT';
  member_id: number;
  member_nickname: string;
  shop_name: string;
  member_image: string;
};

function RecommendLayout({ title, data }: RecommendType) {
  return (
    <LayOut>
      <Container>
        <h1>
          <CrownSvg />
          {title}
        </h1>
        <CardWrapper>
          <StyledSwiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            slidesPerView={3}
            navigation
            centeredSlides
            speed={1000}
            effect="coverflow"
            pagination={{ clickable: true, type: 'progressbar' }}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop={true}
          >
            {data.map((item: ItemType, index) => (
              <SwiperSlide key={index}>
                <RecommendCard
                  shopName={item.shop_name}
                  categoryTitle={title}
                  itemState={item.item_state}
                  id={item.item_id}
                  img={item.item_main_image}
                  itemTitle={item.item_name}
                  price={item.item_price}
                  memberImg={item.member_image}
                />
              </SwiperSlide>
            ))}
          </StyledSwiper>
        </CardWrapper>
      </Container>
    </LayOut>
  );
}

export default RecommendLayout;

const LayOut = styled.div`
  width: 80rem;
  height: 38.6875rem;
`;
const Container = styled.div`
  width: 100vw;
  height: 38.6875rem;

  position: absolute;
  left: 0rem;
  background-color: ${theme.pointColor};

  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2.5rem;
    gap: 0.5rem;

    color: white;
    font-size: 1.625rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 67.5rem;
  margin: 1.25rem auto 3.12rem auto;
`;
const StyledSwiper = styled(Swiper)`
  position: relative;
  height: 32.6875rem;
  .swiper-button-next,
  .swiper-button-prev {
    color: ${theme.inputColor};
  }

  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 3.125rem;
  }
  .swiper-pagination {
    bottom: 10px !important;
    top: auto !important;
    left: 23.32rem !important;
    width: 30% !important;
  }

  .swiper-pagination-progressbar {
    background: rgba(255, 255, 255, 0.5);
    .swiper-pagination-progressbar-fill {
      background: ${theme.deactivateBtn};
    }
  }
`;
