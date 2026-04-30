#!/bin/bash
# Reads hook JSON from stdin, scans changed Markdown for AI vocab from Lorin's Copy Style catalog.
# Reports hits with line numbers. Exits non-zero if any found.

file=$(python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_input',{}).get('file_path') or d.get('tool_response',{}).get('filePath') or '')" 2>/dev/null)

case "$file" in
  *.md) ;;
  *) exit 0 ;;
esac

# Skip excluded paths.
case "$file" in
  */node_modules/*) exit 0 ;;
  */.next/*) exit 0 ;;
  */docs/archive/*) exit 0 ;;
esac

[ -f "$file" ] || exit 0

# Strip fenced code blocks and inline code spans before scanning.
# Preserves line numbers by replacing stripped content with blank lines / placeholders.
stripped=$(FILE="$file" python3 <<'PY'
import os, re, sys
text = open(os.environ["FILE"]).read()
def blank_lines(m):
    return '\n' * m.group(0).count('\n')
# Remove fenced code blocks, preserving newlines for line-number fidelity
text = re.sub(r'```.*?```', blank_lines, text, flags=re.DOTALL)
# Remove inline code spans
text = re.sub(r'`[^`\n]+`', '', text)
sys.stdout.write(text)
PY
)

# Banned vocab from global Copy Style catalog. Whole-word, case-insensitive.
words=(
  'transform' 'unlock' 'dive in' 'level up' 'journey' 'elevate' 'seamless'
  'delve' 'tapestry' 'leverage' 'robust' 'harness' 'realm' 'paradigm'
  'cutting-edge' 'revolutionize' 'intricate' 'showcase' 'crucial' 'pivotal'
  'meticulously' 'vibrant' 'underscore' 'synergy' 'innovative' 'game-changer'
  'foster' 'holistic' 'empower' 'streamline' 'frictionless' 'scalable'
  'breakthrough' 'supercharge' 'future-proof'
)

# Build a single case-insensitive whole-word regex.
regex=$(printf '\\b%s\\b|' "${words[@]}")
regex="${regex%|}"

hits=$(echo "$stripped" | grep -inE "$regex" 2>/dev/null)
if [ -n "$hits" ]; then
  echo "Voice catalog hits in $file (warning, not blocking):" >&2
  echo "$hits" >&2
  exit 1
fi
exit 0
