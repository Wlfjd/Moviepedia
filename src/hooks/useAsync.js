import { useState } from "react";

function useAsync(asyncfunction) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  //네트워크 리퀘스트 보낼 때 쓸 함수
  const wrappedFunction = async (...args) => {
    try {
      setError(null);
      setPending(true);
      //Api 함수 : 실제 리퀘스트를 보내는 함수
      return await asyncfunction(...args);
    } catch (error) {
      setError(error);
      return;
    } finally {
      setPending(false);
    }
  };
  return [pending, error, wrappedFunction];
}

export default useAsync;
