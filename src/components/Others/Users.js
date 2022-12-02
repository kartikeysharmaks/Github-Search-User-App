import React from "react";
import { Link } from "react-router-dom";

const User = ({ user }) => {
  const { avatar_url, login, id } = user;
  console.log(user);
  return (
    <div className="w-[300px] h-[300px] flex flex-col my-6 items-start justify-center p-5 border-b-[#444] border-solid">
      <div className="w-[200px] h-[200px] mx-auto mb-3">
        <img src={avatar_url} alt={login} className="w-[100%] rounded-[50%]" />
      </div>
      <div className="flex flex-col m-auto text-center">
        <h3 className="text-2xl font-semibold">{login}</h3>
        <small>{id}</small>
        <h3>
          <Link to={`/user/${login}`}>View profile</Link>
        </h3>
      </div>
    </div>
  );
};

export default User;