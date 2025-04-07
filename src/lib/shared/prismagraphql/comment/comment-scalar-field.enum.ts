import { registerEnumType } from '@nestjs/graphql';

export enum CommentScalarFieldEnum {
    id = "id",
    author_id = "author_id",
    post_id = "post_id",
    text = "text",
    additional_file_path = "additional_file_path"
}


registerEnumType(CommentScalarFieldEnum, { name: 'CommentScalarFieldEnum', description: undefined })
