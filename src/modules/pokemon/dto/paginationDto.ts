import { IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

const toInt = (value: any, min: number, defaultValue: number): number => {
  try {
    const parsedInt = parseInt(value, 10);
    if (isNaN(parsedInt)) return defaultValue;
    if (parsedInt < min) return defaultValue;
    return parsedInt;
  } catch {
    return defaultValue;
  }
};

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Transform((v) => {
    return toInt(v.value, 1, 1);
  })
  pageNumber = 1;
  @IsOptional()
  @IsInt()
  @Transform((v) => {
    return toInt(v.value, 1, 10);
  })
  pageSize = 10;
  @IsOptional()
  sortBy = 'createdAt';
  @IsOptional()
  sortDirection = 'desc';

  public getSkipSize() {
    return (this.pageNumber - 1) * this.pageSize;
  }
}

export class PakemonsPaginationDto extends PaginationDto {
  @IsOptional()
  searchNameTerm = '';
}
