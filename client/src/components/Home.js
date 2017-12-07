import React from 'react';

import StockCryptoList from '../containers/stockcrypto_list';
import SearchBar from '../containers/search_bar';
import SideBarNav from '../containers/sidebar_nav';
import { Row, Col } from 'react-materialize';

const Home = () => {
   return (
      <div className='mainApp'>
        <Row> <Col s={9} offset="s3"> <SearchBar /> </Col></Row>
        <Row>
          <Col s={3}><SideBarNav /></Col>
          <Col s={9}><StockCryptoList className="stock-crypto-list"/></Col>
        </Row>
      </div>
   );
};

export default Home;
