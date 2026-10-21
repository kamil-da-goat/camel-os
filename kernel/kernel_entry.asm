; Minimal 32-bit kernel stub for Camel OS.
; This is a flat binary that prints a startup message to VGA text memory.

[BITS 32]
[ORG 0x10000]

start:
    mov edi, 0xB8000
    mov eax, 0x0F200F20
    mov ecx, 80 * 25 / 2
    rep stosd

    mov esi, msg_kernel
    mov edi, 0xB8000
    cld

.loop:
    lodsb
    or al, al
    jz .done
    mov ah, 0x0F
    stosw
    jmp .loop

.done:
    cli
    hlt
    jmp .done

msg_kernel:
    db "Camel OS kernel loaded", 0
