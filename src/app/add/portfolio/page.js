"use client";

import AddArticleForm from "../../../components/Forms/AddArticle/AddArticle";

const portfolioFields = [
  { name: "title", label: "Название", type: "text", required: true },
  {
    name: "description",
    label: "Описание проекта",
    type: "textarea",
    required: true,
  },
  {
    name: "technologyStack",
    label: "Использованые технологии:",
    type: "textarea",
    required: true,
  },
  { name: "skrin", label: "Скриншот", type: "textarea", required: true },
];

const emptyPortfolioForm = {
  title: "",
  description: "",
  technologyStack: "",
  skrin: "",
};

export default function AddPortfolioPage() {
  return (
    <>
      <h1>Добавить работу в портфолио</h1>
      <AddArticleForm
        fieldsConfig={portfolioFields}
        apiUrl="/api/add/portfolio"
        successMessage="Статья успешно добавлена!"
        emptyFormState={emptyPortfolioForm}
      />
    </>
  );
}
