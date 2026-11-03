
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanceService, Goal } from '../../services/finance.service';

@Component({
  selector: 'app-financial-goals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './financial-goals.component.html',
  styleUrl: './financial-goals.component.css'
})
export class FinancialGoalsComponent {
  finance = inject(FinanceService);

  name = '';
  target: number | null = null;

  goals$ = this.finance.goals$;

  addGoal() {
    if (!this.name.trim() || !this.target || this.target <= 0) {
      alert('Please enter valid goal details.');
      return;
    }

    this.finance.addGoal({
      id: Date.now(),
      name: this.name.trim(),
      target: this.target,
      saved: 0
    });

    this.name = '';
    this.target = null;
  }

  addSaving(id: number) {
    const amount = prompt('Enter savings amount:');

    if (amount !== null && Number(amount) > 0) {
      this.finance.addSaving(id, Number(amount));
    }
  }

  deleteGoal(id: number) {
    const confirmed = confirm(
      'Are you sure you want to delete this financial goal?'
    );

    if (confirmed) {
      this.finance.deleteGoal(id);
    }
  }

  calculateProgress(saved: number, target: number) {
    if (target <= 0) return 0;
    return Math.min((saved / target) * 100, 100);
  }

  remaining(target: number, saved: number) {
    return Math.max(target - saved, 0);
  }
}
