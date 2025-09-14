"use client";

import { useState } from "react";
import { useAuthPrompt } from "../../../hooks/useAuthPrompt";

import style from "./style.module.css";

export default function AddArticle() {
  const { authenticate } = useAuthPrompt();
  const [formData, setFormData] = useState({
    title: "",
    memorandum: "",
    description: "",
    whatDoesItDo: "",
    whenToUse: "",
    example: "",
    important: "",
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
      const res = await fetch("/api/add/hooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Статья успешно добавлена!");
        setFormData({
          title: "",
          memorandum: "",
          description: "",
          whatDoesItDo: "",
          whenToUse: "",
          example: "",
          important: "",
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
      <h1>Добавление нового хука</h1>
      <form onSubmit={handleSubmit}>
        <div className={style.block}>
          <label htmlFor="title">Название</label>
          <br />
          <input
            className={style.input}
            type="text"
            name="title"
            value={formData["title"]}
            onChange={handleChange}
            required //флаг обязательно к заполнению
          />
        </div>
        <div className={style.block}>
          <label htmlFor="memorandum">Короткое описание</label>
          <br />
          <textarea
            className={style.textarea}
            type="text"
            name="memorandum"
            value={formData["memorandum"]}
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
          <label htmlFor="whatDoesItDo">Что делает хук?</label>
          <br />
          <textarea
            className={style.textarea}
            name="whatDoesItDo"
            value={formData["whatDoesItDo"]}
            onChange={handleChange}
          />
        </div>
        <div className={style.block}>
          <label htmlFor="whenToUse">Когда использовать?</label>
          <br />
          <textarea
            className={style.textarea}
            name="whenToUse"
            value={formData["whenToUse"]}
            onChange={handleChange}
          />
        </div>
        <div className={style.block}>
          <label htmlFor="example">Пример</label>
          <br />
          <textarea
            className={style.textarea}
            name="example"
            value={formData["example"]}
            onChange={handleChange}
          />
        </div>
        <div className={style.block}>
          <label htmlFor="important">Важные моменты</label>
          <br />
          <textarea
            className={style.textarea}
            name="important"
            value={formData["important"]}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Добавить статью</button>
      </form>
    </div>
  );
}
