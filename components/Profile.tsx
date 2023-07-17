import { IPost } from "@app/create-prompt/page";
import PromptCard from "./PromptCard";

export interface IProfile {
  name: string | null;
  desc: string;
  data: Array<IPost>;
  handleEdit: (post: IPost) => void;
  handleDelete: (post: IPost) => void;
}

const Profile = ({ name, desc, data, handleEdit, handleDelete }: IProfile) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map((post: IPost) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit(post)}
            handleDelete={() => handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
