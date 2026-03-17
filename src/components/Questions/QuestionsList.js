"use client";

import { useState } from "react";
import style from "./page.module.css";

export default function QuestionsList({ articles }) {
  const [openIndex, setOpenIndex] = useState(null); // Состояние для отслеживания открытой статьи

  const toggleContent = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Переключаем видимость
  };

  return (
    <>
      {articles.map((article, index) => (
        <div key={index} className={style.question}>
          <div
            className={style.title}
            onClick={() => toggleContent(index)} // Клик по заголовку
            style={{ cursor: "pointer" }} // Указатель мыши
          >
            <div className={style.my_id}>{article["myId"]}</div>
            {/* id по русски специально чтобы работал поиск */}
            <h3 id={article["title"]}>{article["title"]}</h3>
          </div>

          {/* Контент показывается только если статья открыта */}
          {openIndex === index && (
            <>
              <div className={style.description}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: article["description"],
                  }}
                />
              </div>

              {article["exampleCode"] && (
                <div className={style.description}>
                  <hr /> {/* Заменяем строку символов на линию */}
                  <pre className={style.example_code}>
                    {article["exampleCode"]}
                  </pre>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </>
  );
}
