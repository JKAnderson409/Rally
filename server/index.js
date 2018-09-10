const express = require('express');
const graphqlHTTP = require('express-graphql');
const port = process.env.PORT || 8080;

const app = express();
app.use(express.static(__dirname + '/../client/dist'));

const root = resolvers;
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

//Page refresh handler
app.get( '/*', ( req, res ) => res.redirect('/') );

models.sequelize.sync()
  .then(() => {
    app.listen( port, () => console.log( 'listening on port: ', port ));
  })
  .catch(err => { console.error( err ); });
