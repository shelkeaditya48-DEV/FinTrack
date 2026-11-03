
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineLatest, map } from 'rxjs';
import { FinanceService } from '../../services/finance.service';

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics-dashboard.component.html',
  styleUrl: './analytics-dashboard.component.css'
})
export class AnalyticsDashboardComponent {
  finance = inject(FinanceService);

  vm$ = combineLatest([
    this.finance.expenses$,
    this.finance.investments$,
    this.finance.goals$
  ]).pipe(
    map(([expenses, investments, goals]) => {
      const totalExpense = expenses.reduce(
        (sum, item) => sum + item.amount, 0
      );

      const totalInvestment = investments.reduce(
        (sum, item) => sum + item.amount, 0
      );

      const totalSaved = goals.reduce(
        (sum, item) => sum + item.saved, 0
      );

      return {
        totalExpense,
        totalInvestment,
        totalSaved,
        balance: this.finance.income - totalExpense,
        budgetLeft: this.finance.budget - totalExpense
      };
    })
  );

  exportExpenses() {
    this.finance.expenses$.subscribe(expenses => {
      const csv = [
        'Expense Name,Amount,Category',
        ...expenses.map(e => `${e.title},${e.amount},${e.category}`)
      ].join('\n');

      const blob = new Blob([csv], {
        type: 'text/csv;charset=utf-8;'
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = 'FinTech-Expenses.csv';
      link.click();

      URL.revokeObjectURL(url);
    }).unsubscribe();
  }
}
