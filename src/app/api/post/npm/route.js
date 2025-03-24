import dbConnect from '../../../../../lib/mongodb';
import mongoose from 'mongoose';

//localhost:3050/post/npm

export async function POST(req) {
  try {
    await dbConnect();
    const collection = mongoose.connection.db.collection('npm');
    await collection.insertOne({
      '1_title': 'npm install',
      '2_memorandum': 'Устанавливает зависимости проекта.',
      '3_description': 'Команда для установки пакетов из package.json.',
      '4_example': `npm install express`,
    });
    return new Response(
      JSON.stringify({ message: 'Статья добавлена в коллекцию npm!' }),
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
