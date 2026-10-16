$ErrorActionPreference = 'Stop'
$src = 'C:\Projects\AGENTS_HEAP'
$root = 'C:\Projects\my\teacher_widgets\public\content'

function Get-Quarter([datetime]$dt) {
  $d = Get-Date -Year $dt.Year -Month $dt.Month -Day $dt.Day
  if ($d -ge [datetime]'2026-09-01' -and $d -le [datetime]'2026-10-25') { return 1 }
  if ($d -ge [datetime]'2026-11-04' -and $d -le [datetime]'2026-12-30') { return 2 }
  if ($d -ge [datetime]'2027-01-11' -and $d -le [datetime]'2027-03-26') { return 3 }
  if ($d -ge [datetime]'2027-04-05' -and $d -le [datetime]'2027-05-26') { return 4 }
  if ($d -lt [datetime]'2026-11-04') { return 1 }
  if ($d -lt [datetime]'2027-01-11') { return 2 }
  if ($d -lt [datetime]'2027-04-05') { return 3 }
  return 4
}

function Get-Title([string]$path) {
  if ($path -notmatch '\.html$') {
    return [IO.Path]::GetFileNameWithoutExtension($path)
  }
  $raw = Get-Content -LiteralPath $path -Raw -Encoding UTF8
  if ($raw -match '<title>(.*?)</title>') {
    $t = $Matches[1]
    $t = $t.Replace('&amp;', '&').Replace('&lt;', '<').Replace('&gt;', '>').Replace('&quot;', '"')
    return $t.Trim()
  }
  return [IO.Path]::GetFileNameWithoutExtension($path)
}

function Make-Id($subject, $grade, $q, $baseName) {
  $raw = "$subject-$grade-q$q-$baseName"
  return ($raw -replace '[^a-zA-Z0-9\-]+', '-')
}

function Copy-Work($subject, $grade, $filePath, [string[]]$extraDirs) {
  $item = Get-Item -LiteralPath $filePath
  $q = Get-Quarter $item.CreationTime
  $destDir = Join-Path $root "$subject\$grade\q$q"
  New-Item -ItemType Directory -Force -Path $destDir | Out-Null
  Copy-Item -LiteralPath $item.FullName -Destination (Join-Path $destDir $item.Name) -Force
  foreach ($dirName in $extraDirs) {
    $from = Join-Path $src $dirName
    if (Test-Path $from) {
      $to = Join-Path $destDir $dirName
      if (Test-Path $to) { Remove-Item -LiteralPath $to -Recurse -Force }
      Copy-Item -LiteralPath $from -Destination $to -Recurse -Force
    }
  }
  $rel = "/content/$subject/$grade/q$q/$($item.Name)"
  $kind = if ($item.Extension -eq '.pdf') { 'pdf' } else { 'html' }
  return [PSCustomObject]@{
    id        = (Make-Id $subject $grade $q $item.BaseName)
    subject   = $subject
    grade     = [int]$grade
    quarter   = $q
    title     = (Get-Title $item.FullName)
    createdAt = $item.CreationTime.ToString('yyyy-MM-ddTHH:mm:ss')
    path      = $rel
    kind      = $kind
  }
}

if (Test-Path $root) {
  Remove-Item -LiteralPath $root -Recurse -Force
}
New-Item -ItemType Directory -Force -Path $root | Out-Null

$catalog = New-Object System.Collections.Generic.List[object]

$mathFiles = @(
  'kontrolnaya-mat-5.html',
  'matematika-zadaniya.html',
  'matematika-zadaniya-variant-2.html',
  'matematika-zadaniya-variant-3.html',
  'matematika-zadaniya-variant-4.html',
  'kontrolnaya-matematika.html',
  'kontrolnaya-matematika-2-varianta.html',
  'kontrolnaya-matematika-otvety.html',
  'samostoyatelnaya-matematika-2-varianta.html',
  'samostoyatelnaya-matematika-otvety.html',
  'kontrolnaya-chisloye-bukvennye.html',
  'kontrolnaya-chisloye-bukvennye-otvety.html'
)
foreach ($f in $mathFiles) {
  $catalog.Add((Copy-Work 'math' 5 (Join-Path $src $f) @()))
}

foreach ($f in @('english-alphabet-a4-landscape.html', 'english-letters-a4.html')) {
  $catalog.Add((Copy-Work 'english' 2 (Join-Path $src $f) @()))
}
$catalog.Add((Copy-Work 'english' 2 (Join-Path $src 'school-again-worksheet.html') @('school-again-assets')))

foreach ($f in @('english-test-variants.html', 'english-test-answer-key.html')) {
  $catalog.Add((Copy-Work 'english' 3 (Join-Path $src $f) @('english-test-assets')))
}

$catalog.Add((Copy-Work 'english' 4 (Join-Path $src 'spotlight-tasks-landscape.html') @('spotlight-assets')))
$catalog.Add((Copy-Work 'english' 4 (Join-Path $src 'spotlight-4-wb.pdf') @()))

$ew = Join-Path $src 'english_worksheets'
$ewWorks = @(
  'answer_key.html',
  'samostoyatelnaya_2_varianta.html',
  'variant_1.html',
  'variant_2.html',
  'kim_4.pdf'
)
$first = Get-Item (Join-Path $ew $ewWorks[0])
$ewQ = Get-Quarter $first.CreationTime
$ewDest = Join-Path $root "english\4\q$ewQ"
New-Item -ItemType Directory -Force -Path $ewDest | Out-Null
foreach ($sub in @('img', 'crops')) {
  $from = Join-Path $ew $sub
  if (Test-Path $from) {
    $to = Join-Path $ewDest $sub
    if (Test-Path $to) { Remove-Item $to -Recurse -Force }
    Copy-Item $from $to -Recurse -Force
  }
}
Get-ChildItem $ew -File -Filter 'page_*.png' | ForEach-Object {
  Copy-Item $_.FullName (Join-Path $ewDest $_.Name) -Force
}
foreach ($f in $ewWorks) {
  $item = Get-Item (Join-Path $ew $f)
  $q = Get-Quarter $item.CreationTime
  $destDir = Join-Path $root "english\4\q$q"
  New-Item -ItemType Directory -Force -Path $destDir | Out-Null
  Copy-Item $item.FullName (Join-Path $destDir $item.Name) -Force
  $rel = "/content/english/4/q$q/$($item.Name)"
  $kind = if ($item.Extension -eq '.pdf') { 'pdf' } else { 'html' }
  $catalog.Add([PSCustomObject]@{
    id        = (Make-Id 'english' 4 $q $item.BaseName)
    subject   = 'english'
    grade     = 4
    quarter   = $q
    title     = (Get-Title $item.FullName)
    createdAt = $item.CreationTime.ToString('yyyy-MM-ddTHH:mm:ss')
    path      = $rel
    kind      = $kind
  })
}

$catalog.Add((Copy-Work 'english' 5 (Join-Path $src 'spotlight-5-tasks-landscape.html') @('spotlight-5-assets')))
$catalog.Add((Copy-Work 'english' 5 (Join-Path $src 'spotlight-5-wb-pages-6-7-a4.html') @('spotlight-5-wb-assets')))

$sorted = $catalog | Sort-Object subject, grade, quarter, createdAt
$sorted | Select-Object subject, grade, quarter, path, createdAt, title | Format-Table -AutoSize
Write-Host "TOTAL: $($sorted.Count)"

$jsonPath = Join-Path $PSScriptRoot 'works-import.json'
$sorted | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath $jsonPath -Encoding UTF8
Write-Host "Wrote $jsonPath"
