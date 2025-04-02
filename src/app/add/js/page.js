'use client'; // Указываем, что это клиентский компонент

import { useState } from 'react';
import style from './style.module.css';

export default function AddArticle() {
  const [formData, setFormData] = useState({
    '1_myId': '',
    '2_title': '',
    '3_description': '',
    '4_exampleCode': '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/add/js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Статья успешно добавлена!');
        setFormData({
          '1_myId': '',
          '2_title': '',
          '3_description': '',
          '4_exampleCode': '',
        });
      } else {
        alert('Ошибка при добавлении статьи');
      }
    } catch (error) {
      console.error(error);
      alert('Произошла ошибка');
    }
  };

  return (
    <div>
      <h1>Добавление нового о js</h1>
      <form onSubmit={handleSubmit}>
        <div className={style.block}>
          <label htmlFor="1_myId">Введи ID, по нему идет сортировка</label>
          <br />
          <input
            className={style.input_num}
            type="number"
            name="1_myId"
            value={formData['1_myId']}
            onChange={handleChange}
            required //флаг обязательно к заполнению
          />
        </div>
        <div className={style.block}>
          <label htmlFor="2_title">Заголовок</label>
          <br />
          <textarea
            className={style.textarea}
            type="text"
            name="2_title"
            value={formData['2_title']}
            onChange={handleChange}
          />
        </div>
        <div className={style.block}>
          <label htmlFor="3_description">Описание</label>
          <br />
          <textarea
            className={style.textarea}
            name="3_description"
            value={formData['3_description']}
            onChange={handleChange}
            required
          />
        </div>
        <div className={style.block}>
          <label htmlFor="4_exampleCode">Пример кода</label>
          <br />
          <textarea
            className={style.textarea}
            name="4_exampleCode"
            value={formData['4_exampleCode']}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Добавить статью</button>
      </form>
    </div>
  );
}
