$ErrorActionPreference = "Stop"
$projectRoot = "z:\CS\ai-resume-builder\backend"
$mavenVersion = "3.9.6"
$mavenDirName = "apache-maven-$mavenVersion"
$localMavenPath = Join-Path $projectRoot "local-maven"
$mavenBin = Join-Path $localMavenPath "$mavenDirName\bin"

Set-Location $projectRoot

# 1. Check if we have maven (downloaded in previous step)
if (!(Test-Path "$mavenBin\mvn.cmd")) {
    Write-Host "Maven missing? Re-running setup..."
    # Quick re-download block if needed, but assuming it exists from previous run
    $mavenZipName = "$mavenDirName-bin.zip"
    $mavenUrl = "https://archive.apache.org/dist/maven/maven-3/$mavenVersion/binaries/$mavenZipName"
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Invoke-WebRequest -Uri $mavenUrl -OutFile $mavenZipName
    Expand-Archive -Path $mavenZipName -DestinationPath $localMavenPath -Force
    Remove-Item $mavenZipName
}

# 2. Add to PATH
$env:PATH = "$mavenBin;$env:PATH"

# 3. CRITICAL FIX: Your Java 1.8.0_05 is too old for default TLS 1.2
# We must force it for Maven Central downloads to work.
$env:MAVEN_OPTS = "-Dhttps.protocols=TLSv1.2"

# 4. Run Spring Boot
Write-Host "Starting Spring Boot..."
# We use -X to see debug info if it fails
mvn spring-boot:run
