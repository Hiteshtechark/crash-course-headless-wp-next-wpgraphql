import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';

const Pagination = () => {

  const router = useRouter();
  const { page } = router.query;

  const [post, setPost] = useState([]);
  const [postAll, setAllPost] = useState([]);
  const [number, setNumber] = useState(1); // No of pages
  const [postPerPage] = useState(2);
  
  const API_url = "https://techarkatlastg.wpengine.com/wp-json/wp/v2/posts?page=" + number + "&per_page=" + postPerPage;

  useEffect(() => {
    const fetchApi = async () => {
      const data = await fetch(API_url);
      const dataJ = await data.json();
      setPost(dataJ);
    };
    fetchApi();
  }, []);

  const All_post_API_url = "https://techarkatlastg.wpengine.com/wp-json/wp/v2/posts";

  useEffect(() => {
    const fetchall = async () => {
      const data = await fetch(All_post_API_url);
      const dataJ = await data.json();
      setAllPost(dataJ);
    };
    fetchall();
  }, []);


  const currentPost = post;
  const pageNumber = [];


  for (let i = 1; i <= Math.ceil(postAll.length / postPerPage); i++) {
    pageNumber.push(i);
  }

  const ChangePage = (pageNumber, href_link) => {
    setNumber(pageNumber);
    router.push(href_link);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <table>
            <thead>
              <tr>
                <th>
                  S No.
                </th>
                <th>
                  Name
                </th>
                <th>
                  Email
                </th>
                <th>
                  Comment
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPost.map((Val) => {
                return (
                  <>
                    <tr
                      className="border-2 border-dark text-center"
                      key={Val.id}
                    >
                      <td className="border-2 border-dark th-1">
                        {Val.id}
                      </td>
                      <td className="border-2 border-dark th-1">
                        {Val.title.rendered}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>

          <div className="my-3 text-center">
            <button
              className="px-3 py-1 m-1 text-center btn-primary"
              onClick={() => setNumber(number - 1)}
            >
              Previous
            </button>

            {pageNumber.map((Elem) => {
              const href_link = "?page=" + Elem;
              return (
                <>
                  <button onClick={() => ChangePage(Elem, href_link)} className="px-3 py-1 m-1 text-center btn-outline-dark" key={Elem}>
                    {Elem}
                  </button>
                </>
              );
            })}
            <button
              className="px-3 py-1 m-1 text-center btn-primary"
              onClick={() => setNumber(number + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
