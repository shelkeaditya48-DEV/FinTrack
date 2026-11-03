
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanceService, Expense } from '../../services/finance.service';

@Component({
  selector: 'app-income-expense',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './income-expense.component.html',
  styleUrl: './income-expense.component.css'
})
export class IncomeExpenseComponent {
  finance = inject(FinanceService);

  title = '';
  amount: number | null = null;
  category = 'Food';

  expenses$ = this.finance.expenses$;

  sum = (total: number, item: Expense) => total + item.amount;

  addExpense() {
    if (!this.title.trim() || !this.amount || this.amount <= 0) {
      alert('Please enter valid expense details.');
      return;
    }

    this.finance.addExpense({
      id: Date.now(),
      title: this.title.trim(),
      amount: this.amount,
      category: this.category
    });

    this.title = '';
    this.amount = null;
    this.category = 'Food';
  }

  deleteExpense(id: number) {
    const confirmed = confirm(
      'Are you sure you want to delete this expense?'
    );

    if (confirmed) {
      this.finance.deleteExpense(id);
    }
  }
}
