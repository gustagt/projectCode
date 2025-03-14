import Link from "next/link";
import Image from "next/image";
export default function BotaoMenu({ name, icon, path }: BotaoMenuProps) {
  return (
    <>
        <div className="p-0 font-semibold text-[#46494C] cursor-pointer text-center text-2xl rounded-xl border-2 bg-[#E0FF41] hover:shadow-lg flex justify-center text-wrap items-center md:p-5  ">
          <div className=" ">
            {" "}
            <Image alt="icone" src={icon} width={58} height={50.58}></Image>
          </div>
          <div className=" w-1 h-[50px] m-3 bg-white rounded-xl"></div>
          <Link href={path}>
            <h1 className="w-[200px]">{name}</h1>
          </Link>
        </div>
        
    </>
  );
}
type BotaoMenuProps = {
  name: string;
  icon: string;
  path: string;
};
