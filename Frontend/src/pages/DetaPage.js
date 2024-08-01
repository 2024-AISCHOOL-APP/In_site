import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axios";
import "../css/DetailPage.css"; // CSS 파일에서 스타일을 정의합니다.
import { Row, Button, Form, Modal, Col } from "react-bootstrap";

const DetailPage = () => {
  const { board_seq } = useParams();
  const [boardDetail, setBoardDetail] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const seq = window.sessionStorage.getItem('mem_seq');

  useEffect(() => {
    const fetchBoardDetail = async () => {
      try {
        const response = await axios.get(`/board/${board_seq}`);
        setBoardDetail(response.data);
        setEditedTitle(response.data.title);
        setEditedContent(response.data.content);
        if (response.data.img) {
          setPreviewImage(`http://localhost:8300${response.data.img}`);
        }
      } catch (error) {
        console.error("게시글 상세 정보를 가져오는 도중 오류 발생:", error);
      }
    };

    fetchBoardDetail();
  }, [board_seq]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/board/${board_seq}`);
      navigate('/Board');
    } catch (error) {
      console.error("게시글 삭제 도중 오류 발생:", error);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("board_title", editedTitle);
    formData.append("board_content", editedContent);
    if (selectedFile) {
      formData.append("board_img", selectedFile);
    }

    try {
      const response = await axios.put(`/board/update/${board_seq}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsEditing(false);
      // 업데이트된 데이터를 상태에 반영
      setBoardDetail({
        ...boardDetail,
        title: editedTitle,
        content: editedContent,
        img: response.data.img || boardDetail.img
      });
      // 이미지가 변경된 경우, 미리보기 이미지를 업데이트
      if (response.data.img) {
        setPreviewImage(`http://localhost:8300${response.data.img}?${new Date().getTime()}`);
      }
    } catch (error) {
      console.error("게시글 수정 도중 오류 발생:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    document.getElementById('imageInput').click();
  };

  const handleRemoveImage = () => {
    setPreviewImage("");
    setSelectedFile(null);
  };

  return (
    <>
      <Row className="mt-5"></Row>
      <div className="my-5">
        <div className="header-container">
          <h1 className="detail-header">공지사항 작성</h1>
        </div>
        <div className="detail-container my-5">
          {seq === '0' && !isEditing && (
            <Row className="button-group">
              <Col>
              <Button onClick={handleEdit} variant='warning' className="btn me-2">
                수정
              </Button>
              <Button 
                onClick={() => setShowDeleteModal(true)} 
                variant='danger' 
                className="btn"
              >
                삭제
              </Button>
              </Col>
            </Row>
          )}
          {isEditing ? (
            <div className="detail-content">
              <Form.Group controlId="formTitle" className="title">
                <Form.Label>제목</Form.Label>
                <Form.Control
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="제목을 입력하세요"
                />
              </Form.Group>
              <Form.Group controlId="formContent" className="content">
                <Form.Label>내용</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  placeholder="내용을 입력하세요"
                />
              </Form.Group>
              <Form.Group controlId="formFile" className="file">
                <Form.Label>이미지 파일</Form.Label>
                <Button
                  variant="primary" 
                  onClick={triggerFileInput}
                  className="custom-select-button"
                >
                  이미지 선택
                </Button>
                <input
                  id="imageInput"
                  type="file"
                  className="hidden-file-input"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                {previewImage && (
                  <div className="image-preview">
                    <img src={previewImage} alt="미리보기" style={{ maxWidth: '100%', marginTop: '10px' }} />
                    <Button variant="danger" onClick={handleRemoveImage} style={{ marginTop: '10px' }}>
                      이미지 제거
                    </Button>
                  </div>
                )}
              </Form.Group>
              <Button onClick={handleSave} variant="success" className="mt-3">
                저장
              </Button>
            </div>
          ) : (
            <div className="detail-content">
              <h3 className="detail-title">{boardDetail?.title}</h3>
              <p className="detail-info">작성자: 관리자 | 날짜: 2024-07-29</p>
              <hr />
              <p className="detail-text">
                {boardDetail?.content}
              </p>
              {boardDetail?.img && (
                <img
                  src={previewImage}
                  alt="Board Detail"
                  style={{ maxWidth: '100%' }}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>삭제 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            취소
          </Button>
          <Button 
            variant="danger" 
            onClick={async () => {
              await handleDelete();
              setShowDeleteModal(false);
            }}
          >
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DetailPage;
