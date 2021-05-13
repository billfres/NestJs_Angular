import { ArgumentMetadata, Body, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UpperAndFusionPipe implements PipeTransform {
  transform(entry: { data: string[]}, metadata: ArgumentMetadata) {

    if(metadata.type === 'body'){
      return entry.data.map((element) => element.toLocaleUpperCase()).join('--');
    }
    return entry.data;
  }
}
