import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//this is a lambda function -> it's going to "die" after getting its job done
//so we need to connect it to the db every time
//create a new prompt

export const POST = async (request: Request) => {
  const { userId, prompt, tag } = await request.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, prompt, tag });

    //save the new prompt in the db
    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(error);

    return new Response("Failed to create new prompt", { status: 500 });
  }
};
