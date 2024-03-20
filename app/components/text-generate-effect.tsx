"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/utils/cn";

export const TextGenerateEffect = ({
    words,
    className,
   }: {
    words: string;
    className?: string;
   }) => {
    const [scope, animate] = useAnimate();
    let wordsArray = words.split(" ");
    useEffect(() => {
       animate(
         "span",
         {
           opacity: 1,
         },
         {
           duration: 2,
           delay: stagger(0.2),
         }
       );
    }, [scope.current]);
   
    const renderWords = () => {
       return (
         <motion.div ref={scope} className="h-auto overflow-hidden"> {/* Adjust the height and overflow as needed */}
           {wordsArray.map((word, idx) => {
             return (
               <motion.span
                 key={word + idx}
                 className="dark:text-white text-black opacity-0"
               >
                 {word}{" "}
               </motion.span>
             );
           })}
         </motion.div>
       );
    };
   
    return (
       <div className={cn("font-bold", className)}>
         <div className="mt-4">
           <div className="dark:text-white text-slate-50 text-5xl leading-relaxed tracking-wide">
             {renderWords()}
           </div>
         </div>
       </div>
    );
   };
   