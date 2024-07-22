import React, { useState } from 'react'
import { Col, Container, Row ,Button,ButtonGroup} from 'react-bootstrap'
import Search from '../components/Search'
import Ecard from '../components/Ecard';

const Events = () => {

  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 8;


  const weds = [
    { wed_img: "img/dmer.jpg", wed: "드메르", wed_seq: 123456 },
    { wed_img: "img/dmer.jpg", wed: "에시", wed_seq: 123456 },
  ];



  const filteredWeds = weds.filter((we) =>
    we.wed.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredWeds.length / itemsPerPage);

  const gotoPage = (page) => {
    setCurrentPage(page);
  };

  const previousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const paginatedWeds = filteredWeds.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(0); 
  };
  
  return (
    <>
    <Row className="mt-5">
    </Row>
    <Container className='my-5'>
      <Row>
        <Col lg={6} md={12} sm={12} className="t2">
          이벤트
        </Col>
        <Col lg={6} md={12} sm={12}>
          <Search/>
        </Col>
      </Row>
      <Row>
        <Ecard/>
      </Row>
      <div className="pagination-container d-flex justify-content-center align-items-center mt-3">
        <ButtonGroup>
          <Button
            onClick={() => gotoPage(0)}
            disabled={currentPage === 0}
            variant="primary"
            size="sm"
          >
            {"<<"}
          </Button>
          <Button
            onClick={previousPage}
            disabled={currentPage === 0}
            variant="primary"
            size="sm"
          >
            이전
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              onClick={() => gotoPage(i)}
              variant="light"
              size="sm"
              style={{
                backgroundColor: currentPage === i ? "#DAC4FB" : "lightgray",
                color: currentPage === i ? "black" : "black",
              }}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            variant="primary"
            size="sm"
          >
            다음
          </Button>
          <Button
            onClick={() => gotoPage(totalPages - 1)}
            disabled={currentPage === totalPages - 1}
            variant="primary"
            size="sm"
          >
            {">>"}
          </Button>
        </ButtonGroup>
      </div>
    </Container>
    </>
  )
}

export default Events