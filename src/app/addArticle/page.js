'use client'; // Указываем, что это клиентский компонент

import { useState } from 'react';

export default function AddArticle() {
  const [formData, setFormData] = useState({
    '1_title': '',
    '2_memorandum': '',
    '3_description': '',
    '4_example': '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/addArticle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Статья успешно добавлена!');
        setFormData({
          '1_title': '',
          '2_memorandum': '',
          '3_description': '',
          '4_example': '',
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
      <h1>Добавить новую статью</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="1_title">Название</label>
          <input
            type="text"
            name="1_title"
            value={formData['1_title']}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="2_memorandum">Короткое описание</label>
          <input
            type="text"
            name="2_memorandum"
            value={formData['2_memorandum']}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="3_description">Описание</label>
          <textarea
            name="3_description"
            value={formData['3_description']}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="4_example">Пример</label>
          <textarea
            name="4_example"
            value={formData['4_example']}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Добавить статью</button>
      </form>
    </div>
  );
}
