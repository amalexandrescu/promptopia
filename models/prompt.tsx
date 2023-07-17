import { Schema, Types, model, models } from "mongoose";
import { IUser } from "./user";

interface IPromptSchema {
  creator: {
    type: Types.ObjectId;
    ref: string;
  };
  prompt: {
    type: string;
    required: Array<boolean | string>;
  };
  tag: {
    type: string;
    required: Array<boolean | string>;
  };
}

const PromptSchema: Schema = new Schema<IPromptSchema>({
  //one to many relationship -> one user can create multiple prompts
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
