import Head from 'next/head';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';
import { client } from '../lib/apollo';
import { gql } from "@apollo/client";
import React from 'react';
import { usePagination, DOTS } from '../components/usePagination';

export default function Blog2({ posts }) {
  const total_pages = posts.length;
  const num_results_on_page = 2;
  const page = 1;

  const p_pages = Math.ceil(total_pages / num_results_on_page);

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
            <Pagination></Pagination>
          </div>
        </main>

        <Footer></Footer>
      </div>
    </>
  )
}
export async function getStaticProps() {

  // Paste your GraphQL query inside of a gql tagged template literal
  const GET_POSTS = gql`
    query AllPostsQuery {
      posts {
        nodes {
          title
          content
          date
          uri
          post_acf_data {
            shortDescription
          }
        }
      }
    }
  `;

  const response = await client.query({
    query: GET_POSTS
  });

  const posts = response?.data?.posts?.nodes;

  return {
    props: {
      posts
    }
  }
}