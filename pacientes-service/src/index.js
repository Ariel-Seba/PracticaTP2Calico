require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3001;

const pacientesRouter = require('./routes/pacientes');
app.use('/pacientes', pacientesRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'pacientes-service' });
});

app.listen(PORT, () => {
  console.log(`pacientes-service corriendo en puerto ${PORT}`);
});
