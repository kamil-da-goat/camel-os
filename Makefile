CC = gcc
CFLAGS = -Wall -Wextra -ffreestanding -fno-pic -m32 -O2
AS = nasm
AFLAGS = -f bin

all: camel.img

boot/boot.bin: boot/boot.asm
	$(AS) -f bin -o $@ $<

kernel/kernel.bin: kernel/kernel_entry.asm
	$(AS) -f bin -o $@ $<

camel.img: boot/boot.bin kernel/kernel.bin
	dd if=/dev/zero of=$@ bs=512 count=2880 status=none
	dd if=boot/boot.bin of=$@ conv=notrunc bs=512 count=1 status=none
	dd if=kernel/kernel.bin of=$@ conv=notrunc seek=1 bs=512 status=none

run: camel.img
	qemu-system-i386 -drive format=raw,file=camel.img

clean:
	rm -f boot/boot.bin kernel/kernel.bin camel.img

.PHONY: all clean run
