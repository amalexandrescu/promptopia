import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// type RouteMethod = (
//   request: Request,
//   params: { id: string }
// ) => Promise<Response>;

//GET (read the request)
// export const GET: RouteMethod = async (request, params) => {
export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();

    //search a prompt by its id
    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) return new Response("Prompt Not Found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal server error", { status: 500 });
  }
};

//PATCH (update the request)
//if you use dynamic paths, you will have access to the dynamic paths using params
export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    //find the existing prompt by id
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    //update the prompt with the new tag and prompt content
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    //save the updated prompt into the db
    await existingPrompt.save();

    return new Response("The prompt has been successfully updated", {
      status: 200,
    });
  } catch (error) {
    console.log("error trying to update a prompt");
    return new Response("Error updating prompt", { status: 500 });
  }
};

//DELETE (delete the request)

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();

    //find the prompt by id and remove it
    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    console.log("error trying to delete a prompt");
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
