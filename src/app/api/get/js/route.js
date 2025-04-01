import dbConnect from '../../../../../lib/mongodb';
import mongoose from 'mongoose';

export async function GET(req) {
  try {
    await dbConnect();

    // Подключаемся к коллекции 'js'
    const collection = mongoose.connection.db.collection('js');

    // Получаем все записи из коллекции
    const articles = await collection.find({}).toArray();

    if (!articles || articles.length === 0) {
      return new Response(JSON.stringify({ error: 'Записи не найдены' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(articles), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Ошибка получения данных',
        details: error.message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
