import React from "react";

const Repo = ({ repo }) => {
  console.log(repo);
  const { name, html_url, description, language } = repo;
  return (
    <div className="p-[20px] border-b-[1px] border-solid border-[#444]">
      <h3>
        <a href={html_url} className="text-[#6cc644] text-xl font-semibold">{name}</a>
      </h3>
      <p>{description}</p>
      {language && <small>Written in {language}</small>}
    </div>
  );
};

export default Repo;