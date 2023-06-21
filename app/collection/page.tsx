"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {

  const sketchesQuery = useQuery(api.sketches.getSketches);
  const sortedSketches = (sketchesQuery ?? []).sort((a, b) => {
    return b._creationTime - a._creationTime;
  });
  return (
    <main className="flex min-h-screen flex-col items-center p-20">
        <h1 className="pb-10">Recent Sketches</h1>
        <div className='grid grid-cols-4 gap-4'>
        {sortedSketches.map(sketch => (
          <img key={sketch._id} width="256" height="256" src={sketch.result}/>
        ))}
        </div>
    </main>
  )
}
