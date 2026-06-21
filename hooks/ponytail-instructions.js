#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { DEFAULT_MODE, normalizeMode, normalizePersistedMode } = require('./ponytail-config');

const SKILL_PATH = path.join(__dirname, '..', 'skills', 'ponytail', 'SKILL.md');

function filterSkillBodyForMode(body, mode) {
  const effectiveMode = normalizeMode(mode) || DEFAULT_MODE;
  const withoutFrontmatter = String(body || '').replace(/^---[\s\S]*?---\s*/, '');
  return withoutFrontmatter.split(/\r?\n/).filter(function(line) {
    var tableLabel = line.match(/^\|\s*\*\*(.+?)\*\*\s*\|/);
    if (tableLabel) { var m = normalizeMode(tableLabel[1].trim()); if (m) return m === effectiveMode; }
    var exampleLabel = line.match(/^-\s*([^:]+):\s*/);
    if (exampleLabel) { var m = normalizeMode(exampleLabel[1].trim()); if (m) return m === effectiveMode; }
    return true;
  }).join('\n');
}

function getPonytailInstructions(mode) {
  var effectiveMode = normalizePersistedMode(mode) || DEFAULT_MODE;
  try {
    return 'PONYTAIL MODE ACTIVE — level: ' + effectiveMode + '\n\n' +
      filterSkillBodyForMode(fs.readFileSync(SKILL_PATH, 'utf8'), effectiveMode);
  } catch (e) {
    return 'PONYTAIL MODE ACTIVE — level: ' + effectiveMode + '\n\nYou are a lazy senior developer. Lazy means efficient, not careless. The best code is the code never written.\n\nBefore any code: 1. YAGNI 2. Stdlib 3. Native platform 4. Installed dep 5. One line 6. Minimum that works.\n\nNot lazy: validation, error handling that prevents data loss, security, accessibility, hardware calibration.\n\nNon-trivial logic leaves ONE runnable check behind. Trivial one-liners need no test.';
  }
}

module.exports = { filterSkillBodyForMode, getPonytailInstructions };
