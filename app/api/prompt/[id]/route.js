import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator')
        if (!prompt) return new Response("prompt not fount", { status: 404 })
        return new Response(JSON.stringify(prompt), { status: 200 })
        // return new Response(JSON.stringify(prompts), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
        // console.error('Error fetching prompts:', error);
        // return new Response(JSON.stringify({ error: 'Failed to fetch prompts' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();

    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) return new Response("Prompt not found", { status: 404 })
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to update prompt", { status: 500 })
    }
}

export const DELETE = async (req, { params }) => {

    try {
        await connectToDB();
        await Prompt.findByIdAndDelete(params.id);
        return new Response("Prompt deleted successfully", { status: 200 })
    } catch (error) {
        console.log(error,"error to delete Post")
        return new Response("Failed to delete prompt", { status: 500 })
    }

}