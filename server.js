import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 4000;
const SECRET = 'change-this-secret';

app.use(cors());
app.use(express.json());

// In-memory DB
// Seed demo users (password: 123456)
let users = [
  { id: uuidv4(), username: "John Smith", email: "john@example.com", password: bcrypt.hashSync("123456", 10), role: "resident" },
  { id: uuidv4(), username: "Jane Staff", email: "jane@example.com", password: bcrypt.hashSync("123456", 10), role: "staff" },
  { id: uuidv4(), username: "Admin Secretary", email: "admin@example.com", password: bcrypt.hashSync("123456", 10), role: "secretary" },
];
let residents = [];
let programs = [];
let logs = [];
let backups = [];

function log(action, userId = '', details = '') {
  logs.push({ id: uuidv4(), action, userId, details, timestamp: new Date().toISOString() });
}

function cleanText(value) {
  return (value || "").toString().trim();
}

app.post('/api/register', async (req, res) => {
  const username = cleanText(req.body.username);
  const firstName = cleanText(req.body.firstName);
  const middleName = cleanText(req.body.middleName);
  const lastName = cleanText(req.body.lastName);
  const email = cleanText(req.body.email).toLowerCase();
  const contactNumber = cleanText(req.body.contactNumber);
  const address = cleanText(req.body.address);
  const password = cleanText(req.body.password);
  const role = cleanText(req.body.role).toLowerCase();

  if (!firstName || !lastName || !email || !password || !username) {
    return res.status(400).json({ error: 'Missing required registration fields' });
  }
  if (!['staff', 'secretary', 'resident'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }
  if (users.find(u => (u.username || "").toString().trim().toLowerCase() === username.toLowerCase())) {
    return res.status(400).json({ error: 'Username exists' });
  }
  if (users.find(u => (u.email || "").toString().trim().toLowerCase() === email)) {
    return res.status(400).json({ error: 'Email exists' });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = {
    id: uuidv4(),
    username,
    firstName,
    middleName,
    lastName,
    email,
    contactNumber,
    address,
    password: hash,
    role,
  };
  users.push(user);
  log(`register (${user.username})`, user.id);
  res.json({
    success: true,
    user: {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      email: user.email,
      contactNumber: user.contactNumber,
      address: user.address,
      role: user.role,
    },
  });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', req.body);
  const name = (username || "").toString().trim().toLowerCase();
  const user = users.find(u => (u.username || "").toString().trim().toLowerCase() === name || (u.email || "").toString().trim().toLowerCase() === name);
  if (!user) return res.status(400).json({ error: 'User not found' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ error: 'Wrong password' });
  const token = jwt.sign({ id: user.id, role: user.role, username: user.username, email: user.email }, SECRET, { expiresIn: '1h' });
  log(`login (${user.username} - ${user.role})`, user.id);
  res.json({ token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
});

function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Unauthorized' });
  const token = auth.split(' ')[1];
  try {
    const data = jwt.verify(token, SECRET);
    // @ts-ignore
    req.user = data;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

app.get('/api/residents', authenticate, (req, res) => {
  res.json(residents);
});

app.post('/api/residents', authenticate, (req, res) => {
  const r = { id: uuidv4(), ...req.body };
  residents.push(r);
  log('create_resident', req.user.id);
  res.json(r);
});

app.put('/api/residents/:id', authenticate, (req, res) => {
  const idx = residents.findIndex(r => r.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  residents[idx] = { ...residents[idx], ...req.body };
  log('update_resident', req.user.id);
  res.json(residents[idx]);
});

app.delete('/api/residents/:id', authenticate, (req, res) => {
  residents = residents.filter(r => r.id !== req.params.id);
  log('delete_resident', req.user.id);
  res.json({ success: true });
});

app.get('/api/programs', authenticate, (req, res) => {
  res.json(programs);
});

app.post('/api/programs', authenticate, (req, res) => {
  const p = { id: uuidv4(), ...req.body };
  programs.push(p);
  log('create_program', req.user.id);
  res.json(p);
});

app.put('/api/programs/:id', authenticate, (req, res) => {
  const idx = programs.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  programs[idx] = { ...programs[idx], ...req.body };
  log('update_program', req.user.id);
  res.json(programs[idx]);
});

app.delete('/api/programs/:id', authenticate, (req, res) => {
  programs = programs.filter(p => p.id !== req.params.id);
  log('delete_program', req.user.id);
  res.json({ success: true });
});

app.get('/api/beneficiaries', authenticate, (req, res) => {
  // naive: all residents with age>=60 or is_pwd
  const filtered = residents.filter(r => r.age >= 60 || r.is_pwd);
  res.json(filtered);
});

app.get('/api/logs', authenticate, (req, res) => {
  res.json(logs);
});

// Backup export and restore
app.get('/api/backup', authenticate, (req, res) => {
  const payload = { residents, programs, users, logs, timestamp: new Date().toISOString() };
  backups.push({ id: uuidv4(), data: payload, timestamp: new Date().toISOString() });
  log('backup_export', req.user.id);
  res.json(payload);
});

app.post('/api/restore', authenticate, (req, res) => {
  const { data } = req.body;
  if (!data) return res.status(400).json({ error: 'No data provided' });
  residents = data.residents || [];
  programs = data.programs || [];
  users = data.users || users;
  logs = data.logs || logs;
  log('backup_restore', req.user.id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log('API listening on', PORT);
  console.log('Seeded users:', users.map(u => ({ username: u.username, role: u.role })));
});
