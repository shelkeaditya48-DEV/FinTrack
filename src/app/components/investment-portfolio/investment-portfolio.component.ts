
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanceService, Investment } from '../../services/finance.service';

@Component({
  selector: 'app-investment-portfolio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './investment-portfolio.component.html',
  styleUrl: './investment-portfolio.component.css'
})
export class InvestmentPortfolioComponent {
  finance = inject(FinanceService);

  name = '';
  amount: number | null = null;
  type = 'Mutual Fund';

  investments$ = this.finance.investments$;

  sum = (total: number, item: Investment) => total + item.amount;

  addInvestment() {
    if (!this.name.trim() || !this.amount || this.amount <= 0) {
      alert('Please enter valid investment details.');
      return;
    }

    this.finance.addInvestment({
      id: Date.now(),
      name: this.name.trim(),
      amount: this.amount,
      type: this.type
    });

    this.name = '';
    this.amount = null;
    this.type = 'Mutual Fund';
  }

  deleteInvestment(id: number) {
    const confirmed = confirm(
      'Are you sure you want to delete this investment?'
    );

    if (confirmed) {
      this.finance.deleteInvestment(id);
    }
  }
}
