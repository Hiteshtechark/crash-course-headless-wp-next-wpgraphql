import Head from 'next/head';
import Footer from '../components/Footer';
import Numberpagination from '../components/Numberpagination';
import React, { useState, useEffect } from "react";

export default function Blognumber() {
  return (
    <>
      <div className="container">
        <Head>
          <title>Headless WP Next Starter</title>
          <link rel="icon" href="favicon.ico"></link>
        </Head>

        <main>
          <h1 className="title">
            Headless WordPress Next.js Starter
          </h1>

          <p className="description">
            Get started by editing <code>pages/index.js</code>
          </p>

          <div className="grid">          
            <Numberpagination ></Numberpagination>
          </div>
        </main>

        <Footer></Footer>
      </div>
    </>
  )
}