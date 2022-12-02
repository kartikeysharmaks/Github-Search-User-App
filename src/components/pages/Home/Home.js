import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { IoArrowForwardSharp, IoArrowBack } from "react-icons/io5";
import User from "../../Others/Users.js";
import Header from "../../Others/Header.js";

const Home = () => {
  const [query, setQuery] = useState("");
  //Users fetched from the API
  const [users, setUsers] = useState([]);
  //Page
  const [page, setPage] = useState(1);
  //Per page
  const [limit, setLimit] = useState(10);

  const handleQueryInput = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handlePrevPage = () => {
    setPage((page) => {
      if (page === 1) return page;
      else return page - 1;
    });
  };

  const handleNextPage = () => {
    setPage((page) => page + 1);
  };

  const handlePageLimit = (e) => {
    const value = e.target.value;
    setLimit(parseInt(value));
  };

  const fetchUsers = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "https://api.github.com/search/users?q=" + query,
        {
          params: {
            page,
            per_page: limit,
          },
        }
      );
      return data?.items;
    } catch (error) {
      console.error(error);
      return null;
    }
  },[limit,query,page]);

  const handleSearchUsers = async (e) => {
    e.preventDefault();
    if (query) {
      const items = await fetchUsers();
      setUsers(items);
    } else {
      console.log("Your query is empty...");
    }
  };

  useEffect(() => {
    const displayUsersOnChange = async () => {
      if (query) {
        const items = await fetchUsers();
        setUsers(items);
      }
    };

    displayUsersOnChange();
  }, [page, limit, query, fetchUsers]);

  return (
    <div className="container">
      <Header/>
      <div className="bg-[#333] px-[40px] rounded-[10px] h-[150px] flex flex-col justify-center text-white">
        <h2 className="text-4xl font-bold text-center">GitHub Search User</h2>
        <form className="my-[10px] mx-0 flex">
          <input
            value={query}
            onChange={handleQueryInput}
            type="text"
            className="w-[100%] outline-none p-[14px] rounded-[7px] border-none text-black"
          />
          <button
            onClick={handleSearchUsers}
            className="outline-none p-[14px] rounded-[7px] border-none py-[14px] px-[40px] bg-[#6cc644]  my-0 mx-[8px] text-[#f5f5f5]"
          >
            Search
          </button>
        </form>
      </div>
      <div className="bg-[#f5f5f5] py-[10px] px-[30px] mx-[20px] my-0 rounded-[10px]">
        <div className="mt-[10px] flex flex-row justify-between">
          <label>
            <small className="text-base">Per Page</small>
            <select
              onChange={handlePageLimit}
              className="ml-2 outline-none p-[5px] rounded-[5px] border-none"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
          <div className="outline-none p-[5px] rounded-[5px] border-none flex items-center ">
            <button
              onClick={handlePrevPage}
              className="bg-[#333] text-[#fff] px-3 py-2 mx-[5px] rounded-xl"
            >
              <IoArrowBack />
            </button>
            <button className="bg-[#333] text-[#fff] px-3 py-2 mx-[5px] rounded-xl">
              {page}
            </button>
            <button
              onClick={handleNextPage}
              className="bg-[#333] text-[#fff] px-3 py-2 mx-[5px] rounded-xl"
            >
              <IoArrowForwardSharp />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-5">
          {users ? (
            users.map((user) => {
              return <User user={user} key={user.id} />;
            })
          ) : (
            <h2>There is nothing to display...</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
