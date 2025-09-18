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
    label: "Использованые технологии (через запятую)",
    type: "text",
    required: true,
  },
  {
    name: "linkGit",
    label: "Ссылка на репозитарий",
    type: "text",
    required: false,
  },
  {
    name: "linkSite",
    label: "Демонстрация (ссылка на сайт)",
    type: "text",
    required: false,
  },
  {
    name: "logikJob",
    label: "Логика работы (через |)",
    type: "textarea",
    required: true,
  },
];

const emptyPortfolioForm = {
  title: "",
  description: "",
  technologyStack: "",
  skrin: "",
  linkGit: "",
  linkSite: "",
  logikJob: "",
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
        hasImageUpload={true}
      />
    </>
  );
}
