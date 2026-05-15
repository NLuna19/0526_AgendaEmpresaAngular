import { CommonModule } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';

const SourceList = {
  left: 'left',
  right: 'right',
};
type SourceList = (typeof SourceList)[keyof typeof SourceList];

interface DragDropListItem {
  id: number;
  label: string;
}

@Component({
  selector: 'app-drag-drop',
  imports: [CommonModule, DragDropModule],
  templateUrl: './drag-drop.component.html',
})
export class DragDropComponent implements OnInit {
  // TODO: usar data binding bidireccional.
  leftItems = input<DragDropListItem[]>([]);
  rightItems = input<DragDropListItem[]>([]);
  onDrop = output<DragEvent>();
  onChange = output<{ left: DragDropListItem[]; right: DragDropListItem[] }>();

  left: DragDropListItem[] = [];
  right: DragDropListItem[] = [];
  draggedItem: any = null;
  dragFrom: SourceList | null = null;

  ngOnInit() {
    this.left = this.leftItems();
    this.right = this.rightItems();
  }

  dragStart(item: DragDropListItem, from: SourceList) {
    this.draggedItem = item;
    this.dragFrom = from;
  }

  drop(event: DragEvent, to: SourceList) {
    this.onDrop.emit(event);
    if (this.draggedItem) {
      if (to === SourceList.left && this.dragFrom === SourceList.right) {
        this.left.push(this.draggedItem);
        this.right = this.right.filter((i: DragDropListItem) => i.id !== this.draggedItem.id);
      } else if (to === SourceList.right && this.dragFrom === SourceList.left) {
        this.right.push(this.draggedItem);
        this.left = this.left.filter((i: DragDropListItem) => i.id !== this.draggedItem.id);
      }
    }
    this.onChange.emit({ left: this.left, right: this.right });
  }

  dragEnd() {
    this.draggedItem = null;
    this.dragFrom = null;
  }
}
