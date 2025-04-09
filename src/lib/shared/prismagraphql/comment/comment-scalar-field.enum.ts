import { registerEnumType } from '@nestjs/graphql';

export enum CommentScalarFieldEnum {
    id = "id",
    author_id = "author_id",
    post_id = "post_id",
    text = "text",
    additional_file_path = "additional_file_path",
    reply_to_comment_id = "reply_to_comment_id",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(CommentScalarFieldEnum, { name: 'CommentScalarFieldEnum', description: undefined })
