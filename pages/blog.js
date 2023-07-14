import Head from 'next/head';
import Footer from '../components/Footer';
import LoadMorePost from '../components/LoadMorePost';
import { client } from '../lib/apollo';
import { gql } from "@apollo/client";

export default function Blog({ posts }) {
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
            <LoadMorePost></LoadMorePost>
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