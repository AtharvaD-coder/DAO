import { TextGenerateEffect } from "./components/text-generate-effect";
import Image from "next/image"; 
import earthglobe from '../public/earthglobe.jpeg';

const Text = 'Welcome to our Decentralized Autonomous Organization (DAO), a vibrant community where collective decision-making and shared ownership are the cornerstones of our governance. ';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex items-center justify-between">
        <div className="text-left mr-4">
          <TextGenerateEffect words={Text} className="text-2xl text-slate-50 leading-relaxed ml-4"/>
        </div>
        <div className="flex items-center justify-center w-full ">
          <Image
            src={earthglobe}
            alt="Earth Image"
            width={1000}
            height={1500}
            objectFit="cover"
            objectPosition="center"
            className="object-center"
          />
        </div>
      </div>
    </div>
  );
}