; Script generated by the Inno Setup Script Wizard.
; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!

#define MyAppName "infaSelector"
#define MyAppVersion "1.2"
#define MyAppPublisher "SystemX"
#define MyAppURL "https://www.arrowsysx.com"
#define MyAppExeName "infaSelector.exe"
#define MyAppAssocName MyAppName + " Launch Configuration"                

[Setup]
; NOTE: The value of AppId uniquely identifies this application. Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{BE62BCC4-4A76-444D-A9A4-6E6A6DA82416}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
;AppVerName={#MyAppName} {#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={autopf}\{#MyAppName}
ChangesAssociations=yes
DisableProgramGroupPage=yes
LicenseFile=C:\infaSelector\infaSelector\LICENSE
; Uncomment the following line to run in non administrative install mode (install for current user only.)
;PrivilegesRequired=lowest
PrivilegesRequiredOverridesAllowed=dialog
OutputDir=C:\infaSelector\infaSelector
OutputBaseFilename=install
SetupIconFile=C:\infaSelector\infaSelector\img\icon-128x.ico
Compression=lzma
SolidCompression=yes
WizardStyle=modern

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[Files]
Source: "C:\infaSelector\infaSelector\out\infaSelector-win32-x64\{#MyAppExeName}"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\infaSelector\infaSelector\out\infaSelector-win32-x64\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{autoprograms}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent

