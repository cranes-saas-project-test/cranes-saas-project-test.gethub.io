$port = 5000
$baseDir = "c:\Users\Toshiba\Desktop\11-3-2026\Cranes ERP System\client\public\purehtml"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

Write-Host "Starting server on http://localhost:$port"
Write-Host "Serving files from: $baseDir"

try {
    $listener.Start()
    Start-Process "http://localhost:$port"

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $relativePath = $request.Url.LocalPath
        if ($relativePath -eq "/") {
            $relativePath = "/index.html"
        }

        $filePath = Join-Path $baseDir $relativePath.Replace("/", "\")

        if (Test-Path $filePath) {
            $content = Get-Content $filePath -Raw -Encoding UTF8
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)

            $extension = [System.IO.Path]::GetExtension($filePath)
            $mimeTypes = @{
                ".html" = "text/html; charset=utf-8"
                ".js" = "application/javascript"
                ".css" = "text/css"
                ".json" = "application/json"
            }

            $contentType = $mimeTypes[$extension]
            if ($null -eq $contentType) {
                $contentType = "text/plain"
            }

            $response.ContentType = $contentType
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        } else {
            $response.StatusCode = 404
            $errorPage = "<html><body><h1>404 - File Not Found</h1></body></html>"
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($errorPage)
            $response.ContentType = "text/html"
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }

        $response.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
}

