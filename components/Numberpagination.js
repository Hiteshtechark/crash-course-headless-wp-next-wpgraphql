import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import $ from 'jquery';

const Numberpagination = () => {

  const router = useRouter();

  const [post, setPost] = useState([]);
  const [isVisibleprev, setIsVisibleprev] = useState(true);
  const [isVisiblenext, setIsVisiblenext] = useState(true);
  const [postAll, setAllPost] = useState([]);
  const [number, setNumber] = useState(1);
  const [postPerPage] = useState(2);

  const API_url = "https://techarkatlastg.wpengine.com/wp-json/wp/v2/posts?page=" + number + "&per_page=" + postPerPage;

  const fetchApi = async () => {
    const data = await fetch(API_url);
    const dataJ = await data.json();
    setPost(dataJ);
  }

  fetchApi();

  const All_post_API_url = "https://techarkatlastg.wpengine.com/wp-json/wp/v2/posts";

  useEffect(() => {
    const fetchall = async () => {
      const data = await fetch(All_post_API_url);
      const dataJ = await data.json();
      setAllPost(dataJ);
    };
    fetchall();
    setURL();
  }, []);

  const setURL = () => {

    const href_link_2 = "?page=" + 1;
    router.push(href_link_2);

  };

  const currentPost = post;
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(postAll.length / postPerPage); i++) {
    pageNumber.push(i);
  }
  const setPagenumber = (pageNumber, e) => {
    setNumber(pageNumber);
    console.log(e);
    fetchApi();

  };

  const ChangePage = (pageNumber, href_link, elementRef) => {

    setNumber(pageNumber);
    router.push(href_link);    
    elementRef.target.classList.add('active');
    if (Math.ceil(postAll.length / postPerPage) <= pageNumber || pageNumber > 1) {
      setIsVisibleprev(false);
    } else {
      setIsVisibleprev(true);
    }

    if (Math.ceil(postAll.length / postPerPage) > pageNumber) {
      setIsVisiblenext(true);
    } else {
      setIsVisiblenext(false);
    }

    fetchApi();

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
            <button id="prev-btn"
              className="px-3 py-1 m-1 text-center btn-primary"
              onClick={(e) => setPagenumber(number - 1, e)}
            >
              {isVisibleprev ? 'Hide' : 'Show'}
              Previous
            </button>

            {pageNumber.map((Elem) => {
              const href_link = "?page=" + Elem;
              return (
                <>
                  <button onClick={(elementRef) => ChangePage(Elem, href_link, elementRef)} className="page px-3 py-1 m-1 text-center btn-outline-dark" key={Elem}>
                    {Elem}
                  </button>
                </>
              );
            })}
            <button
              className="next-btn px-3 py-1 m-1 text-center btn-primary"
              onClick={() => setPagenumber(number + 1)}
            >
              {isVisiblenext ? 'Show' : 'Hide'}
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Numberpagination;
