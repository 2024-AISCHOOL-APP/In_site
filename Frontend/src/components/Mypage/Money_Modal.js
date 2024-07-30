import React, { useEffect, useState } from 'react'
import {Modal, Button, Form, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'react-bootstrap';
import axios from "../../axios";


const Money_Modal = ({show, handleClose, data, onUpdate}) => {
      const[category, setCategory] = useState('');
      const[content, setContent] = useState('');
      const[price, setPrice] = useState(0);
      const[date, setDate] = useState('');
      const[bank, setBank] = useState('');
      const[select, setSelect] = useState('카테고리 선택');
    let mem_id = window.sessionStorage.getItem('mem_id')

useEffect(() => {
  if(data) {
    setCategory(data.category_name);
    setContent(data.moneys_content);
    setPrice(data.moneys_amount);
    setDate(data.moneys_created_at);
    setBank(data.moneys_bank);
    setSelect(data.category_name);
  }
}, [data]);
  
    const handleSave = () => {
      // Construct the newEvent object
      const postData = {
        moneys_idx : data?.moneys_idx, // 수정시 필요
        category : select,
        content,
        price,
        bank,
        date,
        mem_id
      };
      console.log(data,"sdfsfsfddddd");
      handleClose();        

      if(data) { 
        // 수정 요청
        axios
          .post('/Money/m/update', postData)
          .then(res => {
            console.log("수정 성공:", res.data);
            onUpdate(); //부모 컴포넌트 상태 업데이트
          })
          .catch(err => {
            console.error("수정 실패:", err);
            
          });

      }  else {
        //추가 요청
        axios
          .post('/Money/m/add', postData)
          .then(res => {
            console.log("추가 성공:", res.data);
            onUpdate(); //부모 컴포넌트 상태 업데이트
            handleClose();
          })
          .catch(err => {
            console.error("추가 실패:", err.response ? err.response.data : err.message);
          });
        }
      };    

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton style={{ backgroundColor: '#F89DFF' }}>
        <Modal.Title>{data ? '수정' : '추가'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <Form>
                <Form.Group controlId='formCategory'>
                    <Form.Label>카테고리</Form.Label>
                    <Dropdown>
                      <DropdownToggle variant='success' id='dropdown-basic'>{select}</DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={() => setSelect('웨딩홀')}>웨딩홀</DropdownItem>
                        <DropdownItem onClick={() => setSelect('스튜디오')}>스튜디오</DropdownItem>
                        <DropdownItem onClick={() => setSelect('드레스')}>드레스</DropdownItem>
                        <DropdownItem onClick={() => setSelect('메이크업')}>메이크업</DropdownItem>
                        <DropdownItem onClick={() => setSelect('기타')}>기타</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>

                </Form.Group>
                <Form.Group className='mt-4'>
                    <Form.Label>내용</Form.Label>
                    <Form.Control type="text" name="moneys_contents" value={content}  
                    onChange={(e) => setContent(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>금액</Form.Label>
                    <Form.Control type="number" name="moneys_amount" value={price}
                    onChange={(e) => setPrice(e.target.value)}  />
                </Form.Group>
                <Form.Group>
                    <Form.Label>계좌 구분</Form.Label>
                    <Form.Control type="text" name="moneys_bank" value={bank}
                    onChange={(e) => setBank(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>날짜</Form.Label>
                    <Form.Control type="date" name="date" value={date}
                    onChange={(e) => setDate(e.target.value)} />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            닫기
        </Button>
        <Button variant="primary" onClick={handleSave}>
            저장
        </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default Money_Modal