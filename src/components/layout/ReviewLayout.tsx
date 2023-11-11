import ReviewCard from '../store/ReviewCard';
import styled from 'styled-components';
import TabLayout from './TabLayout';

export default function ReviewLayout({ reviewData }: ReviewData) {
  console.log('reviewData', reviewData);

  return (
    <Container reviewwidth={reviewData.length === 0 ? 1 : 0}>
      {reviewData.length === 0 ? (
        <>
          <TabLayout icon="edit_note" text="리뷰가 없습니다." />
        </>
      ) : (
        <>
          {reviewData.map((item: ItemType, index: number) => (
            <div key={index}>
              <ReviewCard reviewRate={item.review_rating} img={item.item_image_list[0]} name={item.consumer_shop_name} item={item.item_name} review={item.review_comment} />
              {/* {(index + 1) % 2 === 0 && index !== reviewData.length - 1 && <Divider />} */}
              <Divider />
            </div>
          ))}
        </>
      )}
    </Container>
  );
}

// 타입
type ReviewData = {
  reviewData: ItemType[];
};
type ItemType = {
  item_id: number;
  item_main_image: string;
  item_name: string;
  member_id: number;
  member_nickname: string;
  review_comment: string;
  review_created_at: string;
  review_id: number;
  review_rating: number;
  item_image_list: string[];
  consumer_shop_name: string;
};

// 스타일
const Container = styled.div<{ reviewwidth: number }>`
  display: flex;
  width: ${props => (props.reviewwidth === 1 ? '73.75rem' : '78.125rem')};
  min-height: 38rem;
  gap: 0 3.12rem 0 0;
  flex-wrap: wrap;
`;

const Divider = styled.div`
  flex-basis: 100%;
  height: 1px;
  background-color: #e0e0e0;
  margin: 0.62rem 0;
`;
