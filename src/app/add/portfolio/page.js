"use client";

import { useState } from "react";
import { useAuthPrompt } from "../../../hooks/useAuthPrompt";
import style from "./style.module.css";

export default function AddArticle() {
  const { authenticate } = useAuthPrompt();
  const [formData, setFormData] = useState({
    title: "",
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
      const res = await fetch("/api/add/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Статья успешно добавлена!");
        setFormData({
          title: "",
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
      <h1>Добавить работу в портфолио</h1>
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
        <button type="submit">Добавить статью</button>
      </form>
    </div>
  );
}
