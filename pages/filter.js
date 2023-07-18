import Head from 'next/head';
import Footer from '../components/Footer';
import React, { useState } from "react";
//import Data from "../api//Data";
import Card from "../components/Card";
import Buttons from "../components/Buttons";
import { client } from '../lib/apollo';
import { gql } from "@apollo/client";

export default function Filter({ posts, cat }) {

  const [item, setItem] = useState(posts);  
  const menuItems = [...new Set(cat.map((Val) => Val.name))];

  const filterItem = (curcat) => {
    const newItem = posts.filter((newVal) => {
      for (const key in newVal['categories']) {
        for (let i = 0; i < newVal['categories']['nodes'].length; i++) {
          if (newVal['categories']['nodes'][i].name === curcat) {
           return newVal['categories']['nodes'][i].name;
          }
        }       
      }
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
            all_post={posts}
          />
          <Card item={item} />
        </main>
        <Footer>CopyRight@2023</Footer>
      </div>
    </>
  )
}

export async function getStaticProps() {

  // Paste your GraphQL query inside of a gql tagged template literal
  const GET_POSTS = gql`
    query getPosts {
      posts {
        nodes {
          id
          title
          content
          categories {
            nodes {            
              slug
              name
            }
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;

  const response = await client.query({
    query: GET_POSTS
  });

  const posts = response?.data?.posts?.nodes;

  const GET_CATEGORIES = gql`
    query GetCategories {
      categories {
        nodes {
          name
          slug
        }
      }
    }
  `;

  const cat_response = await client.query({
    query: GET_CATEGORIES
  });

  const cat = cat_response?.data?.categories?.nodes;

  return {
    props: {
      posts,
      cat
    }
  }
}