import { useState } from "react";
import Rating from "./Rating";
import "./RatingInput.css";

function RatingInput({ name, value, change }) {
  const [rating, setRating] = useState(value);
  const handleChoose = (whatValue) => change(name, whatValue);

  const handleMouseOut = () => setRating(value);

  return (
    <Rating
      className="RatingInput"
      value={rating}
      mySelect={handleChoose}
      myHover={setRating}
      myMouseOut={handleMouseOut}
    />
  );
}
export default RatingInput;
