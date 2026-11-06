#!/usr/bin/env bash
# Copia funcionalidades SDA do repositório Git para a pasta do tema novo (export local ou clone WDNA).
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Uso: $0 /caminho/para/tema-novo" >&2
  exit 1
fi

DEST="$1"
ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
MANIFEST="$ROOT/docs/wdna/pacote-sda/MANIFEST.txt"

if [[ ! -d "$DEST" ]]; then
  echo "Destino não existe: $DEST" >&2
  exit 1
fi

if [[ ! -f "$MANIFEST" ]]; then
  echo "MANIFEST não encontrado: $MANIFEST" >&2
  exit 1
fi

count=0
missing=0
while IFS= read -r line || [[ -n "$line" ]]; do
  line="${line%%#*}"
  line="$(echo "$line" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
  [[ -z "$line" ]] && continue
  src="$ROOT/$line"
  dst="$DEST/$line"
  if [[ ! -f "$src" ]]; then
    echo "AVISO: ausente no repo — $line" >&2
    missing=$((missing + 1))
    continue
  fi
  mkdir -p "$(dirname "$dst")"
  cp -a "$src" "$dst"
  echo "OK $line"
  count=$((count + 1))
done < "$MANIFEST"

echo "---"
echo "Copiados: $count | Ausentes no repo: $missing | Destino: $DEST"
echo "Próximo: revisar header.liquid (header-v2?) e templates; checklist em docs/wdna/MIGRACAO-TEMA-NOVO.md"
