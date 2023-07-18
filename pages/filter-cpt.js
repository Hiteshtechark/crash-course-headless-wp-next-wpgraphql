import Head from 'next/head';
import Footer from '../components/Footer';
import React, { useState } from "react";
//import Data from "../api//Data";
import Card from "../components/Card";
import FilterButtons from "../components/FilterButtons";
import { client } from '../lib/apollo';
import { gql } from "@apollo/client";

export default function FilterCPT({ posts, cat }) {

  const catdata = cat.map((Val) => {
    for (let i = 0; i < Val['jobCategory']['nodes'].length; i++) {
      return Val['jobCategory']['nodes'][i].name;
    }
  });

  const [item, setItem] = useState(posts);
  const menuItems = [...new Set(catdata)];

  const filterItem = (curcat) => {
    const newItem = posts.filter((newVal) => {
      for (let i = 0; i < newVal['jobCategory']['nodes'].length; i++) {
        if (newVal['jobCategory']['nodes'][i].name === curcat) {
          return newVal['jobCategory']['nodes'][i].name;
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
          <FilterButtons
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
    jobs {
      nodes {
        id
        title
        content
        jobCategory {
          nodes {
            slug
            name
          }
        }      
      }
    }
  }
  `;

  const response = await client.query({
    query: GET_POSTS
  });

  const posts = response?.data?.jobs?.nodes;

  const GET_CATEGORIES = gql`
    query GetCategories {
      jobs {
        nodes {
          jobCategory {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const cat_response = await client.query({
    query: GET_CATEGORIES
  });

  const cat = cat_response?.data?.jobs?.nodes;

  return {
    props: {
      posts,
      cat
    }
  }
}