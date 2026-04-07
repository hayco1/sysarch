import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 4000;
const SECRET = 'change-this-secret';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'db.json');
const DIST_DIR = path.join(__dirname, 'dist');
const DIST_INDEX = path.join(DIST_DIR, 'index.html');

const seedUsers = [];

app.use(cors());
app.use(express.json());

function loadStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) {
    const initialData = { users: seedUsers, residents: [], programs: [], logs: [], backups: [] };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }

  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return {
      users: Array.isArray(parsed.users) ? parsed.users : seedUsers,
      residents: Array.isArray(parsed.residents) ? parsed.residents : [],
      programs: Array.isArray(parsed.programs) ? parsed.programs : [],
      logs: Array.isArray(parsed.logs) ? parsed.logs : [],
      backups: Array.isArray(parsed.backups) ? parsed.backups : [],
    };
  } catch {
    const fallbackData = { users: seedUsers, residents: [], programs: [], logs: [], backups: [] };
    fs.writeFileSync(DATA_FILE, JSON.stringify(fallbackData, null, 2));
    return fallbackData;
  }
}

function saveStore() {
  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify({ users, residents, programs, logs, backups }, null, 2)
  );
}

const store = loadStore();
let users = store.users;
let residents = [];
let programs = [];
let logs = [];
let backups = [];

residents = store.residents;
programs = store.programs;
logs = store.logs;
backups = store.backups;

function log(action, userId = '', details = '') {
  logs.push({ id: uuidv4(), action, userId, details, timestamp: new Date().toISOString() });
  saveStore();
}

function cleanText(value) {
  return (value || "").toString().trim();
}

function toNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeResidentInput(body = {}, user = null) {
  return {
    userId: cleanText(body.userId) || user?.id || '',
    name: cleanText(body.name),
    email: cleanText(body.email).toLowerCase(),
    contactNumber: cleanText(body.contactNumber),
    address: cleanText(body.address),
    household: cleanText(body.household),
    membersCount: toNumber(body.membersCount),
    age: toNumber(body.age),
    birthDate: cleanText(body.birthDate),
    gender: cleanText(body.gender),
    civilStatus: cleanText(body.civilStatus),
    occupation: cleanText(body.occupation),
    is_pwd: Boolean(body.is_pwd),
    citizenship: cleanText(body.citizenship),
    notes: cleanText(body.notes),
    status: cleanText(body.status) || 'Pending',
  };
}

app.post('/api/register', async (req, res) => {
  try {
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
    saveStore();
    return res.json({
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
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Registration failed' });
  }
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

app.get('/api/residents/me', authenticate, (req, res) => {
  const resident = residents.find(r => r.userId === req.user.id) || null;
  res.json(resident);
});

app.post('/api/residents', authenticate, (req, res) => {
  const now = new Date().toISOString();
  const r = { id: uuidv4(), ...normalizeResidentInput(req.body), createdAt: now, updatedAt: now };
  residents.push(r);
  log('create_resident', req.user.id);
  saveStore();
  res.json(r);
});

app.post('/api/residents/me', authenticate, (req, res) => {
  const now = new Date().toISOString();
  const normalized = normalizeResidentInput(req.body, req.user);
  const idx = residents.findIndex(r => r.userId === req.user.id);

  if (idx === -1) {
    const resident = { id: uuidv4(), ...normalized, createdAt: now, updatedAt: now };
    residents.push(resident);
    log('create_resident_self', req.user.id);
    saveStore();
    return res.json(resident);
  }

  residents[idx] = {
    ...residents[idx],
    ...normalized,
    updatedAt: now,
  };
  log('update_resident_self', req.user.id);
  saveStore();
  res.json(residents[idx]);
});

app.put('/api/residents/:id', authenticate, (req, res) => {
  const idx = residents.findIndex(r => r.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  residents[idx] = { ...residents[idx], ...normalizeResidentInput(req.body), updatedAt: new Date().toISOString() };
  log('update_resident', req.user.id);
  saveStore();
  res.json(residents[idx]);
});

app.delete('/api/residents/:id', authenticate, (req, res) => {
  residents = residents.filter(r => r.id !== req.params.id);
  log('delete_resident', req.user.id);
  saveStore();
  res.json({ success: true });
});

app.get('/api/programs', authenticate, (req, res) => {
  res.json(programs);
});

app.post('/api/programs', authenticate, (req, res) => {
  const p = { id: uuidv4(), ...req.body };
  programs.push(p);
  log('create_program', req.user.id);
  saveStore();
  res.json(p);
});

app.put('/api/programs/:id', authenticate, (req, res) => {
  const idx = programs.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  programs[idx] = { ...programs[idx], ...req.body };
  log('update_program', req.user.id);
  saveStore();
  res.json(programs[idx]);
});

app.delete('/api/programs/:id', authenticate, (req, res) => {
  programs = programs.filter(p => p.id !== req.params.id);
  log('delete_program', req.user.id);
  saveStore();
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
  saveStore();
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
  saveStore();
  res.json({ success: true });
});

if (fs.existsSync(DIST_DIR) && fs.existsSync(DIST_INDEX)) {
  app.use(express.static(DIST_DIR));

  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(DIST_INDEX);
  });
}

app.use((err, req, res, next) => {
  console.error('Unhandled API error:', err);
  if (res.headersSent) return next(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log('API listening on', PORT);
  console.log('Registered users:', users.map(u => ({ username: u.username, role: u.role })));
});
