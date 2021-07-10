import React from 'react'
import Layout from '../components/Layout';
import Header from '../components/Header';
import HeroImg from '../components/HeroImg';

const Home = () => {
  return (
    <Layout title="Home" >
      <Header title="Stand With Dorayaki" />
      <HeroImg image="doraemon-dorayaki.png" />
    </Layout>
  );
};

export default Home;