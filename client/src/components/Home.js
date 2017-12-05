import React from 'react';

import StockCryptoList from '../containers/stockcrypto_list';
import SearchBar from '../containers/search_bar';

const Home = () => {
   return (
      <div className='container'>
         <SearchBar />
         <StockCryptoList />
      </div>
   );
};

export default Home;
