import Image from "next/image";
import Link from "next/link";


export default function Footer() {
  return (
    <footer className="flex flex-col select-none bg-background font-dos gap-1 pt-20 justify-center pb-10 text-[8px] md:text-[10px] xl:text-[10px] items-center ">
        <span className="flex flex-col bg-background justify-center items-center">
            <span className="flex justify-center gap-[8px] items-center">
            <Link href="https://github.com/viiniu" target="_blank" rel="noopener noreferrer">
                <span className="flex justify-center items-center bg-background">
                    <Image
                        src="/github_icon.svg"  
                        alt="github_icon"
                        width={18}    
                        height={18}
                    />
                </span>
            </Link>
            <Link href="https://www.instagram.com/vini___u" target="_blank" rel="noopener noreferrer">
                <span className="flex justify-center items-center bg-background">
                    <Image
                        src="/instagram_icon.svg"
                        alt="instagram_icon"
                        width={18}    
                        height={18}
                    />
                </span>
            </Link>
            </span>
            <span className="text-gray font-light">___</span>
        </span>
        <span className="flex flex-col justify-center items-center">
            <span className="flex flex-row justify-center items-center">
            <span className="text-gray font-light">Designed and Developed by. </span>
            <span className="text-gray font-bold">Yubin Seo</span>
            </span>
            <span className="flex flex-row justify-center items-center">
            <span className="text-gray font-light">All Contents Created by. </span>
            <span className="text-gray font-bold">Yubin Seo</span>
            </span>
            <span className="flex flex-row justify-center items-center">
            <span className="text-gray font-light">Web Server Supported by. </span>
            <span className="text-gray font-bold">Yongmin Yoo</span>
            </span>
            <span className="text-gray font-bold"><br/>©2025.Yubin Seo.All right reserved</span>
        </span>
    </footer>
  );
}