"use client";

import { useState } from "react";
import { useAuthPrompt } from "../../../hooks/useAuthPrompt";
import style from "./style.module.css";

export default function AddArticle() {
  const { authenticate } = useAuthPrompt();
  const [formData, setFormData] = useState({
    "1_title": "",
    "2_memorandum": "",
    "3_description": "",
    "4_whatDoesItDo": "",
    "5_whenToUse": "",
    "6_example": "",
    "7_important": "",
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
          "1_title": "",
          "2_memorandum": "",
          "3_description": "",
          "4_whatDoesItDo": "",
          "5_whenToUse": "",
          "6_example": "",
          "7_important": "",
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
          <label htmlFor="1_title">Название</label>
          <br />
          <input
            className={style.input}
            type="text"
            name="1_title"
            value={formData["1_title"]}
            onChange={handleChange}
            required //флаг обязательно к заполнению
          />
        </div>
        <div className={style.block}>
          <label htmlFor="2_memorandum">Короткое описание</label>
          <br />
          <textarea
            className={style.textarea}
            type="text"
            name="2_memorandum"
            value={formData["2_memorandum"]}
            onChange={handleChange}
          />
        </div>
        <div className={style.block}>
          <label htmlFor="3_description">Описание</label>
          <br />
          <textarea
            className={style.textarea}
            name="3_description"
            value={formData["3_description"]}
            onChange={handleChange}
            required
          />
        </div>
        <div className={style.block}>
          <label htmlFor="4_whatDoesItDo">Что делает хук?</label>
          <br />
          <textarea
            className={style.textarea}
            name="4_whatDoesItDo"
            value={formData["4_whatDoesItDo"]}
            onChange={handleChange}
          />
        </div>
        <div className={style.block}>
          <label htmlFor="5_whenToUse">Когда использовать?</label>
          <br />
          <textarea
            className={style.textarea}
            name="5_whenToUse"
            value={formData["5_whenToUse"]}
            onChange={handleChange}
          />
        </div>
        <div className={style.block}>
          <label htmlFor="6_example">Пример</label>
          <br />
          <textarea
            className={style.textarea}
            name="6_example"
            value={formData["6_example"]}
            onChange={handleChange}
          />
        </div>
        <div className={style.block}>
          <label htmlFor="7_important">Важные моменты</label>
          <br />
          <textarea
            className={style.textarea}
            name="7_important"
            value={formData["7_important"]}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Добавить статью</button>
      </form>
    </div>
  );
}
