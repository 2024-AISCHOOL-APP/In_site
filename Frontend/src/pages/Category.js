import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button, ButtonGroup } from "react-bootstrap";
import Cnav from "../components/Cnav";
import Ccard from "../components/Ccard";
import Search from "../components/Search";
import axios from "../axios";

const Category = () => {
  const [categorys, setCategorys] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    category_idx: "",
    category_p_name: "",
    category_name: "웨딩홀",
  });

  const handleCategorySelect = (selectedCategory) => {
    setSelectedCategory({
      category_idx: selectedCategory.category_idx,
      category_p_name: selectedCategory.category_p_name,
      category_name: selectedCategory.category_name,
    });
  };

  useEffect(() => {
    const fetchCa = async () => {
      let apiUrl = "/Category/all/wedding";

      if (selectedCategory.category_p_name) {
        apiUrl = `/Category/all/${selectedCategory.category_p_name}`;
        console.log(selectedCategory.category_p_name, "클릭 되서 나오니?");
      }

      try {
        const response = await axios.get(apiUrl);
        console.log(response.data, "API 응답");
        setCategorys(response.data.Categorys || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCa();
  }, [selectedCategory.category_p_name]);

  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 8;

  const filteredWeds = categorys.filter((we) => {
    const storeName = we.store_name.replace(/\s+/g, "").toLowerCase();
    const storeInfo = we.store_info.replace(/\s+/g, "").toLowerCase();
    const query = searchQuery.replace(/\s+/g, "").toLowerCase();
    return storeName.includes(query) || storeInfo.includes(query);
  });

  console.log(filteredWeds, "어떻게 되니??");

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
    <Container className="my-5">
      <Row>
        <Col lg={6} md={12} sm={12} className="t2 my-5">
          카테고리
        </Col>
      </Row>
      <Row>
        <Col>
          <Cnav onCategorySelect={handleCategorySelect} />
        </Col>
      </Row>
      <Row className="my-5 no-gutters">
        <Col lg={12} md={12} sm={12} className="t2">
          {selectedCategory.category_name}
        </Col>
      </Row>

      <Row>
        {paginatedWeds.map((we, index) => (
          <Ccard
            key={index}
            store_img={we.store_img}
            store={we.store_name}
            store_seq={we.store_seq}
            store_info={we.store_info}
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
