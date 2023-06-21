"use node";

import { mutation, query, internalAction, internalMutation } from "./_generated/server";
import { api } from "./_generated/api";
import Replicate from "replicate";
import { Id } from "./_generated/dataModel";

export const generate = internalAction (
    async (
    {runMutation}, 
    {sketchId, prompt, image}:{sketchId:Id<string>, prompt:string, image:string}
    ) => {

        console.log("running replicate");

        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN!,
        });
            
        const output = await replicate.run(
            "jagilley/controlnet-scribble:435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117",
            {
                input: {
                    image: image,
                    scale: 7,
                    prompt: prompt,
                    image_resolution: "512",
                    n_prompt: "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
                }
            }
        ) as [string, string];

        await runMutation(api.sketches.updateSketchResult, {
            sketchId,
            result: output[1],
        });

});