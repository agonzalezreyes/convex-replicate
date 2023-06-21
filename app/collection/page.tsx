"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {

  const sketchesQuery = useQuery(api.sketches.getSketches);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {sketchesQuery?.map(sketch => (
      <div key={sketch._id}>
        {sketch.prompt}
      </div>
      ))}
    </main>
  )
}
