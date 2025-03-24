import dbConnect from '../../../../lib/mongodb';
import mongoose from 'mongoose';

//http://localhost:3050/api/npm

export async function GET(req) {
  try {
    await dbConnect();
    const collection = mongoose.connection.db.collection('npm');
    await collection.insertOne({
      '1_title': 'query-string',
      '2_description': '(Router) конвертирует строку запроса в объект js',
      '3_example': `const parsed = queryString.parse(location.search);
console.log(parsed);
//=> {foo: 'bar'}`,
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
