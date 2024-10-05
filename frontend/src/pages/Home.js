import React from 'react'
 import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
       <CategoryList/>
      <BannerProduct/> 

      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
      <HorizontalCardProduct category={"earphones"} heading={"Top's earphones"}/>
      <HorizontalCardProduct category={"processor"} heading={"HardCore processors"}/>
      <HorizontalCardProduct category={"watches"} heading={"Water resistant watches"}/>
     
      <VerticalCardProduct category={"mobiles"} heading={"Classic phones shop"}/>
      <VerticalCardProduct category={"Mouse"} heading={"Top notch mouse"}/>
      <VerticalCardProduct category={"televisions"} heading={"Top's television"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Top's notch refrigerator"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Top's notch refrigerator"}/> 
    </div>
  )
}

export default Home