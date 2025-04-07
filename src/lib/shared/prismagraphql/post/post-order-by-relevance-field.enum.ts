import { registerEnumType } from '@nestjs/graphql';

export enum PostOrderByRelevanceFieldEnum {
    title = "title",
    description = "description",
    image_path = "image_path"
}


registerEnumType(PostOrderByRelevanceFieldEnum, { name: 'PostOrderByRelevanceFieldEnum', description: undefined })
