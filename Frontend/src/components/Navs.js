import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Image, Nav, Navbar, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../css/Nav.css";
import axios from "axios";

function Navs() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigateTo = useCallback((path) => navigate(path), [navigate]);

  let mem_id = sessionStorage.getItem('mem_id')

  useEffect(() => {
    if(mem_id === null){

        console.log('isLogin ?? :: ', isLoggedIn)
      } else {

      console.log('isLogin ?? :: ',isLoggedIn)
      setIsLoggedIn(true)
        
      }
  }, []); 

  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/logout');
      sessionStorage.clear(); 
      setIsLoggedIn(false); 
      window.location.href = "../"
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <>
    <Row style={{backgroundColor:"#DAC4FB", height:"auto"}}>
      <Col>
          <img src="img/weddd.png" className="logo5"/>
      </Col>
    </Row>
    <Navbar expand="lg" className="custom-navbar" >
      <Container style={{ maxWidth: "80%" }}>
        {/* <Navbar.Brand onClick={() => navigateTo("/")}>
          <img
            src="img/weddd.png"
            alt="로고"
            className="navbar-logo"
          />
        </Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-center">
            <Nav.Link onClick={() => navigateTo("/")}>홈</Nav.Link>
            <Nav.Link onClick={() => navigateTo("/Board")}>공지사항</Nav.Link>
            <Nav.Link onClick={() => navigateTo("/Category")}>카테고리</Nav.Link>
            <Nav.Link onClick={() => navigateTo("/Events")}>이벤트</Nav.Link>
            <Nav.Link onClick={() => navigateTo("/Aichoice")}>AI추천</Nav.Link>
            


          </Nav>
          <Nav className="align-items-center">
            {isLoggedIn ? (
              <>
                <Nav.Link onClick={() => navigateTo("/Mypage")}>
                  마이페이지{" "}
                </Nav.Link>
                <Nav.Link onClick={logout}>로그아웃</Nav.Link>
                <img
                  // src={profileImageUrl}
                  roundedCircle
                  className="navbar-logo mx-2 d-lg-inline d-none"
                  // onClick={handleProfileClick}
                />
              </>
            ) : (
              <>
                {/* 로그인 페이지로 연결하는 링크 */}
                <Nav.Link onClick={() => navigateTo("/Login")}>로그인</Nav.Link>
                {/* 회원가입 페이지로 연결하는 링크 */}
                <Nav.Link onClick={() => navigateTo("/Register")}>
                  회원가입
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default Navs;
