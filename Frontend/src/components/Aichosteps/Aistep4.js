import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Col, Container, Row, Button, Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Appdata } from '../../App';
import "../../css/Aichost.css";
import Swal from 'sweetalert2';


const Aistep4 = () => {
  const data = useContext(Appdata);
  console.log(data, "5단계 확인");

  let mem_id = window.sessionStorage.getItem('mem_id');

  const navigate = useNavigate();
  const navigateTo = useCallback((path) => navigate(path), [navigate]);

  const [groomUploaded, setGroomUploaded] = useState(false);
  const [brideUploaded, setBrideUploaded] = useState(false);
  const [husimg,setHusimg] = useState('')
  const [wedimg,setWedimg] = useState('')

  
  let husref = useRef();
  let wedref = useRef();

  const handleGroomUpload = () => {
    setGroomUploaded(true);
  };

  const handleBrideUpload = () => {
    setBrideUploaded(true);
  };

  const Back = () => {
    navigateTo(-1);
  };

  function Next(){
    
    if(mem_id){
      setHusimg(husref.current.value)
      setWedimg(wedref.current.value)
    }
    else{
      Swal.fire({
        icon: 'warning',
        text: '로그인 후 이용해주세요',
        confirmButtonText: '확인'
      })
    }

  }

  useEffect(()=>{
  if(husimg!== '' || wedimg!== '') {
    
    let result ={
        lref : data.shareData.lref,
        sref : data.shareData.sref,
        dates : data.shareData.dates,
        times : data.shareData.times,
        moneys : data.shareData.moneys,
        persons : data.shareData.persons,
        pluspersons : data.shareData.pluspersons,
        husimg : husimg,
        wedimg : wedimg

    }
    navigateTo("/Aichoice/2/3/4/5")
    data.setShare(result)
}
},[husimg,wedimg])


  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="m-auto p-4">
            <Row>
              <Col className="Qtitle">Q 05.</Col>
            </Row>
            <Row className="my-2">
              <Col className="Qti2">사진을 올려주세요</Col>
            </Row>
            <Row className="my-5">
              <Col md={11} sm={10} xs={10} className="m-auto text-center">
                <div className={`image-upload-box ${groomUploaded ? 'uploaded' : ''}`}>
                  <label 
                    htmlFor="groom-upload" 
                    className="custom-file-upload"
                  >
                    {groomUploaded ? "신랑 이미지가 업로드 되었습니다" : "신랑 사진을 올려주세요"}
                  </label>
                  <input 
                    id="groom-upload" 
                    type="file" 
                    onChange={handleGroomUpload}
                    ref={husref}
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={11} sm={10} xs={10} className="m-auto text-center">
                <div className={`image-upload-box ${brideUploaded ? 'uploaded' : ''}`}>
                  <label 
                    htmlFor="bride-upload" 
                    className="custom-file-upload"
                  >
                    {brideUploaded ? "신부 이미지가 업로드 되었습니다" : "신부 사진을 올려주세요"}
                  </label>
                  <input 
                    id="bride-upload" 
                    type="file" 
                    onChange={handleBrideUpload}
                    ref={wedref}
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col className="mt-3">
                <Image src="/img/Warning.png" className="wicon" />
                <span className="wrfon">전신사진과 얼굴 사진을 올려주세요</span>
              </Col>
            </Row>

            <Row>
              <Col className="my-5 text-center">
                <Button onClick={Back} className="me-4 btns">이전</Button>
                <Button onClick={Next} className="me-4 btns">결과</Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Aistep4;
