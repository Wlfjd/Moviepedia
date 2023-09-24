import { useEffect, useRef, useState } from "react";

function FileInput({ name, value, initalPreview, change }) {
  //파일 미리보기 위한 state
  //처음 선택한 이미지
  const [preview, setPreview] = useState(initalPreview);

  //실제 DOM 노드 참조하는 REF 객체
  //DOM 노드는 렌더링이 끝날 때 생기니 ref 객체의 current 값도 렌더링 후 존재
  const inputRef = useRef();

  const clearClick = () => {
    //ref 객체 존재여부 확인하고 사용하기
    if (!inputRef.current) return;

    inputRef.current.value = "";
    change(name, null);
  };

  //처음 렌더링 됐을 때만 보여주기
  useEffect(() => {
    if (!value) return;
    //objextURL은 만들때마다 웹 브라우저의 메모리를 할당 = 사이드이펙트
    //할당되기만 하면 메모리가 낭비되니 메모리 해제도 필요하다 => revokeObjectURL
    const imgurl = URL.createObjectURL(value);
    setPreview(imgurl);

    return () => {
      setPreview(initalPreview);
      URL.revokeObjectURL(imgurl);
    };
  }, [value, initalPreview]);
  return (
    <div>
      <img src={preview} alt="이미지 미리보기" />
      <input
        type="file"
        onChange={(e) => {
          //0번 인덱스에 우리가 선택한 파일에 해당하는 객체가 있음
          //1. nextValue에 이미지 객체를 받아오고 change props를 통해 이름과 값 전달
          const nextValue = e.target.files[0];
          change(name, nextValue);
        }}
        ref={inputRef}
      />
      {value && <button onClick={clearClick}>X</button>}
    </div>
  );
}

export default FileInput;
