; Camel OS boot sector stub
; This is a minimal bootloader skeleton for a future x86-based system.
;
; It does not boot a full OS yet; it is a starting point for the real low-level
; implementation that will eventually hand control to a protected-mode kernel.

org 0x7c00
bits 16

start:
    cli
    xor ax, ax
    mov ds, ax
    mov es, ax
    mov ss, ax
    mov sp, 0x7c00
    sti

    ; Print a startup message
    mov si, msg
    call print_string

    ; Halt for now
    jmp $

print_string:
    lodsb
    or al, al
    jz .done
    mov ah, 0Eh
    int 10h
    jmp print_string
.done:
    ret

msg db "Camel OS booting...", 0x0D, 0x0A, 0

times 510-($-$$) db 0

dw 0xAA55
