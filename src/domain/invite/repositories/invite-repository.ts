import { Invite } from '~/domain/invite/entities/invite';

import { PrismaClient } from '@prisma/client';

import { CreateInviteInput, InviteFilters, UpdateInviteInput } from './types';

export class InviteRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(filters?: InviteFilters): Promise<Invite[]> {
    const invites = await this.prisma.invite.findMany({
      where: { guestId: filters?.guestId, status: filters?.status },
    });
    return invites.map((invite) => new Invite(invite));
  }

  async findOne(id: string): Promise<Invite | null> {
    const invite = await this.prisma.invite.findFirst({
      where: { id },
      include: { guest: true },
    });
    if (!invite) return null;
    return new Invite(invite);
  }

  async create(input: CreateInviteInput): Promise<Invite> {
    const created = await this.prisma.invite.create({
      data: {
        status: input.status,
        companions: input.companions,
        commments: input.comments,
        guest: {
          connect: {
            id: input.guestId,
          },
        },
      },
    });
    return new Invite(created);
  }

  async update(id: string, input: UpdateInviteInput): Promise<Invite> {
    const updated = await this.prisma.invite.update({
      where: { id },
      data: {
        commments: input.comments,
        companions: input.companions,
        status: input.status,
      },
    });
    return new Invite(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.invite.delete({ where: { id } });
  }
}
