import React from 'react'
import Layout from '../components/Layout';
import { AxiosInstance } from '../utils/axios';

const Home = () => {
  AxiosInstance.get("/dorayakis")
    .then(res => console.log(res))
    .catch(err => console.log(err));

  return (
    <Layout title="Home" >
      Home Page
    </Layout>
  );
};

export default Home;