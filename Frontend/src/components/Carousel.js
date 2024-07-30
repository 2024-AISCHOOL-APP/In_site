import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "../css/Carousels.css";
import Modal from "react-bootstrap/Modal";

function Carousels() {
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
//     <Carousel activeIndex={index} onSelect={handleSelect} className="main">
//       <Carousel.Item>
//         <img src="/img/mig.png" text="First slide" />
//         <Carousel.Caption>
//           {/* <h3>First slide label</h3>
//           <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         <img src="/img/dmer.jpg" text="Second slide" />
//         <Carousel.Caption>
//           {/* <h3>Second slide label</h3>
//           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         <img src="/img/main3.png" text="Third slide" />
//         <Carousel.Caption>
//           {/* <h3>Third slide label</h3>
//           <p>
//             Praesent commodo cursus magna, vel scelerisque nisl consectetur.
//           </p> */}
//         </Carousel.Caption>
//       </Carousel.Item>
//     </Carousel>
//   );
// }
<>
<Carousel activeIndex={index} onSelect={handleSelect} className="custom-carousel">
  <Carousel.Item>
    <div className="image-container">
      <img
        className="custom-img"
        src="/img/mig.png"
        alt="First slide"
        onClick={() => handleImageClick("/img/mig.png")}
      />
      <img
        className="custom-img"
        src="/img/dmer.jpg"
        alt="Second slide"
        onClick={() => handleImageClick("/img/dmer.jpg")}
      />
      <img
        className="custom-img"
        src="/img/main3.png"
        alt="Third slide"
        onClick={() => handleImageClick("/img/main3.png")}
      />
      <img
        className="custom-img"
        src="/img/mig.png"
        alt="First slide"
        onClick={() => handleImageClick("/img/mig.png")}
      />
      <img
        className="custom-img"
        src="/img/dmer.jpg"
        alt="Second slide"
        onClick={() => handleImageClick("/img/dmer.jpg")}
      />
      <img
        className="custom-img"
        src="/img/main3.png"
        alt="Third slide"
        onClick={() => handleImageClick("/img/main3.png")}
      />
      <img
        className="custom-img"
        src="/img/mig.png"
        alt="First slide"
        onClick={() => handleImageClick("/img/mig.png")}
      />
    </div>
  </Carousel.Item>  <Carousel.Item>
    <div className="image-container">
      <img
        className="custom-img"
        src="/img/mig.png"
        alt="First slide"
        onClick={() => handleImageClick("/img/mig.png")}
      />
      <img
        className="custom-img"
        src="/img/dmer.jpg"
        alt="Second slide"
        onClick={() => handleImageClick("/img/dmer.jpg")}
      />
      <img
        className="custom-img"
        src="/img/main3.png"
        alt="Third slide"
        onClick={() => handleImageClick("/img/main3.png")}
      />
      <img
        className="custom-img"
        src="/img/mig.png"
        alt="First slide"
        onClick={() => handleImageClick("/img/mig.png")}
      />
      <img
        className="custom-img"
        src="/img/dmer.jpg"
        alt="Second slide"
        onClick={() => handleImageClick("/img/dmer.jpg")}
      />
      <img
        className="custom-img"
        src="/img/main3.png"
        alt="Third slide"
        onClick={() => handleImageClick("/img/main3.png")}
      />
      <img
        className="custom-img"
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

export default Carousels;
