import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Col, Container, Row, Form, Button, Card } from 'react-bootstrap';
import "../../css/Aichost.css";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Appdata } from '../../App';

const Aistep1 = () => {
    const navigate = useNavigate();

    const [lref,setLref] = useState('')
    const [sref,setSref] = useState('')

  const navigateTo = useCallback((path) => navigate(path), [navigate]);
  const data = useContext(Appdata)

  let lrefs = useRef()
  let srefs = useRef()

  function Back(){
    navigateTo("/")
  }


  function Next(){
    setLref(lrefs.current.value)
    setSref(srefs.current.value)

  }


  useEffect(()=>{
  if(lref!== ''&& sref !=='') {
    
    let result ={
        lref : lref,
        sref : sref
    }
    navigateTo("/Aichoice/2")
    data.setShare(result)
}
},[lref,sref])
  return (
    <Container className='my-5'>
      <Row className="justify-content-center">
        <Col md={6}>  
          <Card className='m-auto'>
            <Row> 
              <Col className='Qtitle'>
                Q 01.
              </Col>
            </Row>
            <Row className='my-2'>
              <Col className='Qti2'>
                예식을 원하는 지역을 선택 해주세요
              </Col>
            </Row>
            <Row className='my-3'>
              <Col className='Qtit3'>
                지역을 선택해주세요
              </Col> 
            </Row>

            <Row>
              <Col md={11} sm={10} xs={10} className='m-auto'>
                <Form.Select disabled>
                  <option ref={lrefs}>광주</option>
                </Form.Select>
              </Col>
            </Row>
            <Row className='my-3'>
              <Col  className='Qtit3'>
                상세지역을 선택해주세요
              </Col>
            </Row>

            <Row>
              <Col md={11} sm={10} xs={10} className='m-auto'>
                <Form.Select  ref={srefs}>
                <option value="">선택하세요</option>

                  <option>남구</option>
                  <option>서구</option>
                  <option>북구</option>
                  <option>동구</option>
                  <option>광산구</option>
                </Form.Select>
              </Col>
            </Row>

            <Row> 
              <Col className='my-5 text-center'>
                <Button  onClick={Back} className="me-4 btns">취소</Button>
                <Button  onClick={Next} className="me-4 btns">다음</Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Aistep1;
