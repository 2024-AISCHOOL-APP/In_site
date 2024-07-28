import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "../css/Carousels3.css";
import Modal from "react-bootstrap/Modal";

const Carousel3 = () => {
    const [index, setIndex] = useState(0);
    const [modalShow, setModalShow] = useState(false);
    const [modalImage, setModalImage] = useState("");
    
  
    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
    };
  
    const handleImageClick = (imageSrc) => {
      setModalImage(imageSrc);
      setModalShow(true);
    };
    
    
  
    return (

  <>
  <Carousel activeIndex={index} onSelect={handleSelect} className="custom-carousel2">
    <Carousel.Item>
      <div className="image-container2">
        <img
          className="custom-img2"
          src="/img/mig.png"
          alt="First slide"
          onClick={() => handleImageClick("/img/mig.png")}
        />
        <img
          className="custom-img2"
          src="/img/dmer.jpg"
          alt="Second slide"
          onClick={() => handleImageClick("/img/dmer.jpg")}
        />
        <img
          className="custom-img2"
          src="/img/main3.png"
          alt="Third slide"
          onClick={() => handleImageClick("/img/main3.png")}
        />
        <img
          className="custom-img2"
          src="/img/mig.png"
          alt="First slide"
          onClick={() => handleImageClick("/img/mig.png")}
        />
       
      </div>
    </Carousel.Item>  
    <Carousel.Item>
      <div className="image-container2">
        <img
          className="custom-img2"
          src="/img/mig.png"
          alt="First slide"
          onClick={() => handleImageClick("/img/mig.png")}
        />
        <img
          className="custom-img2"
          src="/img/dmer.jpg"
          alt="Second slide"
          onClick={() => handleImageClick("/img/dmer.jpg")}
        />
        <img
          className="custom-img2"
          src="/img/main3.png"
          alt="Third slide"
          onClick={() => handleImageClick("/img/main3.png")}
        />
        <img
          className="custom-img2"
          src="/img/mig.png"
          alt="First slide"
          onClick={() => handleImageClick("/img/mig.png")}
        />
        
      </div>
    </Carousel.Item>
    {/* 추가 슬라이드가 필요하면 위와 동일하게 추가 */}
  </Carousel>
  
  <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
    <Modal.Header closeButton>
      {/* <Modal.Title>Image Preview</Modal.Title> */}
    </Modal.Header>
    <Modal.Body>
      <img src={modalImage} alt="Modal Preview" className="modal-img" />
    </Modal.Body>
  </Modal>
  </>
  );
  }

export default Carousel3;
