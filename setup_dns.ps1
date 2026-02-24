$domain = "heatmanager.darul"
$ip = "127.0.0.1"
Add-Content -Path $env:SystemRoot\System32\drivers\etc\hosts -Value "`r`n$ip $domain"
Write-Host "Dodano $domain do pliku hosts!" -ForegroundColor Green
