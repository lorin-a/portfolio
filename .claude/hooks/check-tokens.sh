#!/bin/bash
# Reads hook JSON from stdin, greps the changed CSS file for deprecated V1 tokens.
# Exits non-zero with violations listed if any are found.

file=$(python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_input',{}).get('file_path') or d.get('tool_response',{}).get('filePath') or '')" 2>/dev/null)

# Only operate on CSS files; silently no-op otherwise.
case "$file" in
  *.css|*.module.css) ;;
  *) exit 0 ;;
esac

# globals.css owns V1→V2 aliases during migration; skip it.
case "$file" in
  */app/globals.css) exit 0 ;;
esac

[ -f "$file" ] || exit 0

# Deprecated V1 tokens. Whole-token match where possible.
patterns=(
  '--olive-'
  '--lavender-'
  '--sky-'
  '--adobe-'
  '--rose-'
  '--hero-'
  '--color-green-'
  '--color-gold'
  '--color-bg'
  '--color-text'
  '--color-border'
  '--font-sharp'
  '--ease-default'
  '--ease-pulse'
  '--ease-out-expo'
  '--ease-out-quart'
  '--transition-gentle'
  '--transition-smooth'
)

regex=$(IFS='|'; echo "${patterns[*]}")

hits=$(grep -nE -e "$regex" "$file" 2>/dev/null)
if [ -n "$hits" ]; then
  echo "Deprecated V1 tokens in $file:" >&2
  echo "$hits" >&2
  exit 2
fi
exit 0
