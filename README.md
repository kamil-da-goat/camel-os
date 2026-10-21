# Camel OS

Camel OS is a hybrid operating system prototype that has two modes:

- Android mode: mobile UI with an app grid and dock
- Windows mode: desktop-style shell with Start menu and .exe-like apps

This repo contains a lightweight frontend prototype as a starting point for the larger actual system design.

## Folder structure

- `index.html` — app entry
- `frontend/styles.css` — visual design for both modes
- `frontend/app.js` — interactive mode switching and app launching logic

## Run locally

From the repo root:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## The actual system vision

The real product concept is:

- Android side = full Android-style OS for a phone-sized device
- Windows side = desktop shell that can run Windows-style exe programs and app windows
- Shared base = the same system services, devices, file manager, and app layer

This frontend is just the working prototype and visual demonstration.

## License

MIT
