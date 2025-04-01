import dbConnect from '../../../../../lib/mongodb';

export async function POST(req) {
  try {
    await dbConnect(); // Подключаемся к базе данных
    const data = await req.json(); // Получаем данные из формы

    const mongoose = require('mongoose');
    const collection = mongoose.connection.db.collection('js');

    await collection.insertOne({
      '1_myId': data['1_myId'],
      '2_title': data['2_title'],
      '3_description': data['3_description'],
      '4_exampleCode': data['4_exampleCode'],
    });

    return new Response(JSON.stringify({ message: 'Статья добавлена' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Ошибка сервера' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
