import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table, Tab, Tabs, ButtonGroup, ProgressBar, Form } from 'react-bootstrap';
import axios from "../../axios";
import Money_Modal from './Money_Modal';
import Money_Cal from './Money_Cal';
import Swal from 'sweetalert2';

const Money_In = () => {
  const [dataMoney, setDataMoney] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectMoney, setSelectMoney] = useState(null); //수정할 항목
  const [checkItems, setCheckItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const mem_id = window.sessionStorage.getItem('mem_id');
  console.log('mem_id:', mem_id);

  const handleSingleCheck = (checked, moneys_idx) => {
    if (checked) {
      setCheckItems(prev => [...prev, moneys_idx]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== moneys_idx));
    }
  };

  const handleAllCheck = (checked) => {
    if (checked) {
      const idArray = dataMoney.map((el) => el.moneys_idx);
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('ko-KR', options).replace('/\./g', '-').replace('/\s+/g', '');
  };

  const sortDataByDateDesc = (data) => {
    return data.sort((a, b) => new Date(b.moneys_created_at) - new Date(a.moneys_created_at));
  };

  useEffect(() => {
    axios
      .post(`/Money/${mem_id}`)
      .then((res) => {
        console.log("백엔드 응답 데이터:", res.data);
        if (res.data.MyMoney) {
          const formattedData = res.data.MyMoney.map(item => {
            const formattedDate = formatDate(item.moneys_created_at);
            return {
              ...item,
              moneys_created_at: formattedDate
            };
          });
          setDataMoney(sortDataByDateDesc(formattedData));
        } else {
          console.error("MyMoney 데이터가 없습니다.");
        }
        setIsLoading(false); // 데이터 로딩 완료
      })
      .catch((err) => {
        console.error("데이터 보내기 실패:", err);
        setIsLoading(false); // 데이터 로딩 실패
      });
  }, [mem_id, showModal]);

  const handleShowModal = () => {
    setSelectMoney(null); // 새로운 항목 추가 시 선택된 항목 초기화
    setShowModal(true);
  }

  const updatedData = () => {
    axios.post(`/Money/${mem_id}`)
      .then((res) => {
        if (res.data.MyMoney) {
          const formattedData = res.data.MyMoney.map(item => {
            const formattedDate = formatDate(item.moneys_created_at);
            return {
              ...item,
              moneys_created_at: formattedDate
            };
          });
          setDataMoney(sortDataByDateDesc(formattedData));
        } else {
          console.error("MyMoney 데이터가 없습니다.");
        }
      })
      .catch((err) => {
        console.error("데이터 가져오기 실패:", err);
      });
  }

  const handleEditModal = () => {
    if (checkItems.length === 1) {
      const moneyEdit = dataMoney.find(item => item.moneys_idx === checkItems[0]);
      setSelectMoney(moneyEdit); // 선택된 항목을 수정 상태로 변경
      setShowModal(true);
    } else {
      Swal.fire({
        icon: 'warning',
        title: '경고',
        text: '하나의 항목만 선택해주세요.'
      });
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: '정말 삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete('/Money/m/delete', { data: { ids: checkItems } })
          .then((res) => {
            if (res.data) {
              setDataMoney(dataMoney.filter((item) => !checkItems.includes(item.moneys_idx)));
              setCheckItems([]);
              Swal.fire({
                icon: 'success',
                title: '삭제 완료',
                text: '선택된 항목이 삭제되었습니다.'
              });
            } else {
              console.error("삭제 실패:", res.data);
            }
          })
          .catch((err) => {
            console.error("삭제 요청 실패:", err);
          });
      }
    });
  }

  const handleCloseModal = () => setShowModal(false);

  let today = new Date();
  let day = ['일', '월', '화', '수', '목', '금', '토'];
  const formattedDate = `${today.getMonth() + 1}월 ${today.getDate()}일 ${day[today.getDay()]}요일`;
  console.log(checkItems);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : dataMoney.length === 0 ? (
        <div>
          <p>데이터가 없습니다. 데이터를 추가해주세요.</p>
          <button className='btn' variant="primary" onClick={handleShowModal}>데이터 추가</button>
        </div>
      ) : (
        <>
          <Table responsive="sm">
            <thead>
              <tr>
                <th colSpan={12} style={{ position: 'relative', left: 0, color: 'gray' }}>오늘은 {formattedDate}입니다.</th>
              </tr>
              <tr>
                <td className='second-row'>
                  <input
                    type='checkbox'
                    name='select-all'
                    onChange={(e) => handleAllCheck(e.target.checked)}
                    checked={checkItems.length === dataMoney.length} /> 전체선택</td>
                <th>카테고리</th>
                <th>내용</th>
                <th>금액</th>
                <th>계좌구분</th>
                <th>날짜</th>
              </tr>
            </thead>
            <tbody>
              {dataMoney.map((dataMoney) => (
                <tr key={dataMoney.moneys_idx}>
                  <td>
                    <input type='checkbox' name={`select-${dataMoney.moneys_idx}`}
                      onChange={(e) => handleSingleCheck(e.target.checked, dataMoney.moneys_idx)}
                      checked={checkItems.includes(dataMoney.moneys_idx)} />
                  </td>
                  <td>{dataMoney.category_name}</td>
                  <td>{dataMoney.moneys_contents}</td>
                  <td>{dataMoney.moneys_amount}</td>
                  <td>{dataMoney.moneys_bank}</td>
                  <td>{dataMoney.moneys_created_at}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ButtonGroup aria-label="Basic example" >
            <Button variant="secondary" onClick={handleShowModal}>추가</Button>
            <Button variant="secondary" onClick={handleEditModal}>수정</Button>
            <Button variant="secondary" onClick={handleDelete}>삭제</Button>
          </ButtonGroup>
        </>
      )}
      <Money_Modal show={showModal} handleClose={handleCloseModal} data={selectMoney} onUpdate={updatedData}></Money_Modal>
    </div>
  );
};

export default Money_In;
