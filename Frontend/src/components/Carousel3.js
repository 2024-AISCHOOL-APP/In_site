import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Modal from "react-bootstrap/Modal";
import "../css/Carousels3.css";

const Carousel3 = () => {
    const [index, setIndex] = useState(0);
    const [modalShow, setModalShow] = useState(false);
    const [modalIndex, setModalIndex] = useState(0);
    const [modalImages, setModalImages] = useState([]);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const handleImageClick = (selectedIndex, imagesArray) => {
        setModalImages(imagesArray);
        setModalIndex(selectedIndex);
        setModalShow(true);
    };

    const handleModalSelect = (selectedIndex) => {
        setModalIndex(selectedIndex);
    };
  
    const images1 = [
        "/img/mig.png",
        "/img/dmer.jpg",
        "/img/main3.png",
        "/img/mig.png",
        "/img/mig.png",
        "/img/dmer.jpg",
        "/img/main3.png",
        "/img/mig.png"
    ];
    
    const images2 = [
        "/img/mig.png",
        "/img/dmer.jpg",
        "/img/main3.png",
        "/img/mig.png",
        "/img/mig.png",
        "/img/dmer.jpg",
        "/img/main3.png",
        "/img/mig.png"
    ];
    
    return (
        <>
            <div className="carousel-section">
                <h2 className="carousel-title">Carousel 1</h2>
                <Carousel activeIndex={index} onSelect={handleSelect} className="custom-carousel2">
                    {images1.map((image, idx) => (
                        <Carousel.Item key={idx}>
                            <div className="image-container2">
                                {images1.map((image, idx) => (
                                    <img
                                        key={idx}
                                        className="custom-img2"
                                        src={image}
                                        alt={`Slide ${idx + 1}`}
                                        onClick={() => handleImageClick(idx, images1)}
                                    />
                                ))}
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>

            <div className="carousel-section">
                <h2 className="carousel-title">Carousel 2</h2>
                <Carousel activeIndex={index} onSelect={handleSelect} className="custom-carousel2">
                    {images2.map((image, idx) => (
                        <Carousel.Item key={idx}>
                            <div className="image-container2">
                                {images2.map((image, idx) => (
                                    <img
                                        key={idx}
                                        className="custom-img2"
                                        src={image}
                                        alt={`Slide ${idx + 1}`}
                                        onClick={() => handleImageClick(idx, images2)}
                                    />
                                ))}
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
      
            <Modal show={modalShow} onHide={() => setModalShow(false)} className="modal-fullscreen" centered>
                <Modal.Body className="modal-body-fullscreen">
                    <Carousel activeIndex={modalIndex} onSelect={handleModalSelect} className="w-100 h-100">
                        {modalImages.map((image, idx) => (
                            <Carousel.Item key={idx}>
                                <img
                                    className="carousel-img-fullscreen"
                                    src={image}
                                    alt={`Modal Slide ${idx + 1}`}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Carousel3;
