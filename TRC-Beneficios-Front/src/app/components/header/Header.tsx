import Image from "next/image";
import Link from "next/link";

export default function Header({ title, text, email, path }: HeaderProps) {
  return <>
    <div className="w-full min-h-20 bg-[#46494C] flex justify-between mb-3">
      <div className="pt-6 pl-4 w-[70px] h-[70px] md: w-[140px]"><Link href={path}><Image
        alt="Arrow"
        src="/ArrowBack.svg"
        width={0}  
        height={0}  
        sizes="100vw"  
        style={{ width: '100%', height: 'auto' }}
      ></Image>

      </Link></div>
      <div className="mt-16 pb-10 ">
        <h2 className="  text-[#E0FF41] font-semibold text-3xl text-center   ">
          {title}
        </h2>

        <h4 className="leading-5 pt-5 text-white text-justify text-xl text-base font-medium max-w-[980px] " >
          {text}
          <span className="font-semibold underline">{email}</span></h4>
      </div>
      <div className="pt-6 pr-4 w-[70px] h-[70px] md: w-[140px]"><Image

        alt="Logo Transcon"
        src="/LogoTranscon.svg"
        width={0}  
        height={0}  
        sizes="100vw"  
        style={{ width: '100%', height: 'auto' }}
      ></Image>
      </div>
    </div>
  </>

}
type HeaderProps = {
  title: string;
  text: string;
  email?: string;
  path: string;
};
