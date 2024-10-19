import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {

  constructor(private router: Router) { }
  files: File[] = [];
  files1: File[] = [];

  onSelect(event) {
    this.files.push(...event.addedFiles);
    if (this.files.length > 1) {
      this.replaceFile();
    }
  }

  replaceFile() {
    this.files.splice(0, 1);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  toScrutinyForm() {
    console.log("object");
    if (this.files.length) {
      this.router.navigate(['/dashboard/scrutiny-form'])
    }
  }
}
