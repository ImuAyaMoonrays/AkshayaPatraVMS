import { Pipe, PipeTransform } from '@angular/core';
import { SafeUrl } from "@angular/platform-browser";
import { Observable } from "rxjs";
import { ImageService } from "../../services/image/image.service";

@Pipe({
  name: 'secureImageSrc'
})
export class SecureImageSrcPipe implements PipeTransform {

  constructor(private imageService: ImageService) {
  }

  transform(id: string): Observable<SafeUrl> {
    return this.imageService.imageById$(id);
  }

}
