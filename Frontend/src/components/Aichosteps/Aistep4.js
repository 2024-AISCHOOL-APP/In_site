import React, { useCallback, useContext, useRef, useState } from "react";
import { Col, Container, Row, Button, Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Appdata } from '../../App';
import "../../css/Aichost.css";
import Swal from 'sweetalert2';
import axios from "../../axios";


const Aistep4 = () => {
  const data = useContext(Appdata);
  const navigate = useNavigate();
  const navigateTo = useCallback((path) => navigate(path), [navigate]);

  const [groomImage, setGroomImage] = useState(null);
  const [brideImage, setBrideImage] = useState(null);

  const groomRef = useRef();
  const brideRef = useRef();

  const handleFileUpload = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleGroomUpload = (event) => {
    handleFileUpload(event, setGroomImage);
  };

  const handleBrideUpload = (event) => {
    handleFileUpload(event, setBrideImage);
  };

  const Back = () => {
    navigateTo(-1);
  };

  const Next = async () => {
    const mem_id = window.sessionStorage.getItem('mem_id');

    if (mem_id) {
      const formData = new FormData();
      if (groomImage) {
        formData.append('groomImage', groomImage);
      }
      if (brideImage) {
        formData.append('brideImage', brideImage);
      }

      formData.append('lref', data.shareData.lref);
      formData.append('sref', data.shareData.sref);
      formData.append('dates', data.shareData.dates);
      formData.append('times', data.shareData.times);
      formData.append('moneys', data.shareData.moneys);
      formData.append('persons', data.shareData.persons);
      formData.append('pluspersons', data.shareData.pluspersons);

      try {
        const response = await axios.post('http://localhost:8500/upload', formData);

        if (response.status === 200) {
          const { groomImagePath, brideImagePath } = response.data;

          let finalData = {
            lref: data.shareData.lref,
            sref: data.shareData.sref,
            dates: data.shareData.dates,
            times: data.shareData.times,
            moneys: data.shareData.moneys,
            persons: data.shareData.persons,
            pluspersons: data.shareData.pluspersons,
            groomImage: groomImagePath,
            brideImage: brideImagePath
          };

          data.setShare(finalData);
          navigateTo("/Aichoice/2/3/4/5");
        } else {
          console.error('파일 업로드 실패');
        }
      } catch (error) {
        console.error('파일 업로드 중 오류 발생:', error);
      }
    } else {
      Swal.fire({
        icon: 'warning',
        text: '로그인 후 이용해주세요',
        confirmButtonText: '확인'
      });
    }
  };

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
                <div className={`image-upload-box ${groomImage ? 'uploaded' : ''}`}>
                  <label 
                    htmlFor="groom-upload" 
                    className="custom-file-upload"
                  >
                    {groomImage ? "신랑 이미지가 업로드 되었습니다" : "신랑 사진을 올려주세요"}
                  </label>
                  <input 
                    id="groom-upload" 
                    type="file" 
                    onChange={handleGroomUpload}
                    ref={groomRef}
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={11} sm={10} xs={10} className="m-auto text-center">
                <div className={`image-upload-box ${brideImage ? 'uploaded' : ''}`}>
                  <label 
                    htmlFor="bride-upload" 
                    className="custom-file-upload"
                  >
                    {brideImage ? "신부 이미지가 업로드 되었습니다" : "신부 사진을 올려주세요"}
                  </label>
                  <input 
                    id="bride-upload" 
                    type="file" 
                    onChange={handleBrideUpload}
                    ref={brideRef}
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
