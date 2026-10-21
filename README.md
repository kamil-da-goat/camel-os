# Camel OS

Camel OS is a hybrid operating system concept that combines a mobile Android-style environment with a Windows-style desktop shell.

This repository now includes a realistic bootable skeleton for a minimal x86 system, plus the frontend prototype for the user experience.

## Structure

- `frontend/` — browser-based UI concept for the Android/Windows switch
- `boot/boot.asm` — boot sector that loads a kernel image from disk and enters protected mode
- `kernel/kernel_entry.asm` — minimal 32-bit kernel stub for VGA output
- `Makefile` — builds a raw disk image for QEMU

## Build the boot image

```bash
make
```

This generates a raw disk image named `camel.img`.

## Run in QEMU

```bash
make run
```

This launches QEMU and boots the current Camel OS skeleton.

## Notes

This is still a minimal bootable starting point, not a full Android/Windows operating system. It provides the base boot flow required for a real OS project.

## Browser preview

The frontend can also be opened in a browser:

```bash
cd /path/to/camel-os
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```
