import dbConnect from '../../../../../lib/mongodb';

export async function POST(req) {
  try {
    await dbConnect(); // Подключаемся к базе данных
    const data = await req.json(); // Получаем данные из формы

    const mongoose = require('mongoose');
    const collection = mongoose.connection.db.collection('react'); // Коллекция 'react'

    await collection.insertOne({
      '1_title': data['1_title'],
      '2_memorandum': data['2_memorandum'],
      '3_description': data['3_description'],
      '4_whatDoesItDo': data['4_whatDoesItDo'],
      '5_whenToUse': data['5_whenToUse'],
      '6_example': data['6_example'],
      '7_important': data['7_important'],
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
