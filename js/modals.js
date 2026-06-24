(function() {
  'use strict';

  // ---- Templates ----

  const shareHTML = [
    '<div id="share-modal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm p-4 sm:p-10 justify-center items-center" role="dialog" aria-modal="true" aria-label="Share this page">',
    '<div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden">',
    '<div class="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">',
    '<h3 class="font-bold text-slate-900 dark:text-white">Share this page</h3>',
    '<button id="close-share-btn" class="text-xs text-slate-400 border border-slate-200 dark:border-slate-800 px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">ESC</button>',
    '</div>',
    '<div class="p-4 border-b border-slate-200 dark:border-slate-800">',
    '<div class="flex items-center gap-2">',
    '<input id="share-url-input" type="text" readonly class="w-full bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-600 dark:text-slate-400 font-mono">',
    '<button id="copy-share-btn" class="shrink-0 px-3 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-sm font-medium transition-all flex items-center gap-1.5">',
    '<span class="material-symbols-outlined text-sm" aria-hidden="true">content_copy</span> Copy',
    '</button>',
    '</div>',
    '<p id="copy-confirm" class="hidden text-xs text-green-600 dark:text-green-400 mt-1.5">Link copied to clipboard!</p>',
    '</div>',
    '<div class="p-4">',
    '<p class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Share via</p>',
    '<div class="flex flex-wrap gap-3">',
    '<a href="#" data-href="https://twitter.com/intent/tweet?url={url}&text={title}" target="_blank" rel="noopener noreferrer" class="share-link flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-black hover:text-white dark:hover:bg-black transition-all text-slate-600 dark:text-slate-400" aria-label="Share on Twitter/X">',
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>',
    '</a>',
    '<a href="#" data-href="https://www.linkedin.com/sharing/share-offsite/?url={url}" target="_blank" rel="noopener noreferrer" class="share-link flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#0A66C2] hover:text-white dark:hover:bg-[#0A66C2] transition-all text-slate-600 dark:text-slate-400" aria-label="Share on LinkedIn">',
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>',
    '</a>',
    '<a href="#" data-href="https://wa.me/?text={title}%20{url}" target="_blank" rel="noopener noreferrer" class="share-link flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#25D366] hover:text-white dark:hover:bg-[#25D366] transition-all text-slate-600 dark:text-slate-400" aria-label="Share on WhatsApp">',
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>',
    '</a>',
    '<a href="#" data-href="mailto:?subject={title}&body={url}" target="_blank" rel="noopener noreferrer" class="share-link flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 transition-all text-slate-600 dark:text-slate-400" aria-label="Share via Email">',
    '<span class="material-symbols-outlined text-lg" aria-hidden="true">mail</span>',
    '</a>',
    '</div>',
    '</div>',
    '</div>',
    '</div>'
  ].join('\n');

  const searchHTML = [
    '<div id="search-modal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm p-4 sm:p-10 justify-center items-start" role="dialog" aria-modal="true" aria-label="Search documentation">',
    '<div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col overflow-hidden mt-10">',
    '<div class="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-900/50">',
    '<span class="material-symbols-outlined text-slate-400" aria-hidden="true">search</span>',
    '<input id="modal-search-input" type="text" placeholder="Type to search study materials..." aria-label="Search query" class="w-full bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white font-medium placeholder:text-slate-400">',
    '<button id="close-search-btn" class="text-xs text-slate-400 border border-slate-200 dark:border-slate-800 px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">ESC</button>',
    '</div>',
    '<div id="modal-search-results" class="p-4 max-h-[400px] overflow-y-auto flex flex-col gap-3" role="listbox" aria-label="Search results">',
    '</div>',
    '<div class="p-3 bg-slate-50 dark:bg-slate-800/20 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">',
    '<span>↑↓ navigate · enter select · esc close</span>',
    '<span class="hidden sm:inline">filter: <span class="text-brand-400">cat:</span>net · <span class="text-brand-400">tag:</span>security</span>',
    '</div>',
    '</div>',
    '</div>'
  ].join('\n');

  // ---- Injection ----

  document.body.insertAdjacentHTML('beforeend', shareHTML);

  const hasSearch = document.querySelector('.open-search-btn') !== null;
  if (hasSearch) {
    document.body.insertAdjacentHTML('beforeend', searchHTML);
  }

  // ---- Share Modal Logic ----

  document.addEventListener('click', function(e) {
    let btn = e.target.closest('.open-share-btn');
    if (!btn) return;
    let modal = document.getElementById('share-modal');
    let input = document.getElementById('share-url-input');
    let confirm = document.getElementById('copy-confirm');
    if (!modal) return;

    _lastFocusedEl = document.activeElement;

    let url = window.location.href;
    let title = document.title || 'ai bytes';

    if (input) input.value = url;
    if (confirm) confirm.classList.add('hidden');

    let encodedUrl = encodeURIComponent(url);
    let encodedTitle = encodeURIComponent(title);

    document.querySelectorAll('.share-link').forEach(function(link) {
      link.href = (link.getAttribute('data-href') || '')
        .replace('{url}', encodedUrl)
        .replace('{title}', encodedTitle);
    });

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (input) input.focus();
  });

  function closeShareModal() {
    let modal = document.getElementById('share-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    if (_lastFocusedEl) { _lastFocusedEl.focus(); _lastFocusedEl = null; }
  }

  document.addEventListener('click', function(e) {
    if (e.target.id === 'close-share-btn' || e.target.closest('#close-share-btn')) {
      closeShareModal();
    }
  });

  document.addEventListener('click', function(e) {
    let modal = document.getElementById('share-modal');
    if (!modal || modal.classList.contains('hidden')) return;
    if (e.target === modal) {
      closeShareModal();
    }
  });

  document.addEventListener('click', function(e) {
    let copyBtn = e.target.closest('#copy-share-btn');
    if (!copyBtn) return;
    let input = document.getElementById('share-url-input');
    let confirm = document.getElementById('copy-confirm');
    if (!input) return;
    input.select();
    navigator.clipboard.writeText(input.value).then(function() {
      if (confirm) {
        confirm.classList.remove('hidden');
        setTimeout(function() { confirm.classList.add('hidden'); }, 2000);
      }
    });
  });

  document.addEventListener('keydown', function(e) {
    let modal = document.getElementById('share-modal');
    if (!modal || modal.classList.contains('hidden')) return;
    _trapFocus(e, 'share-modal');
    if (e.key === 'Escape') closeShareModal();
  });

  // ---- Search Modal Logic ----

  if (!hasSearch) return;

  const searchIndex = window.__SEARCH_INDEX || [];

  let _selectedIndex = -1;
  let _lastFocusedEl = null;
  let _searchDebounce = null;

  function _getFocusable(el) {
    if (!el) return [];
    let selectors = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.from(el.querySelectorAll(selectors)).filter(function(f) {
      return f.offsetParent !== null;
    });
  }

  function _trapFocus(e, modalId) {
    if (e.key !== 'Tab') return;
    let modal = document.getElementById(modalId);
    if (!modal || modal.classList.contains('hidden')) return;
    let focusable = _getFocusable(modal);
    if (focusable.length === 0) return;
    let first = focusable[0];
    let last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function _applySelection(el) {
    if (!el) return;
    el.classList.add('bg-brand-50', 'dark:bg-brand-500/10', 'border-brand-100', 'dark:border-brand-500/30');
  }

  function _clearSelection(el) {
    if (!el) return;
    el.classList.remove('bg-brand-50', 'dark:bg-brand-500/10', 'border-brand-100', 'dark:border-brand-500/30');
  }

  // ---- Search History (localStorage) ----

  function _getSearchHistory() {
    try { return JSON.parse(localStorage.getItem('__SEARCH_HISTORY')) || []; } catch(e) { return []; }
  }

  function _addSearchHistory(q) {
    if (!q || typeof q !== 'string') return;
    q = q.trim().toLowerCase();
    if (!q || q.length < 2) return;
    try {
      var h = JSON.parse(localStorage.getItem('__SEARCH_HISTORY')) || [];
      h = h.filter(function(s) { return s !== q; });
      h.unshift(q);
      if (h.length > 5) h.length = 5;
      localStorage.setItem('__SEARCH_HISTORY', JSON.stringify(h));
    } catch(e) {}
  }

  function _clearSearchHistory() {
    try { localStorage.removeItem('__SEARCH_HISTORY'); } catch(e) {}
  }

  // ---- Fuzzy Matching Engine ----

  function _levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    if (a.length > b.length) { var t = a; a = b; b = t; }
    var row = Array(a.length + 1);
    for (var i = 0; i <= a.length; i++) row[i] = i;
    for (var j = 1; j <= b.length; j++) {
      var prev = j;
      for (var i = 1; i <= a.length; i++) {
        var val;
        if (b.charAt(j - 1) === a.charAt(i - 1)) {
          val = row[i - 1];
        } else {
          val = Math.min(row[i - 1] + 1, prev + 1, row[i] + 1);
        }
        row[i - 1] = prev;
        prev = val;
      }
      row[a.length] = prev;
    }
    return row[a.length];
  }

  function _fuzzyScore(text, query) {
    if (!text || !query) return 0;
    var t = text.toLowerCase();
    var q = query.toLowerCase();
    if (t === q) return 1;
    if (t.indexOf(q) === 0) return 0.92;
    if (t.indexOf(q) !== -1) return 0.85;
    if (q.length < 3) return 0;
    var words = t.split(/\s+/);
    for (var w = 0; w < words.length; w++) {
      if (words[w].indexOf(q) === 0) return 0.75;
    }
    var maxLen = Math.max(t.length, q.length);
    var searchLen = Math.min(t.length, q.length + 5);
    var bestDist = Infinity;
    for (var start = 0; start <= t.length - searchLen; start++) {
      var dist = _levenshtein(t.substring(start, start + searchLen), q);
      if (dist < bestDist) bestDist = dist;
    }
    if (bestDist === Infinity) return 0;
    var similarity = 1 - (bestDist / Math.max(q.length, searchLen));
    return Math.max(0, Math.min(1, similarity));
  }

  // ---- Did You Mean (bigram Dice coefficient) ----

  function _bigramSet(s) {
    var set = {};
    for (var i = 0; i < s.length - 1; i++) {
      set[s.substring(i, i + 2)] = true;
    }
    return set;
  }

  function _diceSimilarity(a, b) {
    if (!a || !b) return 0;
    var ba = _bigramSet(a);
    var bb = _bigramSet(b);
    var inter = 0;
    for (var k in ba) {
      if (ba.hasOwnProperty(k) && bb.hasOwnProperty(k)) inter++;
    }
    var total = Object.keys(ba).length + Object.keys(bb).length;
    return total === 0 ? 0 : (2 * inter) / total;
  }

  function _didYouMean(query, candidates) {
    if (!query || query.length < 2) return null;
    var q = query.toLowerCase().trim();
    var best = null;
    var bestScore = 0;
    for (var i = 0; i < candidates.length; i++) {
      var title = (candidates[i].title || '').toLowerCase();
      if (title === q || title.indexOf(q) !== -1) continue;
      var score = _diceSimilarity(q, title);
      if (score > bestScore) {
        bestScore = score;
        best = candidates[i].title;
      }
      if (candidates[i].tags) {
        for (var t = 0; t < candidates[i].tags.length; t++) {
          var tagScore = _diceSimilarity(q, (candidates[i].tags[t] || '').toLowerCase());
          if (tagScore > bestScore) {
            bestScore = tagScore;
            best = candidates[i].tags[t];
          }
        }
      }
    }
    return bestScore > 0.35 ? best : null;
  }

  // ---- Query Parsing (category:xyz, tag:xyz) ----

  function _escapeRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function _parseQuery(raw) {
    var filters = {};
    var terms = [];
    if (!raw) return { filters: filters, terms: '' };
    var parts = raw.trim().split(/\s+/);
    for (var i = 0; i < parts.length; i++) {
      var m = parts[i].match(/^(category|cat|tag|section):(.+)$/i);
      if (m) {
        var key = m[1].toLowerCase();
        if (key === 'cat') key = 'category';
        var val = m[2].toLowerCase();
        if (!filters[key]) filters[key] = [];
        filters[key].push(val);
      } else {
        terms.push(parts[i]);
      }
    }
    return { filters: filters, terms: terms.join(' ') };
  }

  function _matchesFilters(item, filters) {
    for (var key in filters) {
      if (!filters.hasOwnProperty(key)) continue;
      var vals = filters[key];
      var field = (key === 'tag' ? (item.tags || []).join(' ') :
                   key === 'section' ? (item.sections || []).join(' ') :
                   (item[key] || '')).toLowerCase();
      for (var v = 0; v < vals.length; v++) {
        if (field.indexOf(vals[v]) === -1) return false;
      }
    }
    return true;
  }

  // ---- Core Scoring ----

  function _scoreItem(item, query) {
    var q = (query || '').toLowerCase().trim();
    if (!q) return 0;
    var titleScore = _fuzzyScore(item.title, q) * 100;
    var catScore = _fuzzyScore(item.category, q) * 50;
    var descScore = _fuzzyScore(item.description || '', q) * 20;
    var bestSectionScore = 0;
    if (item.sections) {
      for (var i = 0; i < item.sections.length; i++) {
        var s = _fuzzyScore(item.sections[i], q) * 25;
        if (s > bestSectionScore) bestSectionScore = s;
      }
    }
    var bestTagScore = 0;
    if (item.tags) {
      for (var j = 0; j < item.tags.length; j++) {
        var t = _fuzzyScore(item.tags[j], q) * 15;
        if (t > bestTagScore) bestTagScore = t;
      }
    }
    var matchedFields = 0;
    if (titleScore > 0) matchedFields++;
    if (catScore > 0) matchedFields++;
    if (descScore > 0) matchedFields++;
    if (bestSectionScore > 0) matchedFields++;
    if (bestTagScore > 0) matchedFields++;
    var bonus = matchedFields >= 3 ? 15 : matchedFields >= 2 ? 5 : 0;
    return titleScore + catScore + descScore + bestSectionScore + bestTagScore + bonus;
  }

  // ---- Context Snippet ----

  function _getContextSnippet(text, query, maxLen) {
    if (!text || !query) return '';
    var idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return '';
    maxLen = maxLen || 140;
    var start = Math.max(0, idx - Math.floor((maxLen - query.length) / 2));
    var end = Math.min(text.length, start + maxLen);
    var snippet = text.substring(start, end);
    if (start > 0) snippet = '…' + snippet;
    if (end < text.length) snippet = snippet + '…';
    return snippet;
  }

  // ---- Highlight ----

  function _highlight(text, query) {
    if (!query || !text) return text || '';
    var q = query.toLowerCase().trim();
    if (!q) return text;
    var re = new RegExp('(' + _escapeRe(q) + ')', 'gi');
    return text.replace(re, '<mark class="bg-brand-100 dark:bg-brand-500/30 text-inherit rounded-sm px-0.5">$1</mark>');
  }

  // ---- Modal Open / Close ----

  function openSearchModal() {
    var modal = document.getElementById('search-modal');
    var input = document.getElementById('modal-search-input');
    if (!modal) return;
    _lastFocusedEl = document.activeElement;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (input) input.value = '';
    if (input) input.focus();
    document.body.style.overflow = 'hidden';
    _selectedIndex = -1;
    renderResults('');
  }

  function closeSearchModal() {
    var modal = document.getElementById('search-modal');
    var input = document.getElementById('modal-search-input');
    var results = document.getElementById('modal-search-results');
    if (!modal) return;
    modal.classList.remove('flex');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    if (input) input.value = '';
    if (results) results.innerHTML = '';
    _selectedIndex = -1;
    if (_lastFocusedEl) { _lastFocusedEl.focus(); _lastFocusedEl = null; }
  }

  // ---- Render ----

  function renderResults(rawQuery) {
    var results = document.getElementById('modal-search-results');
    if (!results) return;

    try {
      var query = (rawQuery || '').trim();
      var q = query.toLowerCase();
      var parsed = _parseQuery(query);
      var searchTerms = parsed.terms;
      var filters = parsed.filters;

      if (!q) {
        renderEmptyState(results);
        return;
      }

      var filtered = searchIndex.filter(function(item) {
        return _matchesFilters(item, filters);
      });

      var scored = [];
      for (var i = 0; i < filtered.length; i++) {
        var item = filtered[i];
        var score = _scoreItem(item, searchTerms);
        if (score > 0 || (filtered.length > 0 && searchTerms.length === 0 && Object.keys(filters).length > 0)) {
          if (score === 0) score = 1;
          scored.push({ item: item, score: Math.round(score) });
        }
      }
      scored.sort(function(a, b) { return b.score - a.score; });
      var topItems = scored.slice(0, 12);

      if (searchTerms.length >= 2 && topItems.length > 0) {
        _addSearchHistory(searchTerms);
      }

      _selectedIndex = -1;

      if (topItems.length === 0) {
        renderNoResults(results, searchTerms, filters, query);
        return;
      }

      var hasFilters = Object.keys(filters).length > 0;
      var html = '';

      if (hasFilters) {
        html += '<div class="text-[10px] font-mono text-slate-400 dark:text-slate-500 px-1 pb-1">Filtered: ' +
          Object.keys(filters).map(function(k) {
            return '<span class="text-brand-500">' + k + ':' + filters[k].join(',') + '</span>';
          }).join(', ') +
          '</div>';
      }

      html += topItems.map(function(scored, idx) {
        var item = scored.item;
        var titleHtml = _highlight(item.title, searchTerms);
        var catHtml = _highlight(item.category, searchTerms);

        var descHtml = '';
        var snippet = _getContextSnippet(item.description || '', searchTerms, 140);
        if (snippet) {
          descHtml = '<p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">' + _highlight(snippet, searchTerms) + '</p>';
        } else if (item.description) {
          var truncated = item.description.length > 120 ? item.description.substring(0, 120) + '…' : item.description;
          descHtml = '<p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">' + truncated + '</p>';
        }

        var sectionsHtml = '';
        if (item.sections && item.sections.length > 0) {
          var matchedSections = [];
          for (var s = 0; s < item.sections.length; s++) {
            if (_fuzzyScore(item.sections[s], searchTerms) > 0.5) {
              matchedSections.push(item.sections[s]);
            }
          }
          if (matchedSections.length === 0) matchedSections = item.sections.slice(0, 2);
          if (matchedSections.length > 0) {
            sectionsHtml = '<div class="flex flex-wrap gap-1.5 mt-2">' +
              matchedSections.map(function(s) {
                return '<span class="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">' + (_highlight(s, searchTerms) || s) + '</span>';
              }).join('') +
              '</div>';
          }
        }

        var tagsHtml = '';
        if (item.tags && item.tags.length > 0 && searchTerms) {
          var matchedTags = [];
          for (var t = 0; t < item.tags.length; t++) {
            if (_fuzzyScore(item.tags[t], searchTerms) > 0.5) {
              matchedTags.push(item.tags[t]);
            }
          }
          if (matchedTags.length > 0) {
            tagsHtml = '<div class="flex flex-wrap gap-1.5 mt-1">' +
              matchedTags.slice(0, 3).map(function(tag) {
                return '<span class="text-[10px] font-mono text-brand-500 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10 px-1.5 py-0.5 rounded">#' + tag + '</span>';
              }).join('') +
              '</div>';
          }
        }

        return [
          '<a href="' + item.url + '" role="option" class="search-result flex flex-col gap-1 p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-brand-50 dark:hover:bg-brand-500/10 border border-slate-100 dark:border-slate-800 hover:border-brand-100 dark:hover:border-brand-500/30 rounded-lg transition-all group" data-index="' + idx + '">',
          '<div class="flex items-center justify-between">',
          '<span class="text-xs font-bold text-brand-500 uppercase tracking-wider">' + catHtml + '</span>',
          '<span class="material-symbols-outlined text-slate-400 group-hover:text-brand-500 transition-transform group-hover:translate-x-1" aria-hidden="true">arrow_forward</span>',
          '</div>',
          '<span class="font-bold text-slate-800 dark:text-slate-200 group-hover:text-brand-500 transition-colors">' + titleHtml + '</span>',
          descHtml,
          sectionsHtml,
          tagsHtml,
          '</a>'
        ].join('');
      }).join('');

      results.innerHTML = html;
    } catch (err) {
      console.error('Search error:', err);
      results.innerHTML = '<div role="status" aria-live="polite" class="p-8 text-center text-red-500 dark:text-red-400 font-mono text-sm">Search encountered an error. Please try again.</div>';
    }
  }

  function renderEmptyState(results) {
    var history = _getSearchHistory();
    var categories = {};
    for (var i = 0; i < searchIndex.length; i++) {
      var cat = searchIndex[i].category;
      if (!categories[cat]) categories[cat] = 0;
      categories[cat]++;
    }
    var catList = Object.keys(categories).sort();

    var html = '';

    if (history.length > 0) {
      html += '<div class="mb-4">';
      html += '<div class="flex items-center justify-between mb-2">';
      html += '<span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Recent</span>';
      html += '<button id="clear-search-history-btn" class="text-[10px] text-slate-400 hover:text-red-500 transition-colors font-mono uppercase tracking-wider">Clear</button>';
      html += '</div>';
      html += '<div class="flex flex-wrap gap-2">';
      for (var h = 0; h < history.length; h++) {
        html += '<button data-history="' + _escapeRe(history[h]) + '" class="search-history-chip text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-brand-500/10 px-2.5 py-1 rounded-lg transition-colors">' + _escapeRe(history[h]) + '</button>';
      }
      html += '</div>';
      html += '</div>';
    }

    html += '<div class="mb-3">';
    html += '<span class="text-xs font-semibold uppercase tracking-wider text-slate-400">Browse by category</span>';
    html += '</div>';
    html += '<div class="flex flex-wrap gap-2">';
    for (var c = 0; c < catList.length; c++) {
      html += '<button data-category="' + _escapeRe(catList[c]) + '" class="category-chip text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-brand-500/10 px-2.5 py-1 rounded-lg transition-colors">' + catList[c] + ' <span class="text-slate-400">(' + categories[catList[c]] + ')</span></button>';
    }
    html += '</div>';

    html += '<div role="status" aria-live="polite" class="pt-4 pb-1 text-center text-xs text-slate-400 font-mono">' + searchIndex.length + ' pages — type to search, or filter by <span class="text-brand-500">cat:</span> <span class="text-brand-500">tag:</span></div>';

    results.innerHTML = html;

    var historyChips = results.querySelectorAll('.search-history-chip');
    for (var hc = 0; hc < historyChips.length; hc++) {
      (function(chip) {
        chip.addEventListener('click', function() {
          var input = document.getElementById('modal-search-input');
          if (input) { input.value = chip.getAttribute('data-history'); renderResults(input.value); input.focus(); }
        });
      })(historyChips[hc]);
    }

    var catChips = results.querySelectorAll('.category-chip');
    for (var cc = 0; cc < catChips.length; cc++) {
      (function(chip) {
        chip.addEventListener('click', function() {
          var input = document.getElementById('modal-search-input');
          if (input) { input.value = 'category:' + chip.getAttribute('data-category'); renderResults(input.value); input.focus(); }
        });
      })(catChips[cc]);
    }

    var clearBtn = document.getElementById('clear-search-history-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        _clearSearchHistory();
        renderResults('');
      });
    }
  }

  function renderNoResults(results, queryTerms, filters, rawQuery) {
    var html = '<div class="p-8 text-center font-mono">';
    html += '<span class="material-symbols-outlined text-3xl text-slate-300 dark:text-slate-600 mb-3" aria-hidden="true">search_off</span>';
    html += '<p class="text-slate-500 dark:text-slate-400 text-sm mb-1">No matches for <span class="text-slate-700 dark:text-slate-200 font-bold">&ldquo;' + _escapeRe(queryTerms) + '&rdquo;</span></p>';
    html += '<p class="text-xs text-slate-400 dark:text-slate-500 mb-4">Try a broader term or check your spelling.</p>';

    if (queryTerms.length >= 2) {
      var suggestion = _didYouMean(queryTerms, searchIndex);
      if (suggestion) {
        html += '<button data-suggestion="' + _escapeRe(suggestion) + '" class="search-suggestion-chip text-sm text-brand-500 hover:text-brand-600 bg-brand-50 dark:bg-brand-500/10 px-3 py-1.5 rounded-lg transition-colors font-medium">Did you mean: ' + _escapeRe(suggestion) + '?</button>';
      }
    }

    html += '</div>';

    if (rawQuery.indexOf(':') !== -1) {
      html += '<div class="px-4 pb-2 text-center">';
      html += '<p class="text-[10px] text-slate-400 font-mono">Filter syntax: <span class="text-brand-500">cat:networking</span> <span class="text-slate-500">or</span> <span class="text-brand-500">tag:security</span></p>';
      html += '</div>';
    }

    results.innerHTML = html;

    var suggestionBtn = results.querySelector('.search-suggestion-chip');
    if (suggestionBtn) {
      suggestionBtn.addEventListener('click', function() {
        var input = document.getElementById('modal-search-input');
        if (input) { input.value = suggestionBtn.getAttribute('data-suggestion'); renderResults(input.value); input.focus(); }
      });
    }
  }

  // ---- Navigation ----

  function _navigateSearch(dir) {
    var links = document.querySelectorAll('#modal-search-results .search-result');
    if (links.length === 0) return;

    if (_selectedIndex >= 0 && links[_selectedIndex]) {
      _clearSelection(links[_selectedIndex]);
    }

    _selectedIndex = (_selectedIndex + dir + links.length) % links.length;

    _applySelection(links[_selectedIndex]);
    links[_selectedIndex].focus();
  }

  // ---- Event Handlers ----

  document.addEventListener('click', function(e) {
    if (e.target.closest('.open-search-btn')) {
      openSearchModal();
    }
  });

  document.addEventListener('click', function(e) {
    if (e.target.id === 'close-search-btn' || e.target.closest('#close-search-btn')) {
      closeSearchModal();
    }
  });

  document.addEventListener('click', function(e) {
    var modal = document.getElementById('search-modal');
    if (!modal || modal.classList.contains('hidden')) return;
    if (e.target === modal) closeSearchModal();
  });

  document.addEventListener('click', function(e) {
    var link = e.target.closest('#modal-search-results a');
    if (link) closeSearchModal();
  });

  document.addEventListener('keydown', function(e) {
    var modal = document.getElementById('search-modal');
    if (!modal || modal.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeSearchModal();
  });

  document.addEventListener('keydown', function(e) {
    var shareModal = document.getElementById('share-modal');
    if (shareModal && !shareModal.classList.contains('hidden')) return;

    var searchModal = document.getElementById('search-modal');
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (searchModal && searchModal.classList.contains('hidden')) {
        openSearchModal();
      } else {
        closeSearchModal();
      }
    }
  });

  document.addEventListener('input', function(e) {
    if (e.target.id !== 'modal-search-input') return;
    var value = e.target.value;
    if (_searchDebounce) clearTimeout(_searchDebounce);
    if (!value || value.trim().length === 0) {
      renderResults(value);
      return;
    }
    _searchDebounce = setTimeout(function() {
      renderResults(value);
    }, 150);
  });

  document.addEventListener('keydown', function(e) {
    var modal = document.getElementById('search-modal');
    if (!modal || modal.classList.contains('hidden')) return;

    _trapFocus(e, 'search-modal');

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      _navigateSearch(1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      _navigateSearch(-1);
    } else if (e.key === 'Enter') {
      var links = document.querySelectorAll('#modal-search-results .search-result');
      if (_selectedIndex >= 0 && links[_selectedIndex]) {
        e.preventDefault();
        window.location.href = links[_selectedIndex].getAttribute('href');
        closeSearchModal();
      }
    }
  });

  document.addEventListener('mouseover', function(e) {
    var result = e.target.closest('.search-result');
    if (!result) return;
    var links = document.querySelectorAll('#modal-search-results .search-result');

    if (_selectedIndex >= 0 && links[_selectedIndex]) {
      _clearSelection(links[_selectedIndex]);
    }

    _selectedIndex = Array.prototype.indexOf.call(links, result);
    _applySelection(result);
  });

  // ---- Readme Modal Logic & Markup ----

  const readmeHTML = [
    '<div id="readme-modal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm p-4 sm:p-10 justify-center items-start" role="dialog" aria-modal="true" aria-label="Documentation">',
    '<div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col overflow-hidden mt-4 max-h-[85vh]">',
    '<div class="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 shadow-sm shrink-0">',
    '<div class="flex items-center gap-2">',
    '<span class="material-symbols-outlined text-brand-500" aria-hidden="true">menu_book</span>',
    '<h3 class="font-bold text-slate-900 dark:text-white">ai bytes Documentation</h3>',
    '</div>',
    '<button id="close-readme-btn" class="text-xs text-slate-400 border border-slate-200 dark:border-slate-800 px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">ESC</button>',
    '</div>',
    '<div id="readme-content" class="p-6 overflow-y-auto min-h-0 text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-sans prose dark:prose-invert max-w-none">',
    '<div class="flex items-center justify-center py-12">',
    '<span class="material-symbols-outlined animate-spin text-brand-500 text-3xl" aria-hidden="true">sync</span>',
    '</div>',
    '</div>',
    '</div>',
    '</div>'
  ].join('\n');

  document.body.insertAdjacentHTML('beforeend', readmeHTML);

  let readmeLoaded = false;

  function openReadmeModal() {
    let modal = document.getElementById('readme-modal');
    if (!modal) return;
    _lastFocusedEl = document.activeElement;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    let closeBtn = document.getElementById('close-readme-btn');
    if (closeBtn) closeBtn.focus();

    if (!readmeLoaded) {
      if (typeof marked === 'undefined') {
        let script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
        script.onload = function() {
          loadAndRenderReadme();
        };
        script.onerror = function() {
          let content = document.getElementById('readme-content');
          if (content) content.innerHTML = '<p class="text-red-500 dark:text-red-400 text-center font-semibold">Failed to load markdown parser library.</p>';
        };
        document.head.appendChild(script);
      } else {
        loadAndRenderReadme();
      }
    }
  }

  function loadAndRenderReadme() {
    fetch('README.md')
      .then(function(res) {
        if (!res.ok) throw new Error('Failed to load README.md');
        return res.text();
      })
      .then(function(text) {
        let html = marked.parse(text);
        let content = document.getElementById('readme-content');
        if (content) {
          content.innerHTML = html;
          // Apply custom styles matching the rich aesthetic
          content.querySelectorAll('h1, h2, h3, h4').forEach(function(h) {
            h.classList.add('font-bold', 'text-slate-900', 'dark:text-white', 'mt-6', 'mb-3', 'tracking-tight');
            if (h.tagName === 'H1') h.classList.add('text-2xl', 'border-b', 'border-slate-200', 'dark:border-slate-800', 'pb-2');
            if (h.tagName === 'H2') h.classList.add('text-xl', 'border-b', 'border-slate-200', 'dark:border-slate-800', 'pb-1.5');
            if (h.tagName === 'H3') h.classList.add('text-base');
            if (h.tagName === 'H4') h.classList.add('text-sm');
          });
          content.querySelectorAll('table').forEach(function(t) {
            t.className = 'w-full text-left border-collapse border border-slate-200 dark:border-slate-800 my-4 text-xs';
          });
          content.querySelectorAll('th').forEach(function(th) {
            th.className = 'bg-slate-50 dark:bg-slate-800/40 p-2.5 font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800';
          });
          content.querySelectorAll('td').forEach(function(td) {
            td.className = 'p-2.5 border-b border-slate-200 dark:border-slate-800';
          });
          content.querySelectorAll('a').forEach(function(a) {
            a.className = 'text-brand-500 hover:text-brand-600 transition-colors font-semibold underline';
          });
          content.querySelectorAll('code').forEach(function(c) {
            if (!c.parentNode || c.parentNode.tagName !== 'PRE') {
              c.className = 'bg-slate-100 dark:bg-slate-800 text-brand-500 dark:text-orange-400 px-1 py-0.5 rounded font-mono text-xs';
            }
          });
          content.querySelectorAll('pre').forEach(function(pre) {
            pre.className = 'bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-850 p-4 rounded-xl font-mono text-xs overflow-x-auto my-4 text-slate-800 dark:text-slate-200';
          });
          if (typeof Prism !== 'undefined') {
            Prism.highlightAllUnder(content);
          }
          readmeLoaded = true;
        }
      })
      .catch(function(err) {
        console.error(err);
        let content = document.getElementById('readme-content');
        if (content) {
          content.innerHTML = '<p class="text-red-500 dark:text-red-400 text-center font-semibold">Failed to load documentation content.</p>';
        }
      });
  }

  function closeReadmeModal() {
    let modal = document.getElementById('readme-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
    if (_lastFocusedEl) { _lastFocusedEl.focus(); _lastFocusedEl = null; }
  }

  document.addEventListener('click', function(e) {
    if (e.target.id === 'close-readme-btn' || e.target.closest('#close-readme-btn')) {
      closeReadmeModal();
    }
  });

  document.addEventListener('click', function(e) {
    let modal = document.getElementById('readme-modal');
    if (!modal || modal.classList.contains('hidden')) return;
    if (e.target === modal) {
      closeReadmeModal();
    }
  });

  document.addEventListener('keydown', function(e) {
    let modal = document.getElementById('readme-modal');
    if (!modal || modal.classList.contains('hidden')) return;
    _trapFocus(e, 'readme-modal');
    if (e.key === 'Escape') closeReadmeModal();
  });

  // ---- Dynamic SVG Logo Inliner & Clock Animator ----
  function initLogoInliner() {
    let logoImgs = document.querySelectorAll('img.logo-circular-spin');
    if (logoImgs.length === 0) return;

    let svgCache = null;

    function inlineSVG(imgEl) {
      if (svgCache) {
        replaceImgWithSVG(imgEl, svgCache.cloneNode(true));
        return;
      }

      fetch('assets/logo.svg')
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch SVG');
          return res.text();
        })
        .then(text => {
          let parser = new DOMParser();
          let doc = parser.parseFromString(text, 'image/svg+xml');
          let svg = doc.querySelector('svg');
          if (!svg) return;
          svgCache = svg;
          replaceImgWithSVG(imgEl, svg.cloneNode(true));
        })
        .catch(err => console.error('Error inlining logo SVG:', err));
    }

    function replaceImgWithSVG(imgEl, svgEl) {
      if (imgEl.className) svgEl.setAttribute('class', imgEl.className);
      if (imgEl.getAttribute('style')) svgEl.setAttribute('style', imgEl.getAttribute('style'));
      if (imgEl.id) svgEl.id = imgEl.id;
      
      let alt = imgEl.getAttribute('alt');
      if (alt) {
        svgEl.setAttribute('role', 'img');
        svgEl.setAttribute('aria-label', alt);
      }

      if (imgEl.parentNode) {
        imgEl.parentNode.replaceChild(svgEl, imgEl);
      }
    }

    logoImgs.forEach(inlineSVG);
  }

  if (document.readyState !== 'loading') {
    initLogoInliner();
  } else {
    document.addEventListener('DOMContentLoaded', initLogoInliner);
  }
})();
