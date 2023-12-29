import { FaRegCopy } from "react-icons/fa";
import { IArticle } from "./Demo";

type HistoryComponentProps = {
  articles: IArticle[]
  setArticle: React.Dispatch<React.SetStateAction<IArticle>>;
};

const History: React.FC<HistoryComponentProps> = ({ articles, setArticle }) => {
  return (
    <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
      {articles.map((item: IArticle, index: number) => (
        <div
            key={`link-${index}`}
            onClick={() => setArticle(item)}
            className='p-3 flex justify-start items-center flex-row bg-white border border-gray-200 gap-3 rounded-lg cursor-pointer'
        >
            <div className='w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer'>
                <FaRegCopy className='w-[40%] h-[40%] object-contain'/>
            </div>

            <p className='flex-1 font-inter text-blue-700 font-medium text-sm truncate'>
                {item.url}
            </p>
        </div>
      ))}
    </div>
  )
}

export default History;
