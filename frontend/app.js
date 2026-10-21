const androidApps = [
  { name: 'Phone', icon: '📞', accent: '#2d6df6' },
  { name: 'Messages', icon: '💬', accent: '#16c8b7' },
  { name: 'Camera', icon: '📷', accent: '#fbbf24' },
  { name: 'Gallery', icon: '🖼️', accent: '#f97316' },
  { name: 'Maps', icon: '🗺️', accent: '#34d399' },
  { name: 'Music', icon: '🎵', accent: '#ec4899' },
  { name: 'Store', icon: '🛍️', accent: '#a78bfa' },
  { name: 'Settings', icon: '⚙️', accent: '#94a3b8' },
];

const windowsApps = [
  { name: 'Notepad.exe', label: 'Notepad', icon: '📝' },
  { name: 'Calc.exe', label: 'Calculator', icon: '🧮' },
  { name: 'Explorer.exe', label: 'Explorer', icon: '📁' },
  { name: 'Browser.exe', label: 'Browser', icon: '🌐' },
];

const state = {
  mode: 'android',
  openWindows: [],
};

const osRoot = document.getElementById('osRoot');
const modeSwitchButton = document.getElementById('modeSwitch');
const androidAppsContainer = document.getElementById('androidApps');
const androidDock = document.getElementById('androidDock');
const windowsShortcuts = document.getElementById('windowsShortcuts');
const windowArea = document.getElementById('windowArea');
const taskbarApps = document.getElementById('taskbarApps');
const startButton = document.getElementById('startButton');
const startMenu = document.getElementById('startMenu');

function renderAndroidApps() {
  androidAppsContainer.innerHTML = '';
  androidDock.innerHTML = '';

  androidApps.forEach((app, index) => {
    const tile = document.createElement('button');
    tile.type = 'button';
    tile.className = 'app-tile';
    tile.innerHTML = `
      <div class="app-icon" style="background:${app.accent}">${app.icon}</div>
      <span>${app.name}</span>
    `;
    tile.addEventListener('click', () => runAndroidApp(app.name));
    androidAppsContainer.appendChild(tile);

    if (index < 4) {
      const dockApp = document.createElement('button');
      dockApp.type = 'button';
      dockApp.className = 'dock-app';
      dockApp.innerHTML = app.icon;
      dockApp.style.background = app.accent;
      dockApp.addEventListener('click', () => runAndroidApp(app.name));
      androidDock.appendChild(dockApp);
    }
  });
}

function renderWindowsShortcuts() {
  windowsShortcuts.innerHTML = '';
  windowsApps.forEach((app) => {
    const shortcut = document.createElement('button');
    shortcut.type = 'button';
    shortcut.className = 'shortcut';
    shortcut.innerHTML = `
      <div class="shortcut-icon">${app.icon}</div>
      <span>${app.label}</span>
    `;
    shortcut.addEventListener('click', () => openWindowsApp(app));
    windowsShortcuts.appendChild(shortcut);
  });
}

function runAndroidApp(appName) {
  const banner = document.createElement('div');
  banner.style.position = 'fixed';
  banner.style.right = '24px';
  banner.style.bottom = '110px';
  banner.style.padding = '12px 16px';
  banner.style.borderRadius = '12px';
  banner.style.background = 'rgba(15, 23, 42, 0.8)';
  banner.style.border = '1px solid rgba(255,255,255,0.14)';
  banner.style.boxShadow = '0 12px 28px rgba(0,0,0,0.24)';
  banner.style.color = 'white';
  banner.style.zIndex = '20';
  banner.textContent = `${appName} launched`;
  document.body.appendChild(banner);

  setTimeout(() => {
    banner.remove();
  }, 900);
}

function openWindowsApp(app) {
  const existing = state.openWindows.find((w) => w.name === app.name);
  if (existing) {
    existing.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const windowEl = document.createElement('div');
  windowEl.className = 'app-window';
  windowEl.innerHTML = `
    <div class="window-bar">
      <div class="window-title">${app.label}</div>
      <div class="window-controls">
        <span class="control-dot red"></span>
        <span class="control-dot yellow"></span>
        <span class="control-dot green"></span>
      </div>
    </div>
    <div class="window-body">
      <p>Running ${app.name}</p>
      <p>This is a Windows-style replica that can launch .exe-like programs inside Camel OS.</p>
      <button class="window-button" type="button">Open</button>
    </div>
  `;

  const taskbarButton = document.createElement('button');
  taskbarButton.type = 'button';
  taskbarButton.className = 'taskbar-app';
  taskbarButton.textContent = app.label;
  taskbarButton.addEventListener('click', () => {
    windowEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  windowArea.appendChild(windowEl);
  taskbarApps.appendChild(taskbarButton);

  state.openWindows.push({ name: app.name, element: windowEl, taskbarButton });
}

function setMode(mode) {
  state.mode = mode;
  const isAndroid = mode === 'android';
  osRoot.classList.toggle('android-mode', isAndroid);
  osRoot.classList.toggle('windows-mode', !isAndroid);

  const androidUI = document.querySelector('.android-ui');
  const windowsUI = document.querySelector('.windows-ui');

  androidUI.classList.toggle('hidden', !isAndroid);
  windowsUI.classList.toggle('hidden', isAndroid);

  modeSwitchButton.textContent = isAndroid ? 'Switch to Windows' : 'Switch to Android';
}

modeSwitchButton.addEventListener('click', () => {
  const nextMode = state.mode === 'android' ? 'windows' : 'android';
  setMode(nextMode);
});

startButton.addEventListener('click', () => {
  startMenu.classList.toggle('hidden');
});

document.querySelectorAll('.start-menu-item').forEach((item) => {
  item.addEventListener('click', () => {
    const app = windowsApps.find((entry) => entry.name === item.dataset.app);
    if (app) {
      openWindowsApp(app);
    }
    startMenu.classList.add('hidden');
  });
});

renderAndroidApps();
renderWindowsShortcuts();
setMode('android');
