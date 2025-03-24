import dbConnect from '../../../../lib/mongodb';
import mongoose from 'mongoose';

export async function GET(req) {
  try {
    await dbConnect();
    const collection = mongoose.connection.db.collection('npm');
    await collection.insertOne({
      name: 'Алексей',
      email: 'aleksei@example.com',
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
