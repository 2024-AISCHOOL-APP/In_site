import React from 'react'
import Table from 'react-bootstrap/Table';

const Sbasket = () => {
  return (
    <div>
    <h1 className='mt-4'>장바구니</h1>
    <Table className='mt-4' striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>카테고리</th>
          <th colSpan={2}>제품 정보</th>
          <th>예상금액</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>#</td>
          <td>드레스</td>
          <td>img</td>
          <td>
            product_name
          </td>
          <td>product_amount</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td></td>
          <td colSpan={2}>합계</td>
          <td>pre_amount</td>
          <td></td>
        </tr>
      </tbody>
    </Table>
    </div>
  )
}

export default Sbasket