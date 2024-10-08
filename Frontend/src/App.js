import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { createContext } from 'react';
import { useState } from 'react';
import Main from "./pages/Main";
import Navs from "./components/Navs";
import Board from "./pages/Board";
import Shop from "./pages/Shop";
import Category from "./pages/Category";
import Login from "./pages/Login";
import DetaPage from "./pages/DetaPage";
import Aicho from "./pages/Aicho";
import Register from "./pages/Register";
import FindIDPW from "./pages/FindIDPW";
import WritePost from "./pages/WritePost";
import Mypage from "./pages/Mypage";
import Infomy from "./components/Mypage/Infomy";
import Moneys from "./components/Mypage/Moneys"
import Sbasket from "./components/Mypage/Sbasket";
import Schedule from "./components/Mypage/Schedule";
import Aistep1 from "./components/Aichosteps/Aistep1";
import Aistep2 from "./components/Aichosteps/Aistep2";
import Aistep3 from "./components/Aichosteps/Aistep3";
import Aistep4 from "./components/Aichosteps/Aistep4";
import Money_Cal from "./components/Mypage/Money_Cal";
import Money_Chart from "./components/Mypage/Money_Chart";
import Money_In from "./components/Mypage/Money_In";


export  const Appdata = createContext();

function App() {

  const [data,setData] = useState({nick :'냉면'});


  return (
    <div className="App">
      <Appdata.Provider value={{shareData : data,setShare : setData}}>
      <Navs />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Board" element={<Board />} />
        <Route path="/Board/:board_seq" element={<DetaPage />} />
        <Route path="/Category" element={<Category />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register"  element= {<Register/>}/>
        <Route path="/FindIDPW"  element= {<FindIDPW/>}/>
        <Route path="/WritePost"  element= {<WritePost/>}/>
        <Route path="/Mypage"  element= {<Mypage/>}>
           <Route path="/Mypage"  element= {<Infomy/>}/>
           <Route path="/Mypage/schedule"  element= {<Schedule/>}/>
           <Route path="/Mypage/moneys"  element= {<Moneys/>}>
              <Route path="/Mypage/moneys" element={<Money_In/>}/>
              <Route path="/Mypage/moneys/cal" element={<Money_Cal/>}/>
              <Route path="/Mypage/moneys/chart" element={<Money_Chart/>}/>
           </Route>
           <Route path="/Mypage/Sbasket"  element= {<Sbasket/>}/>
        </Route>
        <Route path="/Aichoice" element={<Aicho />}>
            <Route path ="/Aichoice" element={<Aistep1/>}/>
            <Route path="/Aichoice/2" element={<Aistep2 />} />
            <Route path="/Aichoice/2/3" element={<Aistep3 />} />
            <Route path="/Aichoice/2/3/4" element={<Aistep4 />} />
        </Route>
        <Route path="/Shop/:store_idx" element={<Shop />}/>
      </Routes>
      </Appdata.Provider>
    </div>
  );
}

export default App;
