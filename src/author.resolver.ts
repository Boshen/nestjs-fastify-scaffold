import { Resolver, Query, ObjectType, Field, InputType, Args, registerEnumType } from '@nestjs/graphql'

@ObjectType('Author')
class Author {
  @Field()
  name!: string
}

enum AuthorType {
  XXX, // = 'XXX',
  YYY, //= 'YYY'
}

registerEnumType(AuthorType, {
  name: 'AuthorType',
})

@InputType()
class AuthorInput {
  @Field()
  name!: string

  @Field(() => AuthorType)
  authorType: AuthorType = AuthorType.XXX
}

@Resolver(() => Author)
export class AuthorsResolver {
  @Query(() => Author)
  async author(@Args('input', { type: () => AuthorInput }) _input: AuthorInput) {
    return []
  }
}
