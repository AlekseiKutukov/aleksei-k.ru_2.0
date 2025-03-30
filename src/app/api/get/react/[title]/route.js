import dbConnect from '../../../../../../lib/mongodb';
import mongoose from 'mongoose';

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const collection = mongoose.connection.db.collection('react');
    const article = await collection.findOne({
      '1_title': { $regex: new RegExp(`^${params.title}$`, 'i') },
    });
    if (!article) {
      return new Response(JSON.stringify({ error: 'Статья не найдена' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify(article), {
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
