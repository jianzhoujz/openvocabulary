#!/usr/bin/env bash
# 从 _src.psv 生成 TSV（Anki/Excel 导入）与 Markdown（阅读/打印）两种格式。
set -euo pipefail
cd "$(dirname "$0")/.."

gen_tsv () {  # $1 = 源文件, $2 = 输出
  sed 's/|/\t/g' "$1" > "$2"
}

gen_md () {   # $1 = 源文件, $2 = 输出, $3 = 标题, $4 = 表头, $5 = 分区名映射文件
  awk -F'|' -v title="$3" -v header="$4" -v mapfile="$5" '
    BEGIN {
      while ((getline line < mapfile) > 0) {
        split(line, a, "=")
        name[a[1]] = a[2]
      }
      split(header, h, ",")
      ncol = length(h)
      print "# " title
      print ""
      print "> 由 `_src.psv` 自动生成，请勿直接编辑本文件。修改源文件后运行 `tools/build.sh`。"
      print ""
    }
    NR == 1 { next }
    NF == 0 { next }
    {
      if ($1 != cursec) {
        cursec = $1
        curtheme = ""
        label = (cursec in name) ? name[cursec] : cursec
        print ""
        print "## " cursec " · " label
        n[cursec] = 0
      }
      if ($2 != curtheme) {
        curtheme = $2
        print ""
        print "### " curtheme
        print ""
        row = "|"
        sep = "|"
        for (i = 1; i <= ncol; i++) { row = row " " h[i] " |"; sep = sep "---|" }
        print row
        print sep
      }
      out = "|"
      for (i = 3; i <= NF; i++) out = out " " $i " |"
      print out
    }
  ' "$1" > "$2"
}

gen_tsv pte-core/_src.psv   pte-core/pte-core-vocab.tsv
gen_tsv tcf-canada-mots/_src.psv tcf-canada-mots/tcf-canada-mots-vocab.tsv
gen_tsv tcf-canada-phrases/_src.psv tcf-canada-phrases/tcf-canada-phrases-vocab.tsv

gen_md pte-core/_src.psv pte-core/pte-core-vocab.md \
  "PTE Core 核心词表" \
  "词条,词性,中文,用法要点,例句" \
  tools/sections-en.txt

gen_md tcf-canada-mots/_src.psv tcf-canada-mots/tcf-canada-mots-vocab.md \
  "TCF Canada 单词表" \
  "français,词性,English,中文,用法要点,exemple" \
  tools/sections-fr.txt

gen_md tcf-canada-phrases/_src.psv tcf-canada-phrases/tcf-canada-phrases-vocab.md \
  "TCF Canada 短语表" \
  "français,词性,English,中文,用法要点,exemple" \
  tools/sections-fr.txt

echo "PTE Core : $(( $(wc -l < pte-core/_src.psv) - 1 )) 条"
echo "TCF Canada mots: $(( $(wc -l < tcf-canada-mots/_src.psv) - 1 )) 条"
echo "TCF Canada phrases: $(( $(wc -l < tcf-canada-phrases/_src.psv) - 1 )) 条"
