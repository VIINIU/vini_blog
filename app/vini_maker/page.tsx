"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ChatBubble, { Choice } from '../components/vm_chat_bubble';
import Image from "next/image";

const GITHUB_IMAGE_BASE = "https://raw.githubusercontent.com/VIINIU/vini_blog_db/main/images/";

type ScriptLine = {
  id: number;
  talker: string;
  line: string;   
  characterImg: string; 
  backgroundImg?: string;
  choices?: Choice[];
  correctAnswer?: string;
};

const SCRIPT : ScriptLine[] = [
  {
    id: 1,
    talker: "유빈",
    line: "저를 키워보세요!",
    characterImg: "vini_maker/stand1_front02_girl.png", 
    backgroundImg: "" ,
    choices: [
        { label: "뭐가 될 지 모르겠지만 한 번 키워보자", value: "yes" },
        { label: "됐어", value: "no" }
    ],
    correctAnswer: 'yes'
  },
  {
    id: 2,
    talker: "유빈",
    line: "저는 4살에 클래식 피아노를 시작했어요.",
    characterImg: "vini_maker/piano_baby.png", 
    backgroundImg: "vini_maker/butai_stage_big.png" 
  },
  {
    id: 3,
    talker: "유빈",
    line: "피아노 전공에 도전해도 될까요?",
    characterImg: "vini_maker/piano_baby.png", 
    backgroundImg: "vini_maker/butai_stage_big.png",
    choices: [
        { label: "응, 도전해보자", value: "yes" },
        { label: "아니, 힘들지도 모르잖아.", value: "no" }
    ],
    correctAnswer: 'yes'
  },
  {
    id: 4,
    talker: "유빈",
    line: "연습 열심히 할게요!",
    characterImg: "vini_maker/piano_baby.png", 
    backgroundImg: "vini_maker/butai_stage_big.png" 
  },
  {
    id: 5,
    talker: "유빈",
    line: "저는 계속 피아노를 치면서 예술고등학교 입시를 준비하고 있어요!",
    characterImg: "vini_maker/girl_piano.png", 
    backgroundImg: "vini_maker/butai_stage_big.png" 
  },
  {
    id: 6,
    talker: "유빈",
    line: "예술고등학교에는 탈락했네요...",
    characterImg: "vini_maker/test_print_gakkari_schoolgirl.png", 
    backgroundImg: "vini_maker/bg_school_room.jpg" 
  },
  {
    id: 7,
    talker: "유빈",
    line: "하지만 새로운 꿈이 생겼으니 괜찮아요! 새로운 꿈에 도전할 기회가 생겼어요!",
    characterImg: "vini_maker/yaruki_aru_school_girl.png", 
    backgroundImg: "vini_maker/bg_school_room.jpg" 
  },
  {
    id: 8,
    talker: "유빈",
    line: "새로운 꿈에 도전해도 될까요?",
    characterImg: "vini_maker/yaruki_aru_school_girl.png", 
    backgroundImg: "vini_maker/bg_school_room.jpg" ,
    choices: [
        { label: "응, 도전해보자", value: "yes" },
        { label: "아니, 힘들지도 모르잖아.", value: "no" }
    ],
    correctAnswer: 'yes'
  },
  {
    id: 9,
    talker: "유빈",
    line: "좋아요! 제 새로운 꿈은 엔지니어예요! 세상에 없던 것을 만드는 일을 하고 싶어요!",
    characterImg: "vini_maker/computer_programming_woman.png", 
    backgroundImg: "vini_maker/bg_network_dennou_sekai.jpg" 
  },
  {
    id: 10,
    talker: "유빈",
    line: "원하는 학과에 들어가기 위해 열심히 공부하고 있어요!",
    characterImg: "vini_maker/study_school_jugyou_woman.png", 
    backgroundImg: "vini_maker/bg_school_room.jpg" 
  },
  {
    id: 11,
    talker: "유빈",
    line: "드디어 수능이에요! 잘 보고올게요!",
    characterImg: "vini_maker/school_shiken_kaijou_boy_girl.png", 
    backgroundImg: "vini_maker/bg_dote.jpg" 
  },
  {
    id: 12,
    talker: "유빈",
    line: "수능을 망친 것 같아요... 다시 한 번 도전해도 될까요?",
    characterImg: "vini_maker/test_print_gakkari_schoolgirl.png", 
    backgroundImg: "vini_maker/bg_school_room.jpg" ,
    choices: [
        { label: "응, 도전해보자", value: "yes" },
        { label: "아니, 너무 힘들거야.", value: "no" }
    ],
    correctAnswer: 'yes'
  },
  {
    id: 13,
    talker: "유빈",
    line: "열심히 공부해볼게요!!",
    characterImg: "vini_maker/study_school_jugyou_woman.png", 
    backgroundImg: "vini_maker/bg_school_room.jpg" 
  },
  {
    id: 14,
    talker: "유빈",
    line: "이제 곧 수능날이 돌아와요.. 열심히 공부하고 있어요!",
    characterImg: "vini_maker/study_school_jugyou_woman.png", 
    backgroundImg: "vini_maker/bg_school_room.jpg" 
  },
  {
    id: 15,
    talker: "유빈",
    line: "두번째 수능날이에요! 잘 보고올게요!",
    characterImg: "vini_maker/school_shiken_kaijou_boy_girl.png", 
    backgroundImg: "vini_maker/bg_dote.jpg" 
  },
  {
    id: 16,
    talker: "유빈",
    line: "문제가 그렇게 어렵게 느껴지지는 않네요!!",
    characterImg: "vini_maker/test_shiken_woman.png", 
    backgroundImg: "vini_maker/bg_school_room.jpg" 
  },
  {
    id: 17,
    talker: "유빈",
    line: "이번에는 정말 잘 봤어요!",
    characterImg: "vini_maker/test_print_happy_schoolgirl.png", 
    backgroundImg: "vini_maker/bg_school_room.jpg" 
  },
  {
    id: 18,
    talker: "유빈",
    line: "중앙대에 합격했어요!",
    characterImg: "vini_maker/banzai_schoolgirl1.png", 
    backgroundImg: "vini_maker/bg_school_room.jpg" 
  },{
    id: 19,
    talker: "유빈",
    line: "대학생이 된 저는 공학을 배우고, 재미있는 프로젝트도 여러개 하고 있어요. 저는 재미있는 일을 하면서 성공하고 싶거든요.",
    characterImg: "vini_maker/study_school_jugyou_girl.png",
    backgroundImg: "vini_maker/bg_room_syosai_book.jpg"
  },
  {
    id: 20,
    talker: "유빈",
    line: "제가 생각하는 성공은요..",
    characterImg: "vini_maker/fukidashi2_businesswoman.png",
    backgroundImg: "vini_maker/bg_room_syosai_book.jpg"
  },
  {
    id: 21,
    talker: "유빈",
    line: "어떤 큰일이 닥쳐도 나를 지킬 수 있는 '경제적 여유'와 '심리적 안정감'이죠.",
    characterImg: "vini_maker/mokuhyou_tassei_woman.png",
    backgroundImg: "vini_maker/bg_room_syosai_book.jpg"
  },
  {
    id: 22,
    talker: "유빈",
    line: "그런데 제가 왜 제 인생을 이런 '게임'으로 제 가치관과 정체성을 보여드리려 했는 지 아시겠나요?",
    characterImg: "vini_maker/nurse3_1_question.png",
    backgroundImg: "vini_maker/bg_room_syosai_book.jpg",
    choices: [
      { label: "그러게, 왜 게임으로 만들었어?", value: "yes" },
      { label: "글쎄. 별로 안 궁금해.", value: "no" }
    ],
    correctAnswer: 'yes'
  },
  {
    id: 23,
    talker: "유빈",
    line: "지금의 저는 과거의 수많은 선택의 결과물이라고 생각했기 때문이에요. 마치 게임 속 선택지처럼요.",
    characterImg: "vini_maker/life_wakaremichi_businesswoman.png",
    backgroundImg: ""
  },
  {
    id: 243,
    talker: "유빈",
    line: "피아노를 포기했을 때도, 재수를 결심했을 때도... 그 모든 선택이 모여 지금의 제가 되었다고 생각해요.",
    characterImg: "vini_maker/life_wakaremichi_businesswoman.png",
    backgroundImg: ""
  },
  {
    id: 25,
    talker: "유빈",
    line: "제가 앞으로 어떤 삶을 살고 싶은지 아시나요?",
    characterImg: "vini_maker/fukidashi2_businesswoman.png",
    backgroundImg: "",
    choices: [
      { label: "행복을 찾고 싶을 것 같아.", value: "yes" },
      { label: "엄청난 부자가 되고 싶을 것 같아.", value: "no" }
    ],
    correctAnswer: 'yes'
  },
  {
    id: 26,
    talker: "유빈",
    line: "맞아요. 저는 궁극적으로는 '대부분의 순간에서 행복한 사람'이 되고싶어요.",
    characterImg: "vini_maker/happy_woman3.png",
    backgroundImg: ""
  },
  {
    id: 27,
    talker: "유빈",
    line: "큰 성공에 매몰되어 불행해지기보다, 내가 하고싶던 일을 하며 과정 속의 작은 기쁨과 뿌듯함, 만족감을 놓치지 않고 싶어요.",
    characterImg: "vini_maker/moratorium_woman.png",
    backgroundImg: ""
  },
  {
    id: 28,
    talker: "유빈",
    line: "앞서 보셨듯 제 선택이 늘 절 성공으로 이끌지는 않았지만, 과거의 저는 최선의 선택들을 해왔다고 믿어요. 후회하지 않고요.",
    characterImg: "vini_maker/test_print_gakkari_schoolgirl.png",
    backgroundImg: ""
  },
  {
    id: 29,
    talker: "유빈",
    line: "미래의 나에게 원망받거나 부끄럽지 않도록, 오늘을 만족스러운 선택으로 채워갈 거예요.",
    characterImg: "vini_maker/mokuhyou_tassei_woman.png",
    backgroundImg: ""
  },
  {
    id: 30,
    talker: "유빈",
    line: "그게 바로 제가 만들어갈 인생입니다.",
    characterImg: "vini_maker/banzai_businesswoman2.png",
    backgroundImg: ""
  },
  {
    id: 31,
    talker: "유빈",
    line: "저의 여러 도전을 왼쪽의 github, linkedin, instagram, Resume 그리고, 위쪽의 post들을 통해서 확인 할 수 있어요! 저를 지켜봐 주세요!",
    characterImg: "vini_maker/travel_girl.png",
    backgroundImg: "vini_maker/bg_natural_sky.jpg"
  }
];

