import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetaPage = () => {
  const { board_seq } = useParams();
  const [boardDetail, setBoardDetail] = useState(null);

  useEffect(() => {
    const fetchBoardDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/board/${board_seq}`
        );
        // 서버에서 받아온 상세 정보를 상태에 저장
        setBoardDetail(response.data);

        console.log(response.data, "나오니");
      } catch (error) {
        console.error("게시글 상세 정보를 가져오는 도중 오류 발생:", error);
      }
    };

    // board_seq가 변경될 때마다 fetchBoardDetail 함수 호출
    fetchBoardDetail();
  }, [board_seq]);

  // console.log(boardDetail, "게시물");

  return (
    <div>
      <h1>게시글 상세 페이지</h1>
      {boardDetail ? (
        <div>
          <p>아이디: {boardDetail.id}</p>
          <h3>제목: {boardDetail.title}</h3>
          <p>내용: {boardDetail.content}</p>
          <img src={ boardDetail.img} />
      
        </div>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default DetaPage;