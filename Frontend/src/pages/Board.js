import { Container,Row,Col,Button } from "react-bootstrap";
import Paginated from "../components/Paginated";
import axios from "../axios";
import { useEffect, useState,useCallback } from "react";
import { useNavigate} from "react-router-dom";
import Swal from 'sweetalert2';



function Board() {
    const [datass,setData] = useState([])
    const navigate = useNavigate();
    const navigateTo = useCallback((path) => navigate(path), [navigate]);


    let mem_id = window.sessionStorage.getItem('mem_id');
    let seq = window.sessionStorage.getItem('mem_seq')
    useEffect(() => {
      axios
        .get("/board")
        .then((res) => {
          console.log("게시판 데이터", res.data.board);
          setData(res.data.board);
    
        })
        .catch(() => {
          console.log("데이터 보내기 실패");
        });
    },[])

  //   let datass=[
  //     {index : 1,board_seq:1,id:1,board_title:1,region:1},
  //     {index : 1,board_seq:1,id:1,board_title:1,region:1},
  //     {index : 1,board_seq:1,id:1,board_title:'제목',region:1},
  //     {index : 1,board_seq:1,id:1,board_title:1,region:1},
  //     {index : 1,board_seq:1,id:1,board_title:1,region:1},
  //     {index : 1,board_seq:1,id:1,board_title:1,region:1},
  //     {index : 1,board_seq:1,id:1,board_title:1,region:1},
  //     {index : 1,board_seq:1,id:1,board_title:1,region:1},
  //     {index : 1,board_seq:1,id:1,board_title:1,region:1},
  //     {index : 1,board_seq:1,id:1,board_title:'제목',region:1},
  //     {index : 1,board_seq:1,id:1,board_title:1,region:1},
  //     {index : 1,board_seq:1,id:1,board_title:1,region:1},
  //     {index : 1,board_seq:1,id:1,board_title:1,region:1},
  //     {index : 1,board_seq:1,id:1,board_title:1,region:1},

  // ]



  return (
    <>
    <Row className="mt-5">
    </Row>
    <Container className="my-5">
        <Row className="my-3"> 
            <Col className="jusify-content-left">
                <h3>공지사항</h3>
            </Col>
        </Row>
        {/* <Row className="mt-3 mt-md-0">
          <Col xs={12} className="d-flex justify-content-end">

                  <Button
                    id="write-button"
                    variant="primary"
                    onClick={() =>mem_id ? navigateTo("/WritePost") : Swal.fire({
                      icon: 'error',
                      text: '로그인 후 이용해주세요',
                      confirmButtonText: '확인'
                    })}
                  >
                    글쓰기
                  </Button>
           
          </Col>
        </Row> */}
         {seq == 0 && (
       <Row className="mt-3 mt-md-0">
          <Col xs={12} className="d-flex justify-content-end">    
                  <Button
                    id="write-button"
                    variant="primary"
                    onClick={()=> navigateTo('/writePost')}
                 >
                    글쓰기
                  </Button>
           
          </Col>
        </Row>
         )}
        <Row className="my-5">
            <Col>
            <Paginated
          data={datass.map((board, cnt) => ({
            index: cnt + 1,
            board_seq: board.board_seq,
            id: '관리자',
            time : board.board_at.substring(0, 10),
            board_title: board.board_title,
            view:board.board_views,
          }))}

          columns={[
            { accessor: "index",
              Header : "순서"
             },
            {
              accessor: "board_title",
              Header: "제목",
              width: "70%",
              Cell: ({ row }) => (
                <span
                onClick={() => navigateTo(`/board/${row.original.board_seq}`)}
                >
                    {row.values.board_title}

                </span>
              ),
            },
            { accessor: "id", Header: "작성자" },
            { accessor: "time", Header: "날짜" }, // 포매팅된 날짜 표시
            { accessor: "view", Header: "조회" },
          ]}
        />
            </Col>
        </Row>
    </Container>
    </>
  );
}

export default  Board;