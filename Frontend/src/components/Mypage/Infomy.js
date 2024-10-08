import React, { useEffect, useState } from 'react';
import { faCommentDots, faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import MyDonutCharts from './MyDonutCharts';
import '../../css/Infomy.css';
import Swal from 'sweetalert2';
import axios from "../../axios";
import md5 from 'md5';
import SbzzFile from './SbzzFile';

const Infomy = () => {
  const [InfoId, setInfoId] = useState('');
  const [InfoEmail, setInfoEmail] = useState('');
  const [InfoNick, setInfoNick] = useState('');
  const [InfoPhon, setInfoPhon] = useState('');
  const [InfoPw, setInfoPw] = useState(''); // 해시된 비밀번호
  const [InfoPws, setInfoPws] = useState(''); // 새 비밀번호

  const mem_id = window.sessionStorage.getItem('mem_id');

  useEffect(() => {
    axios.post(`/Myinfo/${mem_id}`)
      .then((res) => {
        setInfoId(res.data.Myinfo[0].mem_id);
        setInfoEmail(res.data.Myinfo[0].mem_email);
        setInfoNick(res.data.Myinfo[0].mem_nick);
        setInfoPhon(res.data.Myinfo[0].mem_phone);
        setInfoPw(res.data.Myinfo[0].mem_pw); // 해시된 비밀번호
      })

      .catch((error) => {
        console.error("Error fetching:", error);
      });
  }, [mem_id]);

  const handleUpdate = (event) => {
    event.preventDefault();

    Swal.fire({
      title: '현재 비밀번호를 입력하세요',
      input: 'password',
      inputAttributes: {
        autocapitalize: 'off',
        required: 'required',
        minLength: 4
      },
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소'
    }).then((passwordResult) => {
      if (passwordResult.isConfirmed) {
        const inputPassword = passwordResult.value;
        const hashedInputPassword = md5(inputPassword);
        console.log(hashedInputPassword, '입력받은 번호');
        console.log(InfoPw, 'db저장번호');


        if (hashedInputPassword === InfoPw) {

          console.log("여기까지 들어오니?");
          const updatedInfo = {
            mem_email: InfoEmail,
            mem_nick: InfoNick,
            mem_phone: InfoPhon,
            mem_pw: InfoPws ? md5(InfoPws) : InfoPw
          };

          axios.post(`/Myinfo/UpdateMyinfo/${mem_id}`, updatedInfo)
            .then(() => {
              Swal.fire({
                icon: 'success',
                text: '정보변경이 완료되었습니다.',
                confirmButtonText: '확인'
              });
            })
            .catch((error) => {
              console.error("Error updating:", error);
              Swal.fire({
                icon: 'error',
                text: '정보변경 실패하였습니다.',
                confirmButtonText: '확인'
              });
            });
        } else {
          Swal.fire({
            icon: 'error',
            text: '비밀번호가 일치하지 않습니다.',
            confirmButtonText: '확인'
          });
        }
      }
    });
  };

  const deleteMember = () => {
    Swal.fire({
      icon: 'question',
      text: '정말 삭제하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '현재 비밀번호를 입력하세요',
          input: 'password',
          inputAttributes: {
            autocapitalize: 'off',
            required: 'required',
            minLength: 4
          },
          showCancelButton: true,
          confirmButtonText: '확인',
          cancelButtonText: '취소'
        }).then((passwordResult) => {
          if (passwordResult.isConfirmed) {
            const inputPassword = passwordResult.value;
            const hashedInputPassword = md5(inputPassword);
            console.log(hashedInputPassword, '입력받은 번호');
            console.log(InfoPw, 'db저장번호');


            if (hashedInputPassword === InfoPw) {

              console.log("여기까지 들어오니?");
              axios.delete(`/Myinfo/Delete/${mem_id}`)
                .then(() => {
                  Swal.fire({
                    icon: 'success',
                    text: '계정이 삭제 되었습니다..',
                    confirmButtonText: '확인'
                  });
                }).then(() => {
                  window.location.href = '/';
                })
                .catch((error) => {
                  console.error("Error updating:", error);
                  Swal.fire({
                    icon: 'error',
                    text: '계정삭제 실패하였습니다.',
                    confirmButtonText: '확인'
                  });
                });
            } else {
              Swal.fire({
                icon: 'error',
                text: '비밀번호가 일치하지 않습니다.',
                confirmButtonText: '확인'
              });
            }
          }
        });;
      }
    });
  };

  return (
    <div>
      <Row>
        <Col className='my-4'>
          {/* <h1>내 정보</h1> */}
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <Form onSubmit={handleUpdate}>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faUser} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="아이디"
                name="mem_id"
                disabled
                value={InfoId}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faLock} />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="새 비밀번호"
                name="mem_pw"
                value={InfoPws}
                onChange={(e) => setInfoPws(e.target.value)}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faEnvelope} />
              </InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="이메일"
                name="mem_email"
                value={InfoEmail}
                onChange={(e) => setInfoEmail(e.target.value)}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faCommentDots} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="닉네임"
                name="mem_nick"
                value={InfoNick}
                onChange={(e) => setInfoNick(e.target.value)}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faCommentDots} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="전화번호 (010-xxxx-xxxx)"
                name="mem_phone"
                maxLength="13"
                value={InfoPhon}
                onChange={(e) => setInfoPhon(e.target.value)}
              />
            </InputGroup>

            <Row>
              <Col lg={6}>
                <Button
                  variant="success"
                  type="submit"
                  className="login-button mb-3"
                >
                  정보변경
                </Button>
              </Col>
              <Col lg={6}>
                <Button
                  variant="danger"
                  type="button"
                  className="login-button mb-3"
                  onClick={deleteMember}
                >
                  회원탈퇴
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>

        <Col lg={6}>
          {/* <MyDonutCharts /> */}
          나의 AI웨딩 플랜 결과
          <SbzzFile></SbzzFile>
        </Col>
      </Row>
    </div >
  );
};

export default Infomy;
