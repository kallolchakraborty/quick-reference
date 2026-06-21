#!/usr/bin/env node
// ponytail — shared configuration resolver
const fs = require('fs');
const path = require('path');
const os = require('os');

const DEFAULT_MODE = 'full';
const VALID_MODES = ['off', 'lite', 'full', 'ultra', 'review'];
const RUNTIME_MODES = ['off', 'lite', 'full', 'ultra'];

function normalizeMode(mode) {
  if (typeof mode !== 'string') return null;
  const normalized = mode.trim().toLowerCase();
  return RUNTIME_MODES.includes(normalized) ? normalized : null;
}

function normalizePersistedMode(mode) {
  if (typeof mode !== 'string') return null;
  const normalized = mode.trim().toLowerCase();
  return VALID_MODES.includes(normalized) ? normalized : null;
}

function getDefaultMode() {
  const envMode = process.env.PONYTAIL_DEFAULT_MODE;
  if (envMode && VALID_MODES.includes(envMode.toLowerCase())) return envMode.toLowerCase();
  try {
    const configPath = path.join(process.env.XDG_CONFIG_HOME || path.join(os.homedir(), '.config'), 'ponytail', 'config.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    if (config.defaultMode && VALID_MODES.includes(config.defaultMode.toLowerCase())) return config.defaultMode.toLowerCase();
  } catch (e) {}
  return DEFAULT_MODE;
}

module.exports = { DEFAULT_MODE, VALID_MODES, RUNTIME_MODES, getDefaultMode, normalizeMode, normalizePersistedMode };
