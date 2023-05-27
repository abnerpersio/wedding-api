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

  async findOne(id: string): Promise<Guest | null> {
    const guest = await this.prisma.guest.findFirst({
      where: { id },
      include: { invites: true },
    });
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

  async update(id: string, input: UpdateGuestInput): Promise<Guest> {
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

  async delete(id: string): Promise<void> {
    await this.prisma.guest.delete({ where: { id } });
  }
}
