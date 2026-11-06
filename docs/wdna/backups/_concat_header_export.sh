#!/bin/bash
set -euo pipefail
OUT="/workspace/docs/wdna/backups/header-producao-theme3-20261028.liquid"
cat \
  "/workspace/docs/wdna/backups/_header_export_part_a.liquid" \
  "/workspace/docs/wdna/backups/_header_export_part_b.liquid" \
  "/workspace/docs/wdna/backups/_header_export_part_c.liquid" \
  > "$OUT"
# Partes são auxiliares de montagem; o arquivo imutável de referência é $OUT
sha256sum "$OUT"
