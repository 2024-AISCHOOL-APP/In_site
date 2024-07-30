import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table, Tab, Tabs, ButtonGroup, ProgressBar, Form } from 'react-bootstrap';
import axios from "../../axios";
import Money_Modal from './Money_Modal';
import Money_Cal from './Money_Cal';

const Money_In = () => {

  const [dataMoney, setDataMoney] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectMoney, setSelectMoney] = useState(null); //수정할 항목
  //체크된 아이템 담을 배열
  const [checkItems, setCheckItems] = useState([]);
  // mem_id로 연결
  const mem_id = window.sessionStorage.getItem('mem_id');
  console.log('mem_id:', mem_id);

  //체크박스 단일 선택
  const handleSingleCheck = (checked, moneys_idx) => {
    if (checked) {
      //단일 선택시 체크된 아이템 배열에 추가
      setCheckItems(prev => [...prev, moneys_idx]);
    } else {
      {
        //단일 선택 해제 시 체크된 아이템 제외한 배열(필터)
        setCheckItems(checkItems.filter((el) => el !== moneys_idx));
      }
    }
  };

  //체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      //전체 선택 클릭시 데이터 모든 아이템(id)을 담은 배열로 checkitems 상태 업데이트
      const idArray = dataMoney.map((el) => el.moneys_idx);
      setCheckItems(idArray);
    } else {
      //전체 선택 해제시 checkitems 을 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    // return new Date(dateString).substring(0,11)
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
      })
      .catch((err) => {
        console.error("데이터 보내기 실패:", err);
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
      alert('하나의 항목만 선택해주세요.')
    }
  };

  const handleDelete = () => {
    axios
      .delete('/Money/m/delete', { data: { ids: checkItems } })
      .then((res) => {
        if (res.data) {
          //삭제되면 프론트의 상태 업데이트
          setDataMoney(dataMoney.filter((item) => !checkItems.includes(item.moneys_idx)));
          setCheckItems([]);
          alert('정말 삭제하시겠습니까?')
        } else {
          console.error("삭제 실패:", res.data);
        }
      })
      .catch((err) => {
        console.error("삭제 요청 실패:", err);
      });
  }

  const handleCloseModal = () => setShowModal(false);

  let today = new Date();
  let day = ['일', '월', '화', '수', '목', '금', '토'];
  const formattedDate = `${today.getMonth() + 1}월 ${today.getDate()}일 ${day[today.getDay()]}요일`;
  console.log(checkItems);

  return (
    <div>
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
                  //체크된 아이템 배열에 해당 아이템이 있으면 선택 활성화, 아닐시 해제
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
      <Money_Modal show={showModal} handleClose={handleCloseModal} data={selectMoney} onUpdate={updatedData}></Money_Modal>
    </div>
  );
};

export default Money_In;