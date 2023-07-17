import Head from 'next/head';
import Footer from '../components/Footer';
import React, { useState } from "react";
import Data from "../api//Data";
import Card from "../components/Card";
import Buttons from "../components/Buttons";

export default function Filter() {
  const [item, setItem] = useState(Data);
  const menuItems = [...new Set(Data.map((Val) => Val.category))];

  const filterItem = (curcat) => {
    const newItem = Data.filter((newVal) => {
      return newVal.category === curcat;
    });
    setItem(newItem);
  };
  return (
    <>
      <div className="container">
        <Head>
          <title>Headless WP Next Starter</title>
          <link rel="icon" href="favicon.ico"></link>
        </Head>
        <main>
          <h1 className="col-12 text-center my-3 fw-bold">Our Menu</h1>
          <Buttons
            filterItem={filterItem}
            setItem={setItem}
            menuItems={menuItems}
          />
          <Card item={item} />
        </main>
        <Footer>CopyRight@2023</Footer>
      </div>
    </>
  )
}