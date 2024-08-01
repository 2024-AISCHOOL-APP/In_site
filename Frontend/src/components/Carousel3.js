import React, { useState, useEffect, useRef } from "react";
import Carousel from "react-bootstrap/Carousel";
import Modal from "react-bootstrap/Modal";
import axios from "../axios"; // `axios` 인스턴스를 임포트합니다.
import "../css/Carousels3.css";

// 랜덤한 이미지 선택 함수
const getRandomImage = (images, usedImages) => {
    const availableImages = images.filter(image => !usedImages.has(image));
    if (availableImages.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    return availableImages[randomIndex];
};

// 이미지를 그룹화하고 빈 부분을 랜덤 이미지로 채우기
const fillImagesToGroup = (images, groupSize) => {
    const result = [...images];
    const usedImages = new Set();

    // 빈 공간을 랜덤 이미지를 사용하여 채우기
    while (result.length % groupSize !== 0) {
        const randomImage = getRandomImage(images, usedImages);
        if (randomImage) {
            result.push(randomImage);
            usedImages.add(randomImage);
        } else {
            break; // 더 이상 사용할 수 있는 이미지가 없으면 종료
        }
    }
    
    return groupImages(result, groupSize);
};

// 이미지를 그룹화하는 함수
const groupImages = (images, groupSize) => {
    let result = [];
    for (let i = 0; i < images.length; i += groupSize) {
        result.push(images.slice(i, i + groupSize));
    }
    return result;
};

const Carousel3 = ({ store_idx }) => {
    const [modalShow, setModalShow] = useState(false);
    const [modalIndex, setModalIndex] = useState(0);
    const [modalImages, setModalImages] = useState([]);
    const [carousels, setCarousels] = useState([]);
    const [carouselIndexes, setCarouselIndexes] = useState([]);
    const carouselRefs = useRef([]);

    const fetchImages = async () => {
        try {
            const response = await axios.get(`shop/p/p/${store_idx}`);
            const products = response.data.productInfo;

            const carouselData = products.map((product) => ({
                id: product.prod_idx,
                title: product.prod_name,
                images: product.images || []
            }));

            setCarousels(carouselData);
            setCarouselIndexes(new Array(carouselData.length).fill(0));
        } catch (error) {
            console.error("Error fetching images:", error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchImages();
    }, [store_idx]);

    useEffect(() => {
        const intervals = carouselRefs.current.map((ref, carouselIndex) => {
            if (ref) {
                return setInterval(() => {
                    ref.next(); // 다음 슬라이드로 이동
                    setCarouselIndexes(prevIndexes => 
                        prevIndexes.map((index, idx) => 
                            idx === carouselIndex ? (index + 1) % (fillImagesToGroup(carousels[carouselIndex]?.images || [], 4).length) : index
                        )
                    );
                }, 10000); // 3초마다 슬라이드 변경
            }
            return null;
        });

        return () => intervals.forEach(interval => clearInterval(interval));
    }, [carousels]);

    const handleSelect = (selectedIndex, carouselIndex) => {
        setCarouselIndexes(prevIndexes => 
            prevIndexes.map((index, idx) => idx === carouselIndex ? selectedIndex : index)
        );
    };

    const handleImageClick = (selectedIndex, imagesArray) => {
        setModalImages(imagesArray);
        setModalIndex(selectedIndex);
        setModalShow(true);
    };

    const handleModalSelect = (selectedIndex) => {
        setModalIndex(selectedIndex);
    };

    return (
        <>
            {carousels.map((carousel, carouselIndex) => (
                <div key={carousel.id} className="carousel-section">
                    <h2 className="carousel-title">{carousel.title}</h2>
                    <Carousel
                        ref={el => carouselRefs.current[carouselIndex] = el}
                        activeIndex={carouselIndexes[carouselIndex]}
                        onSelect={(selectedIndex) => handleSelect(selectedIndex, carouselIndex)}
                        className="custom-carousel2"
                        interval={10000}
                        fade
                    >
                        {fillImagesToGroup(carousel.images, 4).map((group, groupIndex) => (
                            <Carousel.Item key={groupIndex}>
                                <div className="carousel-slide">
                                    {group.map((image, imageIndex) => (
                                        <img
                                            key={imageIndex}
                                            src={image}
                                            alt={`Slide ${imageIndex + 1}`}
                                            onClick={() => handleImageClick(imageIndex, carousel.images)}
                                        />
                                    ))}
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            ))}

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
};

export default Carousel3;
