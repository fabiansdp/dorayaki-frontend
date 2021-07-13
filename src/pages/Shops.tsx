import React from 'react'
import Layout from '../components/Layout';
import Header from '../components/Header';
import ShopList from '../components/Shop/ShopList';

const Shops = () => {
  return (
    <Layout title="Shops" >
      <Header title="Shops" />
      <ShopList />
    </Layout>
  );
};

export default Shops;