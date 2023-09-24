import { useState } from "react";
import "./ReviewForm.css";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";

const INITAIL_VALUES = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};

//새로고침 안하고 리뷰 목록 업데이트 바로 하기 위한 prop
function ReviewForm({
  initialValues = INITAIL_VALUES,
  onSubmitSuccess,
  onSubmit,
  onCancel,
  initalPreview,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);
  const [values, setValues] = useState(initialValues);
  //2. change prop 으로 이 함수 실행하며 파라미터 전달
  // 그러면 value 객체에 추가
  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  //3. input 박스에서 값을 입력할 때마다 새로운 값을 받아오는 이 함수 실행하며 값 넘겨줌
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("rating", values.rating);
    formData.append("content", values.content);

    let result;
    try {
      setIsSubmitting(true);
      setSubmittingError(null);
      // createReview 함수의 실행이 완료될 때까지 대기하며, await 키워드 뒤의 코드가 실행
      result = await onSubmit(formData);
    } catch (error) {
      setSubmittingError(error);
    } finally {
      setIsSubmitting(false);
    }
    //request가 성공하면 review로 onSubmitSuccess 실행
    const { review } = result;
    onSubmitSuccess(review);
    setValues(INITAIL_VALUES);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        initalPreview={initalPreview}
        change={handleChange}
      />
      <input name="title" value={values.title} onChange={handleInputChange} />
      <RatingInput name="rating" value={values.rating} change={handleChange} />
      <textarea
        name="content"
        value={values.content}
        onChange={handleInputChange}
      />
      <button type="submit" disabled={isSubmitting}>
        확인
      </button>
      {onCancel && <button onClick={onCancel}>취소</button>}
      {submittingError?.message && <div>{submittingError.message}</div>}
    </form>
  );
}

export default ReviewForm;
