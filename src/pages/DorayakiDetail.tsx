import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getDorayaki } from "../utils/dorayaki";
import { Dorayaki } from "../interfaces/dorayaki";
import Layout from '../components/Layout';
import Header from '../components/Header';
import DorayakiInfo from "../components/Dorayaki/DorayakiInfo";

const DorayakiDetail : React.FC = () => {
  const { id } = useParams<{id: string}>();
  const [dorayaki, setDorayaki] = useState<Dorayaki>();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getDorayaki(id)
      .then((res) => {
        setDorayaki(res.data)
      })
  }, [reload]);

  return (
    <Layout title={dorayaki?.rasa}>
      <Header title="Dorayaki Details" />
      {dorayaki && 
        <DorayakiInfo 
          dorayaki={dorayaki}
          setReload={setReload}
        />
      }
    </Layout>
  );
};

export default DorayakiDetail;