import { mutation, query, internalAction, internalMutation } from "./_generated/server";
import { api } from "./_generated/api";
import Replicate from "replicate";
import { Id } from "./_generated/dataModel";

export const saveSketch = mutation(
    async ({db, scheduler}, {prompt, image}: {prompt:string; image:string}) => {
        console.log('saveSketch', prompt);

        const sketch = await db.insert('sketches', {
            prompt,
        });

        // schedule a job to generate the image
        await scheduler.runAfter(0, api.generate.generate, {
            sketchId: sketch,
            prompt,
            image,
            })

        return sketch;
    }
);

export const getSketch = query(({db}, {sketchId}: {sketchId: Id<string>}) => {
    if (!sketchId) {
        return null;
    }
    return db.get(sketchId);
});

export const updateSketchResult = internalMutation(
    async (
        {db}, 
        {sketchId, result}: {sketchId: Id<string>, result: string}
    ) => {
        await db.patch(sketchId, {
            result,
        });
});

export const getSketches = query(
    async ({db}) => {
        console.log('getSketches');

        const sketches = await db.query('sketches').collect();

        return sketches;
    }
);