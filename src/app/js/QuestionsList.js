'use client';

import { useState } from 'react';
import style from './page.module.css';

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
            style={{ cursor: 'pointer' }} // Указатель мыши
          >
            <div className={style.my_id}>{article['1_myId']}</div>
            <h3>{article['2_title']}</h3>
          </div>

          {/* Контент показывается только если статья открыта */}
          {openIndex === index && (
            <>
              <div className={style.description}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: article['3_description'],
                  }}
                />
              </div>

              {article['4_exampleCode'] && (
                <div className={style.description}>
                  <hr /> {/* Заменяем строку символов на линию */}
                  <pre className={style.example_code}>
                    {article['4_exampleCode']}
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
