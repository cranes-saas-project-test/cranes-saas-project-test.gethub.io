# Check if server is running
$response = Invoke-WebRequest -Uri http://localhost:5000 -UseBasicParsing -ErrorAction SilentlyContinue
if ($response.StatusCode -eq 200) {
    Write-Host "Server is running on http://localhost:5000"

    # Try to open in default browser
    try {
        Start-Process "http://localhost:5000"
        Write-Host "Browser opened successfully"
    } catch {
        Write-Host "Could not open browser automatically"
    }
} else {
    Write-Host "Server is not running"
}

