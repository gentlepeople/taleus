import { ArgsType, IntersectionType } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/args/pagination.args';
import { SortArgs } from 'src/common/args/sort.args';

@ArgsType()
export class ArrayIntersectionArgs extends IntersectionType(PaginationArgs, SortArgs) {}
