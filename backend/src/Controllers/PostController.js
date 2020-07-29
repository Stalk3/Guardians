const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection('posts').count();

    const posts = await connection('posts')
    .join('user', 'user.id', '=', 'posts.user_id')
    .limit(5)
    .offset((page - 1) * 5)
    .select([
      'posts.*',
      'user.name',
      'user.email',
      'user.whatsapp',
      'user.localidade',
      'user.uf'
    ]);

    response.header('X-Total-Count',count['count(*)']);
    return response.json(posts);
  },
  async create(request, response) {
    const { post } = request.body;
    const user_id = request.headers.authorization;
    
    const [id] = await connection('posts').insert({
      post,
      user_id,
    });

    return response.json({ id })
    
  },
  async delete(request, response) {
    const { id } = request.params;
    const user_id = request.headers.authorization;

    const post = await connection('posts')
    .where('id', id)
    .select('user_id')
    .first();

    if (post.user_id != user_id) {
      return response.status(401).json({ error: 'Operation not Permitted.' });
    }
    await connection('posts').where('id', id).delete(); 

    return response.status(204).send();
  }
}