import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'convertToCommas'
})
export class ConvertToCommasPipe implements PipeTransform
{
  transform(resultingString: string, characterToReplace: string)
  {
    return resultingString.replace(characterToReplace, ',');
  }
}
