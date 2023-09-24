import "./Rating.css";

const RATINGS = [1, 2, 3, 4, 5];
// 별 하나를 보여주는 컴포넌트
function Star({ selected = false, rating, mySelect, myHover }) {
  const className = `Rating-star ${selected ? "selected" : ""}`;

  //()=> selectRate 값이 있을 때만 함수 실행한다는 의미
  const handleClick = mySelect ? () => mySelect(rating) : undefined;
  const handleHover = myHover ? () => myHover(rating) : undefined;

  return (
    <span className={className} onClick={handleClick} onMouseOver={handleHover}>
      ★
    </span>
  );
}

function Rating({ className, value = 0, mySelect, myHover, myMouseOut }) {
  return (
    <div className={className} onMouseOut={myMouseOut}>
      {RATINGS.map((eachRating) => (
        <Star
          key={eachRating}
          rating={eachRating}
          selected={value >= eachRating}
          mySelect={mySelect}
          myHover={myHover}
        />
      ))}
    </div>
  );
}

export default Rating;
