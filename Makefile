CC = gcc
CFLAGS = -Wall -Wextra -ffreestanding -fno-pic -m32 -O2
AS = nasm
AFLAGS = -f elf32

all: build/camel.elf

build:
	mkdir -p build

build/camel.elf: build kernel/kernel.o
	ld -m elf_i386 -o $@ kernel/kernel.o

kernel/kernel.o: kernel/kernel.c include/types.h | build
	$(CC) $(CFLAGS) -c -o $@ kernel/kernel.c

clean:
	rm -rf build

.PHONY: all clean
