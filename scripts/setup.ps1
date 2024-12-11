# Setup script for DSH development environment

Write-Host "Setting up DSH development environment..."

# Install npm dependencies
Write-Host "Installing npm dependencies..."
npm install

# Install Go tools
Write-Host "Installing Go tools..."
& "$PSScriptRoot\setup-go-tools.ps1"

# Install VS Code extensions
Write-Host "Installing recommended VS Code extensions..."
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension golang.go
code --install-extension ms-vscode.vscode-typescript-tslint-plugin
code --install-extension streetsidesoftware.code-spell-checker
code --install-extension eamodio.gitlens
code --install-extension github.vscode-pull-request-github
code --install-extension gruntfuggly.todo-tree
code --install-extension christian-kohler.path-intellisense
code --install-extension visualstudioexptteam.vscodeintellicode

Write-Host "Setup complete! Please restart VS Code to activate extensions."
