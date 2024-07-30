import { useState } from "react";
import React, { useEffect } from "react";
import "../css/Map.css"


const Map = ({lat,lon}) => {
  // 맵관련useState
  const [map, setMap] = useState(null);

  // let ClickOverlay = null;
  const { kakao } = window;

  useEffect(() => {
    const mapContainer = document.getElementById("map"); // 지도의 중심좌표
    const mapOption = {
      center: new kakao.maps.LatLng(lat, lon), // 지도의 중심좌표
      level: 2, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    setMap(map);

    console.log(lat);
    console.log(lon);

    let positions = [
      {
        title: "시리즈인트로",
        address: "광주 동구 제봉로110번길 1",
        latlng: new kakao.maps.LatLng(lat, lon),
        pimg: "./image/1시리즈인트로.jpeg",
        Link: "https://map.kakao.com/?map_type=TYPE_MAP&target=car&rt=,,482270,458916&rt1=&rt2=%EC%8B%9C%EB%A6%AC%EC%A6%88%EC%9D%B8%ED%8A%B8%EB%A1%9C&rtIds=,1849034438",
        Link2:
          "http://localhost:3001/CafeInfo?name=시리즈인트로&i=./image/1시리즈인트로.jpeg",
      },

    ];

    

  var imageSrc ='/img/pica.png', // 마커이미지의 주소입니다
  imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
  imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
var markerImage = new kakao.maps.MarkerImage(
  imageSrc,
  imageSize,
  imageOption
);


    // 마커 찍는 함수입니다. (필요)
    for (let i = 0; i < positions.length; i++) {
      var data = positions[i];
      displayMarker(data);
    }
      


    // 지도에 마커를 표시하는 함수입니다(AI mode off)
    function displayMarker(data) {

      
      var marker = new kakao.maps.Marker({
        map: map,
        position: data.latlng,
        image: markerImage,
      });
      // var CustomOverlay = new kakao.maps.CustomOverlay({
      //   yAnchor: 1.45,
      //   position: marker.getPosition(),
      // });
  
      // var Customcontent = document.createElement("div");
      // Customcontent.className = "wrap";
  
      // var info = document.createElement("div");
      // info.className = "info";
      // Customcontent.appendChild(info);
  
      // //커스텀오버레이 타이틀
      // var contentTitle = document.createElement("div");
      // contentTitle.className = "title";
      // contentTitle.appendChild(document.createTextNode(data.title));
      // info.appendChild(contentTitle);
  
      // //커스텀오버레이 닫기 버튼
      // var closeBtn = document.createElement("div");
      // closeBtn.className = "close";
      // closeBtn.setAttribute("title", "닫기");
      // closeBtn.onclick = function () {
      //   CustomOverlay.setMap(null);
      // };
      // contentTitle.appendChild(closeBtn);
  
      // var bodyContent = document.createElement("div");
     
      // bodyContent.className = "body";
      // info.appendChild(bodyContent);
  
      // var imgDiv = document.createElement("div");
      // imgDiv.className = "img";
      // bodyContent.appendChild(imgDiv);
  
      // //커스텀오버레이 이미지
      // var imgContent = document.createElement("img");
      // imgContent.src = data.pimg;
      // //imgContent.setAttribute("src", data.pimg);
  
      // imgContent.setAttribute("width", "73px");
      // imgContent.setAttribute("heigth", "100px");
      // imgDiv.appendChild(imgContent);
  
      // var descContent = document.createElement("div");
      // descContent.className = "desc";
      // bodyContent.appendChild(descContent);
  
      // //커스텀오버레이 주소
      // var addressContent = document.createElement("div");
      // addressContent.className = "ellipsis";
      // addressContent.appendChild(document.createTextNode(data.address));
      // descContent.appendChild(addressContent);
  
      // var LinkDiv = document.createElement("div");
      // descContent.appendChild(LinkDiv);
  
      // var LinkContent = document.createElement("a");
      // LinkContent.className = "link";
      // LinkContent.appendChild(document.createTextNode("길찾기"));
      // LinkContent.addEventListener("click", function () {
      //   LinkContent.setAttribute("href", data.Link);
      // });
      // LinkDiv.appendChild(LinkContent);
  
      // var LinkContent2 = document.createElement("a");
      // LinkContent2.className = "link2";
      // LinkContent2.appendChild(document.createTextNode("예약"));
      // LinkContent2.addEventListener("click", function () {
      //   LinkContent2.setAttribute("href", data.Link2);
      // });
  
      // LinkDiv.appendChild(LinkContent2);
  
      // CustomOverlay.setContent(Customcontent);
  
      // kakao.maps.event.addListener(marker, "click", function () {
      //     if (ClickOverlay) {
      //           ClickOverlay.setMap(null);
      //         }
  
      //         CustomOverlay.setMap(map);
  
      //         ClickOverlay = CustomOverlay;
      // });
    }
  }, [lat,lon]);

  

  return (
    <>
          <div className="ssss">
            {/* 카카오맵 */}
            <div id="map" style={{width:'100%',height:'300px'}}></div>
          </div>
         
    </>
  );
};

export default Map;
