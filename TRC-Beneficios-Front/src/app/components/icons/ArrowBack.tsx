export default function ArrowBack({className,width, height, color}: ArrowBackProps){
    return(
        <svg className={className} width={width} height={height} viewBox="0 0 54 37" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.19235 17.263C4.65163 17.8037 4.65163 18.6804 5.19235 19.2211L14.004 28.0328C14.5447 28.5735 15.4214 28.5735 15.9621 28.0328C16.5029 27.492 16.5029 26.6154 15.9621 26.0746L8.12957 18.2421L15.9621 10.4095C16.5029 9.86877 16.5029 8.99208 15.9621 8.45135C15.4214 7.91063 14.5447 7.91063 14.004 8.45135L5.19235 17.263ZM53.9965 16.8575L6.17142 16.8574L6.17142 19.6267L53.9965 19.6267L53.9965 16.8575Z" fill={color}/>
</svg>
    )
}
type ArrowBackProps = {
    className?: string;
    width: number;
    height: number;
    color: string;
};