$ErrorActionPreference = "Stop"
$ProgressPreference = 'SilentlyContinue'
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectRoot

Write-Host "--- AI RESUME BUILDER BACKEND SETUP ---"

# --- 1. JAVA 11 SETUP ---
$localJdkPath = Join-Path $projectRoot "local-jdk"
# Stable API link that redirects to latest OpenJDK 11 zip for Windows x64
$jdkUrl = "https://api.adoptium.net/v3/binary/latest/11/ga/windows/x64/jdk/hotspot/normal/eclipse?project=jdk"

if (!(Test-Path $localJdkPath)) {
    Write-Host "Downloading OpenJDK 11 (Portable)... This may take a minute."
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    $jdkZip = "jdk11.zip"
    Invoke-WebRequest -Uri $jdkUrl -OutFile $jdkZip
    
    Write-Host "Extracting JDK..."
    Expand-Archive -Path $jdkZip -DestinationPath $localJdkPath -Force
    Remove-Item $jdkZip
}

# Auto-detect the extracted JDK folder name
$jdkSubDir = Get-ChildItem -Path $localJdkPath -Directory | Select-Object -First 1
$jdkRoot = $jdkSubDir.FullName
$env:JAVA_HOME = $jdkRoot
$env:PATH = "$jdkRoot\bin;$env:PATH"

Write-Host "Using Java: $($env:JAVA_HOME)"
java -version

# --- 2. MAVEN SETUP ---
$localMavenPath = Join-Path $projectRoot "local-maven"
$mavenVersion = "3.9.6"
# Check if mvn.cmd exists in the expected path
if (!(Test-Path "$localMavenPath\apache-maven-$mavenVersion\bin\mvn.cmd")) {
    Write-Host "Downloading Maven..."
    $mvnUrl = "https://archive.apache.org/dist/maven/maven-3/$mavenVersion/binaries/apache-maven-$mavenVersion-bin.zip"
    $mvnZip = "maven.zip"
    Invoke-WebRequest -Uri $mvnUrl -OutFile $mvnZip
    Expand-Archive -Path $mvnZip -DestinationPath $localMavenPath -Force
    Remove-Item $mvnZip
}
$mavenBin = "$localMavenPath\apache-maven-$mavenVersion\bin"
$env:PATH = "$mavenBin;$env:PATH"

Write-Host "Using Maven: $mavenBin"
mvn -v

# --- 3. RUN BACKEND ---
Write-Host "Starting Spring Boot Application..."
mvn spring-boot:run
