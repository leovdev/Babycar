const Sequelize = require('sequelize');
const UserModel = require('../models/users')
const BlogModel = require('../models/blog')
const TagModel = require('../models/tag')
const sequelize = new Sequelize('postgres://nodero:nodero@localhost:5432/pruebanode', {
  // ...
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Conectado a la base de datos');
  })
  .catch(err => {
    console.error('No se pudo realizar la conexión', err);
  });

const User = UserModel(sequelize, Sequelize)
const BlogTag = sequelize.define('blog_tag', {})
const Blog = BlogModel(sequelize, Sequelize)
const Tag = TagModel(sequelize, Sequelize)

Blog.belongsToMany(Tag, { through: BlogTag, unique: false })
Tag.belongsToMany(Blog, { through: BlogTag, unique: false })
Blog.belongsTo(User);


sequelize.sync({ force: false })
  .then(() => {
    console.log(`Base de datos y tabla creada`)
  })

  module.exports={User}
