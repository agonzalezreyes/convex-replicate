import { mutation, query } from "./_generated/server";

export const saveSketch = mutation(
    async ({db}, {prompt}: {prompt:string}) => {
        console.log('saveSketch', prompt);

        await db.insert('sketches', {
            prompt,
        });

        return {
            message: 'Saved sketch'
        }
    }
);

export const getSketches = query(
    async ({db}) => {
        console.log('getSketches');

        const sketches = await db.query('sketches').collect();

        return sketches;
    }
);