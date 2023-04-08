import { Guest } from '~/domain/guest/entities/guest';

import { PrismaClient } from '@prisma/client';

import { CreateGuestInput, GuestFilters, UpdateGuestInput } from './types';

export class GuestRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(filters?: GuestFilters): Promise<Guest[]> {
    const guests = await this.prisma.guest.findMany({
      where: { type: filters?.type },
    });
    return guests.map((guest) => new Guest(guest));
  }

  async findOne(id: number): Promise<Guest | null> {
    const guest = await this.prisma.guest.findFirst({ where: { id } });
    if (!guest) return null;
    return new Guest(guest);
  }

  async create(input: CreateGuestInput): Promise<Guest> {
    const created = await this.prisma.guest.create({
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        type: input.type,
      },
    });
    return new Guest(created);
  }

  async update(id: number, input: UpdateGuestInput): Promise<Guest> {
    const updated = await this.prisma.guest.update({
      where: { id },
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        type: input.type,
      },
    });
    return new Guest(updated);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.guest.delete({ where: { id } });
  }
}
