; Camel OS boot sector
; Minimal bootloader that loads a 32-bit kernel image and jumps into it.
; Intended to boot in QEMU or VirtualBox as a raw disk image.

[BITS 16]
[ORG 0x7C00]

KERNEL_SEGMENT equ 0x1000
KERNEL_OFFSET  equ 0x0000
KERNEL_SECTORS equ 8

boot_drive:
    db 0

start:
    cli
    xor ax, ax
    mov ds, ax
    mov es, ax
    mov ss, ax
    mov sp, 0x7C00
    sti

    mov [boot_drive], dl

    mov si, msg_loading
    call print_string

    ; Load the kernel from sector 2 onward.
    mov ah, 0x02
    mov al, KERNEL_SECTORS
    mov ch, 0x00
    mov cl, 0x02
    mov dh, 0x00
    mov dl, [boot_drive]

    mov bx, KERNEL_SEGMENT
    mov es, bx
    xor bx, bx

    int 0x13
    jc disk_error

    ; Install a simple GDT so the CPU can enter protected mode.
    cli
    lgdt [gdt_descriptor]

    mov eax, cr0
    or eax, 0x1
    mov cr0, eax

    jmp CODE_SEG:start_protected_mode

print_string:
    lodsb
    or al, al
    jz .done
    mov ah, 0x0E
    int 0x10
    jmp print_string
.done:
    ret

disk_error:
    mov si, msg_disk_error
    call print_string
.halt:
    cli
    hlt
    jmp .halt

msg_loading:
    db "Camel OS booting...", 0x0D, 0x0A, 0

msg_disk_error:
    db "Disk error", 0x0D, 0x0A, 0

align 8

gdt_start:
    dq 0x0000000000000000

gdt_code:
    dw 0xFFFF
    dw 0x0000
    db 0x00
    db 0x9A
    db 0xCF
    db 0x00

gdt_data:
    dw 0xFFFF
    dw 0x0000
    db 0x00
    db 0x92
    db 0xCF
    db 0x00

gdt_end:

gdt_descriptor:
    dw gdt_end - gdt_start - 1
    dd gdt_start

CODE_SEG equ gdt_code - gdt_start
DATA_SEG equ gdt_data - gdt_start

[BITS 32]
start_protected_mode:
    mov ax, DATA_SEG
    mov ds, ax
    mov es, ax
    mov fs, ax
    mov gs, ax
    mov ss, ax

    ; Set up a minimal stack.
    mov esp, 0x90000

    ; Jump into the kernel image at 0x10000.
    jmp 0x10000

; Boot sector padding and magic bytes.
times 510 - ($ - $$) db 0

dw 0xAA55