export default function ViniMaker() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentScene = SCRIPT[currentIndex];

  useEffect(() => { setMounted(true); }, []);

  const handleNext = () => {
    if (currentScene.choices) return;
    if (currentIndex < SCRIPT.length - 1) {
        setCurrentIndex(prev => prev + 1);
    } else {
        router.push('/');
    }
  };

  const handleAnswer = (answer: string) => {
    if (answer === currentScene.correctAnswer) {
      if (currentIndex < SCRIPT.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        router.push('/');
      }
    } else {
      alert("저는 그 선택을 하지 않았어요..ㅠ");
    }
  };

  const getImageUrl = (path: string) => {
    if (path.startsWith("http")) return path;
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return `${GITHUB_IMAGE_BASE}${cleanPath}`;
  };

  if (!mounted) return <div className="w-full h-dvh bg-black" />;

  return (
    <main onClick={handleNext} className="relative w-full h-dvh overflow-hidden bg-black flex flex-col items-center justify-end cursor-pointer select-none">
      
      <div className="absolute inset-0 z-0">
        {currentScene.backgroundImg && (
           <Image key={currentScene.backgroundImg} src={getImageUrl(currentScene.backgroundImg)} alt="bg" fill className="object-cover opacity-90" priority />
        )}
      </div>

      <div className="absolute inset-0 z-1 pointer-events-none bg-[radial-gradient(circle,transparent_50%,rgba(255,255,255,0.9)_100%)]" />

      <div className="absolute z-10 inset-0 w-full h-full flex justify-center items-center pointer-events-none">
        <div className="relative w-full h-full md:w-[80%] md:h-[90%]">
           {currentScene.characterImg && (
             <Image key={currentScene.characterImg} src={getImageUrl(currentScene.characterImg)} alt="char" fill className="object-contain object-center drop-shadow-2xl" priority /> 
           )} 
        </div>
      </div>
      <div className="relative z-20 w-full pb-5 px-4 flex justify-center ">
        <ChatBubble 
            talker={currentScene.talker} 
            line={currentScene.line}
            choices={currentScene.choices}
            onAnswer={handleAnswer}
        />
      </div>

      <div className="absolute bottom-2 right-4 z-50 text-xs pointer-events-none">
        이미지 출처: irasutoya.com
      </div>
    </main>
  );
}