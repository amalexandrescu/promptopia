import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();

    //get all the prompts of a creator (creator = params.id)
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all prompts by user", { status: 500 });
  }
};
