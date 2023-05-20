import express from 'express';
import morgan from 'morgan';

const app = express();

// setting up the app
app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
  res.send('server is running');
});
import routes from './routes';
app.use('/api', routes);

export default app;