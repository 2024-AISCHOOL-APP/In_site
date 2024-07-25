import React, { useCallback } from 'react'
import { Nav } from 'react-bootstrap'
import "../css/Snav.css"
import { useNavigate } from 'react-router-dom';
const Snavs = () => {

  const navigate = useNavigate();
  const navigateTo = useCallback((path) => navigate(path), [navigate]);

    return (
        <Nav justify variant="tabs"  className='custom-snavbar' >
          <Nav.Item>
            <Nav.Link className='navlinks' onClick={() => navigateTo("/Shop/:store_idx")}>정보</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className='navlinks' onClick={() => navigateTo("/Shop/:store_idx/Sgal")}>리뷰(5)</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link  className='navlinks' onClick={() => navigateTo("/Shop/:store_idx/Smoon")}>문의</Nav.Link>
          </Nav.Item>
        </Nav>
      );
    }

export default Snavs