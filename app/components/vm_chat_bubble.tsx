import React from 'react';

export type Choice = {
  label: string;
  value: string;
};

type ChattingProps = {
  talker: string;
  line: string;
  choices?: Choice[];
  onAnswer?: (value: string) => void;
};
export default function ChatBubble({ talker, line, choices, onAnswer }: ChattingProps) {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="absolute -top-6 left-8 bg-white border-3 border-black rounded-[20px] px-6 py-2 z-40 shadow-sm">
        <p className="font-extrabold text-xl text-black tracking-wider drop-shadow-sm">{talker}</p>
      </div>
      
      <div className="relative flex flex-col text-black justify-start items-start border-3 border-black rounded-[40px] px-10 pt-14 pb-10 m-2 shadow-sm w-full min-h-[150px] bg-white z-30 ">
        
        <div className="flex flex-col text-lg xl:text-2xl text-start w-full h-full justify-between pb-5">
          <p className="text-md text-black font-bold leading-relaxed break-keep">
            {line}
          </p>
          
          {(!choices || choices.length === 0) && (
            <div className="absolute bottom-6 right-10 animate-bounce text-black">
               <div className="w-5 h-4 bg-black [clip-path:polygon(0%_0%,100%_0%,50%_100%)]"></div>
            </div>
          )}
        </div>

        {choices && choices.length > 0 && (
          <div className="absolute -top-[100px] -right-4 md:right-0 flex flex-col gap-2 min-w-[180px] bg-white border-3 border-black rounded-[20px] p-6 shadow-xl z-50">
            {choices.map((choice, index) => (
              <button 
                key={index}
                onClick={(e) => { e.stopPropagation(); onAnswer?.(choice.value); }}
                className="group flex items-center w-full text-left p-1 gap-3 transition-transform active:scale-95"
              >
                <span className="w-3 text-md text-black opacity-0 group-hover:opacity-100 transition-opacity duration-200">▶</span>
                <span className="text-sm font-bold text-black group-hover:text-[#d45d79]">{choice.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}