import dbConnect from '../../../../../lib/mongodb';
import mongoose from 'mongoose';

//http://localhost:3050/api/add/react

export async function GET(req) {
  try {
    await dbConnect();
    const collection = mongoose.connection.db.collection('react');
    await collection.insertOne({
      '1_title': 'useContext',
      '2_memorandum': 'Позволяет передать данные минуя пропсы.',
      '3_description':
        'Этот хук позволяет сохранять переменную или объект, и использовать ее между несколькими компонентами. Под самим же контекстом, понимают эту сохраненную величину.',
      '4_example': `Этот хук позволяет сохранять переменную или объект, и использовать ее между несколькими компонентами. Под самим же контекстом, понимают эту сохраненную величину.`,
    });
    return new Response(
      JSON.stringify({ message: 'Данные добавлены в MongoDB!' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Ошибка подключения', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
