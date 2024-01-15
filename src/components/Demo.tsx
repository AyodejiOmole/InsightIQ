import { useEffect, useState } from 'react';
import { IoLinkOutline } from "react-icons/io5";
import { MdSubdirectoryArrowLeft } from "react-icons/md";
import { useLazyGetSummaryQuery } from '../services/article';
import History from './History';
import { LuLoader2 } from "react-icons/lu";

export interface IArticle {
  url: string,
  summary: string
}

const Demo = () => {
  const [article, setArticle] = useState<IArticle>({
    url: "",
    summary: ""
  });

  const [articleLength, setArticleLength] = useState<string | number>(5);

  const [copied, setCopied] = useState< null | boolean>();

  const [allArticles, setAllArticles] = useState<[] | IArticle[]>([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem("articles") || "[]");

    if(articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // const { data } = await getSummary({ articleUrl: article.url});
    const { data } = await getSummary({ articleUrl: article.url, length: articleLength});
    
    if(data?.summary) {
      const newArticle = {...article, summary: data.summary};
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  }
  
  const handleCopyUrl = (copyUrl: string) => {
    setCopied(true);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000)
  }

  const articleLengthOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <section className="mt-16 w-full flex justify-center lg:mx-0">

      {/* Search bar */}
      <div className='flex justify-center flex-col lg:w-1/2 w-full gap-2'>
        <form 
          className="flex justify-between"
          onSubmit={handleSubmit}>
            <div className='w-full relative flex justify-center items-center'>
              <IoLinkOutline 
                className="absolute left-0 my-2 ml-3 w-5"
              />

              <input 
                type="url" 
                placeholder="Enter the url to the article..." 
                value={article.url}
                onChange={(e) => setArticle({...article, url: e.target.value})}
                className="block w-full rounded-md border border-gray-200 bg-white py-2.5 pl-10 pr-12 text-sm shadow-lg font-satoshi font-medium focus:border-black focus:outline-none focus:ring-0"/>

              <button 
                className="hover:border-gray-700 hover:text-gray-700 absolute inset-y-0 right-0 my-1.5 mr-1.5 flex w-10 items-center justify-center rounded border border-gray-200 font-sans text-sm font-medium text-gray-400 peer-focus:border-gray-700 peer-focus:text-gray-700"
              >
                <MdSubdirectoryArrowLeft />
              </button>
            </div>


            <select id="articleLength" name="length" value={articleLength} onChange={(e) => setArticleLength(e.target.value)}>
              {
                articleLengthOptions.map((number: number, index: number) => {
                  return (
                    <option value={number} key={index}>
                      {number}
                    </option>
                  )
                })
              }
            </select>
        </form>

        <History articles={allArticles} currentArticle={article} handleCopy={handleCopyUrl} setArticle={setArticle} copied={copied}/>


        {/* Displaying results */}
        <div className='my-10 max-w-full flex justify-center items-center'>
          {isFetching ? (
              <LuLoader2 className="h-20 object-contaim w-20"/>
          ) : error ? (
            <p className="font-inter font-bold text-black text-center">
              Well, we certainly didn't plan for that to happen...
              <br/>
              <span className='font-inter font-normal text-gray-700'>
                {error?.data?.error}
              </span>
            </p>
          ) : (
            article.summary && (
              <div className="flex flex-col gap-3">
                <h2 className='font-inter font-bold text-gray-600 text-xl'>
                  Article <span className='font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'>Summary</span>
                </h2>

                <div className="rounded-xl border border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-4">
                  <p className='text-gray-700 font-inter font-medium text-sm'>{article.summary}</p>
                </div>
              </div>
            )
          )}
      </div>
      </div>
    </section>
  )
};

export default Demo;
