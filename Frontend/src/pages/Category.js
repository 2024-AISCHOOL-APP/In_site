import React, { useState } from "react";
import { Col, Container, Row, Button, ButtonGroup } from "react-bootstrap";
import Cnav from "../components/Cnav";
import Ccard from "../components/Ccard";
import Search from "../components/Search";

const Category = () => {
  const weds = [
    { wed_img: "img/dmer.jpg", wed: "드메르", wed_seq: 123456 },
    { wed_img: "img/dmer.jpg", wed: "에시", wed_seq: 123456 },
    { wed_img: "img/dmer.jpg", wed: "에시", wed_seq: 123456 },
    { wed_img: "img/dmer.jpg", wed: "에시", wed_seq: 123456 },
    { wed_img: "img/dmer.jpg", wed: "에시", wed_seq: 123456 },
    { wed_img: "img/dmer.jpg", wed: "에시", wed_seq: 123456 },
    { wed_img: "img/dmer.jpg", wed: "에시", wed_seq: 123456 },
    { wed_img: "img/dmer.jpg", wed: "에시", wed_seq: 123456 },
    { wed_img: "img/dmer.jpg", wed: "에시", wed_seq: 123456 },
    { wed_img: "img/dmer.jpg", wed: "에시", wed_seq: 123456 },
    { wed_img: "img/dmer.jpg", wed: "에시", wed_seq: 123456 },
    { wed_img: "img/dmer.jpg", wed: "에시", wed_seq: 123456 },
    { wed_img: "img/dmer.jpg", wed: "에시", wed_seq: 123456 },
    { wed_img: "img/dmer.jpg", wed: "에시", wed_seq: 123456 },
    { wed_img: "img/dmer.jpg", wed: "에시", wed_seq: 123456 },
    { wed_img: "img/dmer.jpg", wed: "에시", wed_seq: 123456 },
    { wed_img: "img/dmer.jpg", wed: "에시", wed_seq: 123456 },
    { wed_img: "img/dmer.jpg", wed: "에시", wed_seq: 123456 },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 8;

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
    setCurrentPage(0); // Reset to the first page on new search
  };

  return (
    <Container className="my-5">
      <Row>
        <Col lg={6} md={12} sm={12} className="t2 my-5">
          카테고리
        </Col>
      </Row>
      <Row>
        <Col>
          <Cnav />
        </Col>
      </Row>
      <Row className="my-5 no-gutters">
        <Col lg={12} md={12} sm={12} className="t2">
          드레스샵
        </Col>
      </Row>

      <Row>
        {paginatedWeds.map((we, index) => (
          <Ccard
            key={index}
            wed_img={we.wed_img}
            wed={we.wed}
            wed_seq={we.wed_seq}
          />
        ))}
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
      <Search onSubmit={handleSearch} />
    </Container>
  );
};

export default Category;
