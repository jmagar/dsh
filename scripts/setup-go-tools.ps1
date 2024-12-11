# Install Go development tools
Write-Host "Installing Go development tools..."

# Install Delve debugger
Write-Host "Installing Delve debugger..."
go install github.com/go-delve/delve/cmd/dlv@latest

# Install goimports
Write-Host "Installing goimports..."
go install golang.org/x/tools/cmd/goimports@latest

# Install golangci-lint
Write-Host "Installing golangci-lint..."
go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest

Write-Host "Go tools installation complete!"
