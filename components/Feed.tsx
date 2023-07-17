"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { IPost } from "@app/create-prompt/page";

export interface IPromptCardProps {
  data: any;
  handleDelete: any;
  handleEdit: any;
}

const PromptCardList = ({
  data,
  handleDelete,
  handleEdit,
}: IPromptCardProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post: any) => (
        <PromptCard
          key={post._id}
          post={post}
          handleEdit={() => {}}
          handleDelete={() => {}}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState<Array<IPost>>([]);

  // Search states
  const [searchText, setSearchText] = useState<any>("");
  const [searchTimeout, setSearchTimeout] = useState<any>(null);
  const [searchedResults, setSearchedResults] = useState<any>([]);

  const filterPrompts = (searchtext: any) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item: any) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setAllPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleEdit={() => {}}
          handleDelete={() => {}}
        />
      ) : (
        <PromptCardList
          data={allPosts}
          handleEdit={() => {}}
          handleDelete={() => {}}
        />
      )}
    </section>
  );
};

export default Feed;
