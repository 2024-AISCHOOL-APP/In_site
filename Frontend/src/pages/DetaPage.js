import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/DetailPage.css"; // CSS 파일을 별도로 만들어서 스타일을 적용합니다.

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
      <div className="header-container">
        <h1 className="detail-header">공지사항</h1>
      </div>
      <div className="detail-container">
        {boardDetail ? (
          <div className="detail-content">
            <h3 className="detail-title">{boardDetail.title}</h3>
            <p className="detail-info">작성자: 관리자 | 날짜: {boardDetail.date}</p>
            <p className="detail-text">{boardDetail.content}</p>
          </div>
        ) : (
          <p className="loading-text">로딩 중...</p>
        )}
        {/* <div className="btn-container">
          <a href="/board" className="btn">목록으로 돌아가기</a>
        </div> */}
      </div>
    </div>
  );
};

export default DetaPage;