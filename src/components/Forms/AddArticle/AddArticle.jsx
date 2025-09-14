// src/components/Forms/AddArticle/AddArticle.js

"use client";

import { useState } from "react";
import { useAuthPrompt } from "@/hooks/useAuthPrompt";
import styles from "./AddArticle.module.css";

export default function AddArticleForm({
  fieldsConfig,
  apiUrl,
  successMessage,
  emptyFormState,
  hasImageUpload = false,
}) {
  const { authenticate } = useAuthPrompt();
  const [formData, setFormData] = useState(emptyFormState);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFile(files[0]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authenticate()) {
      return;
    }

    try {
      // Создаем объект FormData
      const data = new FormData();
      // Добавляем текстовые данные из состояния формы
      for (const key in formData) {
        data.append(key, formData[key]);
      }
      // Добавляем файл, если он выбран
      if (file) {
        data.append("image", file);
      }

      // Отправляем FormData вместо JSON
      const res = await fetch(apiUrl, {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        alert(successMessage);
        setFormData(emptyFormState);
        setFile(null); // Сбрасываем файл после успешной загрузки
      } else {
        alert("Ошибка при добавлении статьи");
      }
    } catch (error) {
      console.error(error);
      alert("Произошла ошибка");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {fieldsConfig.map((field) => (
        <div key={field.name} className={styles.form__block}>
          <label htmlFor={field.name}>{field.label}</label>
          {field.type === "textarea" ? (
            <textarea
              className={styles.form__textarea}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
            />
          ) : (
            <input
              className={styles.form__input}
              type={field.type}
              name={field.name}
              value={
                field.type !== "file" ? formData[field.name] || "" : undefined
              }
              onChange={handleChange}
              required={field.required}
            />
          )}
        </div>
      ))}
      {/* Добавляем поле для загрузки изображения */}
      {hasImageUpload && (
        <div className={styles.form__block}>
          <label htmlFor="image">Скриншот (загрузить изображение)</label>
          <input
            className={styles.form__input}
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </div>
      )}
      <button className={styles.form__button} type="submit">
        Добавить статью
      </button>
    </form>
  );
}
