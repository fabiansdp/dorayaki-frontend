import React from 'react'
import Layout from '../components/Layout';
import Header from '../components/Header';
import DorayakiList from '../components/Dorayaki/DorayakiList';

const Dorayaki = () => {
  return (
    <Layout title="Dorayaki" >
      <Header title="Dorayaki List" />      
      <DorayakiList />
    </Layout>
  );
};

export default Dorayaki;