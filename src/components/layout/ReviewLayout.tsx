import ReviewCard from '../store/ReviewCard';

function ReviewLayout({ reviewData }) {
  return (
    <div>
      {reviewData.map(item => (
        <ReviewCard img={item.item_main_image} name={item.member_nickname} item={item.item_name} review={item.review_comment} />
      ))}
    </div>
  );
}

export default ReviewLayout;
