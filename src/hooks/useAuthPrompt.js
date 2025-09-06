import { useState, useCallback } from "react";

//кастомный хук, запрашивающий пароль который равен текущий дате
export function useAuthPrompt() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticate = useCallback(() => {
    const correctPassword = new Date().getDate();
    const userPassword = prompt("Введите пароль:");
    if (userPassword !== null && parseInt(userPassword) === correctPassword) {
      setIsAuthenticated(true);
      return true;
    }
    alert("Неверный пароль.");
    setIsAuthenticated(false);
    return false;
  }, []);

  return { isAuthenticated, authenticate };
}
