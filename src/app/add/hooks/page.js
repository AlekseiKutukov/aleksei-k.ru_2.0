"use client";

import AddArticle from "@/components/Forms/AddArticle/AddArticle";

const hooksFields = [
  { name: "title", label: "Название", type: "text", required: true },
  {
    name: "memorandum",
    label: "Короткое описание",
    type: "textarea",
    required: false,
  },
  { name: "description", label: "Описание", type: "textarea", required: true },
  {
    name: "whatDoesItDo",
    label: "Что делает хук?",
    type: "textarea",
    required: false,
  },
  {
    name: "whenToUse",
    label: "Когда использовать?",
    type: "textarea",
    required: false,
  },
  { name: "example", label: "Пример", type: "textarea", required: false },
  {
    name: "important",
    label: "Важные моменты",
    type: "textarea",
    required: false,
  },
];

const emptyHooksForm = {
  title: "",
  memorandum: "",
  description: "",
  whatDoesItDo: "",
  whenToUse: "",
  example: "",
  important: "",
};

export default function AddHookPage() {
  return (
    <>
      <h1>Добавление нового хука</h1>
      <AddArticle
        fieldsConfig={hooksFields}
        apiUrl="/api/add/hooks"
        successMessage="Статья успешно добавлена!"
        emptyFormState={emptyHooksForm}
      />
    </>
  );
}
