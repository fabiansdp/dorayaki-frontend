import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getShop } from "../utils/shop";
import Layout from '../components/Layout';
import Header from '../components/Header';
import ShopInfo from "../components/Shop/ShopInfo";
import ShopInventory from "../components/Shop/ShopInventory";

const ShopDetails : React.FC = () => {
  const { id } = useParams<{id: string}>();
  const [shopInfo, setShopInfo] = useState<ShopInfo>();
  const [shopInventory, setShopInventory] = useState<ShopInventory[]>([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getShop(id)
      .then((res) => {
        setShopInfo(res.data.shop_info)
        setShopInventory(res.data.inventory)
        setSuccess(false)
      })
      .catch((err) => console.log(err));
  }, [success]);
  
  return (
    <Layout title={shopInfo?.nama} >
      <Header title="Shop Information" />   
      <ShopInfo shopInfo={shopInfo} setSuccess={setSuccess} />   
      <ShopInventory shopInventory={shopInventory} />
    </Layout>
  )
} 

export default ShopDetails;