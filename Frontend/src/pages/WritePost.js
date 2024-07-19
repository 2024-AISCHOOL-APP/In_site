import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import "../css/WritePost.css"
const WritePost = () => {

    const [groomUploaded, setGroomUploaded] = useState(false);

    const handleGroomUpload = () => {
        setGroomUploaded(true);
      };
  return (
    <>
    <Container>
        <Row>
            <Col style={{fontSize:"25px",fontWeight:'bold'}}>공지사항 작성</Col>
        </Row>
        <Row>
            <Col className='t2'>제목</Col>
        </Row>
        <Row className='mt-3'>
            <Col>
            <Form.Control
                  type="text"
                  placeholder="제목"
                />
            </Col>
        </Row>
   
        <Row className='mt-3'>
            <Col className='t2'>내용</Col>
        </Row>
        <Row className='mt-3'>
            <Col>
            <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '500px' }}
        />
            </Col>
        </Row>
        <Row>
            <Col className='t2'>첨부파일</Col>
        </Row>
        <Row className="my-5">
              <Col className="m-auto text-center">
                <div className={`image-upload-boxs ${groomUploaded ? 'uploaded' : ''}`}>
                  <label 
                    htmlFor="groom-upload" 
                    className="custom-file-uploads"
                  >
                    {groomUploaded ? "이미지가 업로드 되었습니다" : "이미지를 올려주세요"}
                  </label>
                  <input 
                    id="groom-upload" 
                    type="file" 
                    onChange={handleGroomUpload}
                  />
                </div>
              </Col>
            </Row>

        <Row> 
              <Col className='my-5'>
                <Button className="me-4">취소</Button>
                <Button className="me-4">작성</Button>
              </Col>
            </Row>
   
    </Container>
    </>
  )
}

export default WritePost