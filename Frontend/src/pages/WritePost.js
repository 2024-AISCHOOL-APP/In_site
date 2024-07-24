import React, { useRef, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import "../css/WritePost.css"
import axios from "../axios";

const WritePost = () => {

    const [groomUploaded, setGroomUploaded] = useState(false);

    const [board_title,setBoard_title] = useState('')
    const [board_content,setBoard_content] = useState('')


    let b_title = useRef();
    let b_content = useRef();
    let b_img = useRef();


    const handleGroomUpload = () => {
        setGroomUploaded(true);
      };  
      
      // const handleSave = () => {
      //   // Construct the newEvent object
      //   const newEvent = {
      //     b_title,
      //     b_content,
      //     b_img,
      //     // mem_id,
      //   };
      
      //   // Send the newEvent object to the server using axios
      //   axios.post('/board/add', newEvent)
      //     .then(response => {
      //       console.log('새 이벤트가 성공적으로 추가되었습니다:', response.data);
      //       handleClose(response.data); // Close modal and possibly pass data back to parent component
      //     })
      //     .catch(error => {
      //       console.error('새 이벤트 추가 실패:', error);
      //       alert('새 이벤트 추가 중 오류가 발생했습니다.');
      //     });
      // };





  return (
    <>
    <Row className='mt-5'></Row>
    <Container className='my-5'>
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
                  ref={b_title}
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
          ref={b_content}
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
                <Button className="me-4" style={{backgroundColor:'#DAC4FB', color:'black', border:'#DAC4FB'}}>취소</Button>
                <Button className="me-4" style={{backgroundColor:'#DAC4FB',color:'black',border:'#DAC4FB'}}>작성</Button>
              </Col>
            </Row>
   
    </Container>
    </>
  )
}

export default WritePost