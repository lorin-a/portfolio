#!/bin/bash
# Reads hook JSON from stdin, runs npm run lint scoped to the changed component file.
# Surfaces failures (exit 2). Silent on success.

file=$(python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_input',{}).get('file_path') or d.get('tool_response',{}).get('filePath') or '')" 2>/dev/null)

# Only operate on component/app source files.
case "$file" in
  */components/*.js|*/components/*.jsx|*/components/*.tsx) ;;
  */app/*.js|*/app/*.jsx|*/app/*.tsx) ;;
  *) exit 0 ;;
esac

[ -f "$file" ] || exit 0

# Use eslint directly on just this file — faster than full repo lint.
cd "$(git -C "$(dirname "$file")" rev-parse --show-toplevel 2>/dev/null)" || exit 0

output=$(npx --no-install eslint "$file" 2>&1)
status=$?

if [ $status -ne 0 ]; then
  echo "ESLint failures in $file:" >&2
  echo "$output" >&2
  exit 2
fi
exit 0
