import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const Sgal = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewInput, setReviewInput] = useState({ id: '', content: '', rating: 0 });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewInput({ ...reviewInput, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reviewInput.id || !reviewInput.content || !reviewInput.rating) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    const newReview = {
      id: reviewInput.id,
      content: reviewInput.content,
      rating: reviewInput.rating,
    };
    setReviews([...reviews, newReview]);
    setReviewInput({ id: '', content: '', rating: 0 });
  };

  const handleDelete = (id) => {
    const updatedReviews = reviews.filter((review) => review.id !== id);
    setReviews(updatedReviews);
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">리뷰 게시판</h2>

      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title className="text-center">리뷰 작성</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>아이디</Form.Label>
                  <Form.Control
                    type="text"
                    name="id"
                    value={reviewInput.id}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>리뷰 내용</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="content"
                    value={reviewInput.content}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>별점 (1에서 5까지)</Form.Label>
                  <Form.Control
                    type="number"
                    name="rating"
                    min="1"
                    max="5"
                    value={reviewInput.rating}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  리뷰 작성
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <h3 className="mb-4">리뷰 목록</h3>
          {reviews.map((review) => (
            <Card key={review.id} className="mb-3">
              <Card.Body>
                <Card.Title>{review.id}</Card.Title>
                <Card.Text>{review.content}</Card.Text>
                <Card.Text>별점: {review.rating}</Card.Text>
                <Button variant="danger" onClick={() => handleDelete(review.id)}>
                  리뷰 삭제
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Sgal;
