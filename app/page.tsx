"use client";
import Image from 'next/image'
import { useForm, SubmitHandler } from "react-hook-form"
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import { useRef, useState } from 'react';
import { Id } from '@/convex/_generated/dataModel';

type Inputs = {
  prompt: string
}
export default function Home() {
  const [sketchId, setSketchId] = useState<any>("");
  const saveSketchMutation = useMutation(api.sketches.saveSketch);
  const sketchQuery = useQuery(api.sketches.getSketch, {
    sketchId,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <div className="grid grid-cols-2 gap-4">
       <form
       className='flex flex-col gap-2' 
       onSubmit={handleSubmit(async (formData) => {
        console.log(formData);
        if (!canvasRef.current) return;
        const image = await canvasRef.current?.exportImage("jpeg");
        console.log("image", image);
        const result = await saveSketchMutation({...formData, image});
        setSketchId(result);
       })}>
        <input className='text-black'
          {...register("prompt", { required: true })} />
      {errors.prompt && <span>This field is required</span>}
        
      <ReactSketchCanvas
        ref={canvasRef}
        style={{width:256, height: 256}}
        strokeWidth={4}
        strokeColor="black"
      />

      
        <input className="bg-blue-400 rounded" type="submit" />
      </form>
      
      {sketchQuery && 
        <img width="256" height="256" src={sketchQuery.result} />
      }
      </div>
    </main>
  )
}
