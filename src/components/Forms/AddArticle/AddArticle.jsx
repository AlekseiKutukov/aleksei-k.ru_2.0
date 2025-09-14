"use client";

import { useState } from "react";
import { useAuthPrompt } from "@/hooks/useAuthPrompt";
import styles from "./AddArticle.module.css";

// Компонент принимает props: fieldsConfig, apiUrl, successMessage, emptyFormState
export default function AddArticleForm({
  fieldsConfig,
  apiUrl,
  successMessage,
  emptyFormState,
}) {
  const { authenticate } = useAuthPrompt();
  const [formData, setFormData] = useState(emptyFormState);

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
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert(successMessage);
        setFormData(emptyFormState);
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
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
            />
          )}
        </div>
      ))}
      <button className={styles.form__button} type="submit">
        Добавить статью
      </button>
    </form>
  );
}
