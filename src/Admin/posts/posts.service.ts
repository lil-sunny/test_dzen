import { Injectable } from '@nestjs/common';
import { Post } from '../../lib/models/post.model';
import { PrismaService } from 'src/lib/prisma/prisma.service';
// import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getPosts(): Promise<Post[]> {
    const result = await this.prisma.post.findMany({
      include: {
        user: true,
      },
    });
    return result;
  }

  async getPost(post_id: number): Promise<Post> {
    const result = await this.prisma.post.findUnique({
      where: {
        id: post_id,
      },
    });

    if (!result) {
      throw new Error('Post does not exist');
    }

    return result;
  }
}
