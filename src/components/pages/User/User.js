import React, { useState, useEffect } from "react";
import axios from "axios";
import site from "../../../assets/site.png";
import github from "../../../assets/github.png";
import location from "../../../assets/location.png";
import user from "../../../assets/user.png";
import { useParams } from "react-router-dom";
import Repo from "../../Others/Repo";

const User = () => {
  const { login } = useParams();

  //UserInformation
  const [userInfo, setUserInfo] = useState({});
  //User repos
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const response = await Promise.all([
          axios.get(`https://api.github.com/users/${login}`),
          axios.get(`https://api.github.com/users/${login}/repos`),
        ]);
        setUserInfo(response[0].data);
        setRepos(response[1].data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserInformation();
  }, [login]);

  return (
    <div className="container">
      <div className="bg-[#444343] p-[30px] rounded-[10px] flex flex-row text-[#fff]">
        <div className="w-[30%] m-auto">
          <img
            src={userInfo?.avatar_url}
            alt="user-avatar"
            className="w-[200px] rounded-[10px] object-cover"
          />
        </div>
        <div className="p-[10px] space-y-3">
          <h3 className="text-[24px] font-bold">{userInfo?.name}</h3>
          <p className="text-[18px] font-normal">{userInfo?.bio}</p>
          <div className="text-[15px] font-[100] flex flex-col space-y-2">
            <p className="flex flex-row items-center gap-2">
              <img src={user} alt="user-img" className="w-[30px]" />
              {userInfo?.followers} Followers. Following {userInfo?.following}
            </p>
            {userInfo?.location && (
              <p className="flex flex-row items-center gap-2">
                <img src={location} alt="location" className="w-[30px]" />
                {userInfo?.location}
              </p>
            )}
            {userInfo?.blog && (
              <p className="flex flex-row items-center gap-2">
                <img src={site} alt="blog/website" className="w-[30px]" />
                {userInfo?.blog}
              </p>
            )}
            <p className="flex flex-row items-center gap-2">
              <img src={github} alt="github-profile" className="w-[30px]" />
              <a href={userInfo?.html_url}>View GitHub Profile</a>
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#f5f5f5] py-[10px] px-[30px] my-[20px] mx-0 rounded-[10px]">
        {repos ? (
          repos.map((repo) => {
            return <Repo repo={repo} key={repo.id} />;
          })
        ) : (
          <h2>No repos for this user...</h2>
        )}
      </div>
    </div>
  );
};

export default User;
