const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
// Routes
const userRoute = require('./routes/user');
const deviceRoute = require('./routes/device');

const {connectDB} = require('./database/config');

dotenv.config();
const app = express();

connectDB();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8001;

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'endpoint working',
  });
});

app.use('/user', userRoute);
app.use('/devices', deviceRoute);

app.listen(PORT, () => console.log(`app is listening on the port ${PORT}`));
