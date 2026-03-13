# Simple HTTP Server in PowerShell
$http = [System.Net.HttpListener]::new()
$http.Prefixes.Add("http://localhost:5000/")
$http.Start()
Write-Host "Server started at http://localhost:5000"
Write-Host "Press Ctrl+C to stop"

# Open in default browser
Start-Process "http://localhost:5000"

try {
    while ($http.IsListening) {
        $context = $http.GetContext()
        $request = $context.Request
        $response = $context.Response

        $path = $request.Url.AbsolutePath
        if ($path -eq "/" -or $path -eq "/index.html") {
            $filePath = "c:\Users\Toshiba\Desktop\11-3-2026\Cranes ERP System\client\public\purehtml\index.html"
            if (Test-Path $filePath) {
                $content = Get-Content $filePath -Raw -Encoding UTF8
                $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
                $response.ContentType = "text/html"
            } else {
                $buffer = [System.Text.Encoding]::UTF8.GetBytes("File not found")
            }
        } else {
            $buffer = [System.Text.Encoding]::UTF8.GetBytes("Not Found")
        }

        $response.ContentLength64 = $buffer.Length
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
        $response.Close()
    }
} finally {
    $http.Stop()
}
