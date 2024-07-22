import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/DetailPage.css"; // CSS 파일을 별도로 만들어서 스타일을 적용합니다.
import { Row } from "react-bootstrap";

const EdetaPage = () => {
  const { board_seq } = useParams();
  const [boardDetail, setBoardDetail] = useState(null);

  // useEffect(() => {
  //   const fetchBoardDetail = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5000/board/${board_seq}`
  //       );

  //       setBoardDetail(response.data);

  //       console.log(response.data, "나오니");
  //     } catch (error) {
  //       console.error("게시글 상세 정보를 가져오는 도중 오류 발생:", error);
  //     }
  //   };


  //   fetchBoardDetail();
  // }, [board_seq]);

  // console.log(boardDetail, "게시물");

  return (
    <>
    <Row className="mt-5"></Row>
    <div className="my-5">
      <div className="header-container">
        <h1 className="detail-header">공지사항</h1>
      </div>
      <div className="detail-container">
        {boardDetail ? (
          <div className="detail-content">
            <h3 className="detail-title">{boardDetail.title}</h3>
            {/* <p className="detail-info">작성자: 관리자 | 날짜: {boardDetail.date}</p> */}
            <p className="detail-info">작성자: 관리자 | 날짜: 2024-07-22</p>
            <hr></hr>
            {/* <p className="detail-text">{boardDetail.content}</p> */}
            <p className="detail-text">여기에 공지사항의 상세 내용이 들어갑니다. 예를 들어, 새로운 기능 업데이트, 이벤트 공지, 중요한 알림 등이 포함될 수 있습니다. 내용을 구체적으로 작성하여 사용자들이 쉽게 이해할 수 있도록 합니다.</p>
            <img src={ boardDetail.img} />
          </div>
        ) : (
          <p className="loading-text">로딩 중...</p>
        )}
        {/* <div className="btn-container">
          <a href="/board" className="btn">목록으로 돌아가기</a>
        </div> */}
      </div>
    </div>
    </>
  );
};

export default EdetaPage;