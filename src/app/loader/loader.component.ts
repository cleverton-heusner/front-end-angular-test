import { LoaderService } from '../shared/loader.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  @Input('isLoaderVisible')
  isLoaderVisible: boolean;

  @Output('isLoaderVisibleChange')
  isLoaderVisibleChange: EventEmitter<boolean> = new EventEmitter();

  constructor(public loaderService: LoaderService) {}

  ngOnInit() {
    this.loaderService.isVisibleSubject.subscribe((isVisible: boolean) => {
      this.isLoaderVisible = isVisible;
      this.isLoaderVisibleChange.emit(isVisible);
    });
  }
}
