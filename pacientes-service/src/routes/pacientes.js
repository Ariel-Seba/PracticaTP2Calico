const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pacientes ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pacientes WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Paciente no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { nombre, especie, raza, edad, dueno_nombre, dueno_telefono } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO pacientes (nombre, especie, raza, edad, dueno_nombre, dueno_telefono) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
      [nombre, especie, raza, edad, dueno_nombre, dueno_telefono]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { nombre, especie, raza, edad, dueno_nombre, dueno_telefono } = req.body;
  try {
    const result = await pool.query(
      'UPDATE pacientes SET nombre=$1, especie=$2, raza=$3, edad=$4, dueno_nombre=$5, dueno_telefono=$6 WHERE id=$7 RETURNING *',
      [nombre, especie, raza, edad, dueno_nombre, dueno_telefono, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Paciente no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM pacientes WHERE id=$1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Paciente no encontrado' });
    res.json({ message: 'Paciente eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
