"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Search.module.sass";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const router = useRouter();
  const inputRef = useRef(null);

  // Функция для выполнения поиска
  const fetchResults = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const response = await fetch(
      `/api/search?q=${encodeURIComponent(searchQuery)}`
    );

    // Проверяем, что ответ успешный
    if (!response.ok) {
      setResults([]);
      return;
    }

    const data = await response.json();
    setResults(data);
  };

  // Debounce для поиска
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchResults(query);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Очистка при изменении URL (навигация назад/вперёд)
  useEffect(() => {
    const handleRouteChange = () => {
      setQuery("");
      setResults([]);
      inputRef.current?.blur(); // Убираем фокус с инпута
    };

    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  // Обработчик клика по ссылке, очищаем и уходим с поля поиска
  const handleLinkClick = () => {
    setQuery(""); // Очищаем поле ввода
    setResults([]); // Очищаем результаты
    inputRef.current?.blur(); // Убираем фокус с инпута
  };

  // функция создания пути для материала
  const createLink = (title, collection) => {
    let link = "";
    switch (collection) {
      case "js":
        link = "/js#" + title;
        break;
      case "react":
        link = "/react/hooks/" + title;
        break;
    }
    return link;
  };

  return (
    <div className={styles.input_group}>
      <input
        ref={inputRef}
        className={styles.search}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Что-то ищите?"
      />

      {results.length === 0 && query && (
        <p className={styles.noResults}>Нет соответствий</p>
      )}

      <span className={styles.bar}></span>

      {console.log(results)}

      {results.length > 0 && (
        <ul className={styles.results}>
          {results.slice(0, 6).map((item) => (
            <li key={item._id} className={styles.resultItem}>
              <Link
                href={createLink(item.title, item.collection)}
                className={styles.link}
                onClick={handleLinkClick}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Search;
