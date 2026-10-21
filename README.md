# Camel OS

Camel OS is the concept for a hybrid operating system that can switch between two full interfaces:

- Android mode: a full mobile-style environment for touch-first use
- Windows mode: a desktop environment that can run Windows-style executable apps

This repo contains both:

- a web prototype for the interface preview in `frontend/`
- a low-level OS skeleton for the actual platform design in `boot/`, `kernel/`, and `include/`

## Folder layout

- `frontend/` — interactive web preview of the dual-mode UI
- `boot/boot.asm` — x86 boot sector skeleton
- `kernel/` — kernel entry and terminal stubs
- `include/types.h` — base type definitions
- `Makefile` — minimal build scaffold

## The real plan

The actual system should eventually include:

- boot sector / bootloader
- kernel initialization
- protected mode startup
- memory manager
- filesystem and drivers
- Android runtime layer
- Windows compatibility layer
- app launcher and mode switching

## Run the web preview

```bash
cd /path/to/camel-os
python3 -m http.server 8000
```

Open:

```text
http://localhost:8000
```

## Build the low-level skeleton

```bash
make
```

This is intentionally a minimal starting point, not a complete OS yet.

## Notes

The frontend is just a proof-of-concept interface. The real Camel OS is the low-level system design that follows this boot/kernel skeleton.
