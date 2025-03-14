import Image from "next/image"

export default function StatusSegundaVia ({title, description, imageSrc,colorStatus, iconSrc, textColor} : StatusSegundaViaProps){
    return (
    
        <div className="flex ">
            <div className="  md: w-[60px] pr-2 flex">
            <Image src={imageSrc} alt={"iconImage"}  width={0}  height={0}  sizes="100vw"  style={{ width: '100%', height: 'auto' }}></Image>
            </div>
            <div className={`border-solid flex w-[340px] h-[90px] p-2 bg-[${colorStatus}] text-[${textColor}] md:  w-[299px] rounded-md `}>
                <div className="w-[310px]">
                <h1 className="text-[19px] font-semibold md: text-[18px]">{title}</h1>
                <h3 className="text-[17px] md: text-[15px] ">{description}</h3></div>
                <div className="self-end">
                <Image src={iconSrc} alt={"iconImage"} width={33} height={33}></Image></div>
            </div>
        </div>
)
}
type StatusSegundaViaProps = {
    title:string,
    description:string,
    imageSrc:string,
    colorStatus:string,
    iconSrc:string,
    textColor:string
}