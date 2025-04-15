import { Injectable } from '@nestjs/common';
import { Post } from '../../lib/models/post.model';
import { PrismaService } from 'src/lib/prisma/prisma.service';
// import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getPosts(): Promise<Post[]> {
    const result = await this.prisma.post.findMany();
    return result;
  }

  //   async addPost(data: PostDto): Promise<Post> {
  //     const result = await this.prisma.post.create({ data });
  //     return result;
  //   }
}
