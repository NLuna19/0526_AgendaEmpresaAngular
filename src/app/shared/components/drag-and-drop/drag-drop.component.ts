import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class DragDropComponent {
  draggedItem: any = null;

  left: DragDropListItem[] = [
    { id: 1, label: 'Juan' },
    { id: 2, label: 'Ana' },
    { id: 3, label: 'Pedro' },
  ];

  right: DragDropListItem[] = [];

  dragFrom: SourceList | null = null;

  dragStart(item: DragDropListItem, from: SourceList) {
    this.draggedItem = item;
    this.dragFrom = from;
  }

  drop(to: SourceList) {
    if (this.draggedItem) {
      if (to === SourceList.left && this.dragFrom === SourceList.right) {
        this.left = [...this.left, this.draggedItem];
        this.right = this.right!.filter((i: DragDropListItem) => i.id !== this.draggedItem.id);
      } else if (to === SourceList.right && this.dragFrom === SourceList.left) {
        this.right = [...this.right, this.draggedItem];
        this.left = this.left!.filter((i: DragDropListItem) => i.id !== this.draggedItem.id);
      }
    }
  }

  dragEnd() {
    this.draggedItem = null;
    this.dragFrom = null;
  }
}
