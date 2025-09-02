import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  openFileInNewWindow(url: string, tabName = "_blank"): void {
    window.open(url, tabName)
  }
}
