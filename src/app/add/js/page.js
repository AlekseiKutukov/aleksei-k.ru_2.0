"use client";

import AddArticle from "@/components/Forms/AddArticle/AddArticle";

const jsFields = [
  {
    name: "myId",
    label: "Введи ID, по нему идет сортировка",
    type: "number",
    required: true,
  },
  { name: "title", label: "Заголовок", type: "text", required: true },
  { name: "description", label: "Описание", type: "textarea", required: true },
  {
    name: "exampleCode",
    label: "Пример кода",
    type: "textarea",
    required: false,
  },
];

const emptyJsForm = {
  myId: "",
  title: "",
  description: "",
  exampleCode: "",
};

export default function AddJsPage() {
  return (
    <>
      <h1>Добавление нового о JS</h1>
      <AddArticle
        fieldsConfig={jsFields}
        apiUrl="/api/add/js"
        successMessage="Статья успешно добавлена!"
        emptyFormState={emptyJsForm}
      />
    </>
  );
}
