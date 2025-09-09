"use client";

import { useState } from "react";
import { useAuthPrompt } from "../../../hooks/useAuthPrompt";
import style from "./style.module.css";

export default function AddArticle() {
  const { authenticate } = useAuthPrompt();
  const [formData, setFormData] = useState({
    myId: "",
    title: "",
    description: "",
    exampleCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authenticate()) {
      return;
    }

    try {
      const res = await fetch("/api/add/js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Статья успешно добавлена!");
        setFormData({
          myId: "",
          title: "",
          description: "",
          exampleCode: "",
        });
      } else {
        alert("Ошибка при добавлении статьи");
      }
    } catch (error) {
      console.error(error);
      alert("Произошла ошибка");
    }
  };

  return (
    <div>
      <h1>Добавление нового о js</h1>
      <form onSubmit={handleSubmit}>
        <div className={style.block}>
          <label htmlFor="myId">Введи ID, по нему идет сортировка</label>
          <br />
          <input
            className={style.input_num}
            type="number"
            name="myId"
            value={formData["myId"]}
            onChange={handleChange}
            required //флаг обязательно к заполнению
          />
        </div>
        <div className={style.block}>
          <label htmlFor="title">Заголовок</label>
          <br />
          <textarea
            className={style.textarea}
            type="text"
            name="title"
            value={formData["title"]}
            onChange={handleChange}
          />
        </div>
        <div className={style.block}>
          <label htmlFor="description">Описание</label>
          <br />
          <textarea
            className={style.textarea}
            name="description"
            value={formData["description"]}
            onChange={handleChange}
            required
          />
        </div>
        <div className={style.block}>
          <label htmlFor="exampleCode">Пример кода</label>
          <br />
          <textarea
            className={style.textarea}
            name="exampleCode"
            value={formData["exampleCode"]}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Добавить статью</button>
      </form>
    </div>
  );
}
