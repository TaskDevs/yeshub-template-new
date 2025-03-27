import React from 'react'
import  { extractYear } from '../../../../../utils/readableDate'



function SectionCanPortfolioCard({data}) {
   
  return (
    <div className="twm-timing-list">
    <div className="twm-time-list-date">{extractYear(data?.project_start_date

)} to {extractYear(data?.
    project_end_date

    )}</div>
    <div className="twm-time-list-title">{data?.project_title}</div>
    {/* <div className="twm-time-list-position">{data?.qualification}</div> */}
    <div className="twm-time-list-discription">{data?.
skills
}</div>
    {/* <div className="twm-time-list-discription">
        <p>{data?.description}</p>
    </div> */}
    <div className="twm-time-list-discription">
    {/* <p className="" style={{ fontWeight: "bold" }}>Experience: </p> */}
    <div
        className=""
        dangerouslySetInnerHTML={{
            __html: data?.description
                ? (() => {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = data.description;
                    // console.log("tempDiv.innerHTML", tempDiv.innerHTML);
                    const capitalizeFirstLetterOfSentences = (htmlString) => {
                        return htmlString.replace(/([.!?]\s*)(\w)/g, (match, punctuation, char) => {
                            return punctuation + char.toUpperCase();
                        }).toLowerCase(); // Ensure the rest of the text is lowercase
                    };
                    return capitalizeFirstLetterOfSentences(tempDiv.innerHTML);
                })()
                : '',
        }}
    />
</div>
    <div className="twm-time-list-position">
      {data?.media?.map((url) => (
        <a key={url.id} href={url.url} target="_blank" rel="noreferrer">
          {url.url}
        </a>
      ))}
    </div>
</div>
  )
}

export default SectionCanPortfolioCard