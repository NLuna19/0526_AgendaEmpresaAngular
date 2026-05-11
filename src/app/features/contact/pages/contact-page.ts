import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactTable } from '../components/contact-table/contact-table.component';
import { ContactState } from '../states/contact.state';

@Component({
  selector: 'app-contact-page',
  imports: [CommonModule, ContactTable],
  templateUrl: './contact-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage implements OnInit {
  private router: Router = inject(Router);
  state = inject(ContactState);

  ngOnInit(): void {
    this.state.load();
  }

  navigateBack(): void {
    this.router.navigate(['/home']);
  }

  addContact(): void {
    this.router.navigate(['/contact/new']);
  }
}
