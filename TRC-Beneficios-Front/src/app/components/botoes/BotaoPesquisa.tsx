export default function BotaoPesquisa({ name}: BotaoPesquisaProps) {
  return (
    <>
      <button type="submit"  className="text-[#46494C] font-semibold  w-[200] h-[36] p-0.25 rounded-md bg-[#E0FF41] hover:shadow-lg  ">
        {name}
      </button>
    </>
  );
}
type BotaoPesquisaProps = {
  name: string;
  
};
