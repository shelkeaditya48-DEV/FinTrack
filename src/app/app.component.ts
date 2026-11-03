
import { Component } from '@angular/core';

import { AnalyticsDashboardComponent } from './components/analytics-dashboard/analytics-dashboard.component';
import { IncomeExpenseComponent } from './components/income-expense/income-expense.component';
import { InvestmentPortfolioComponent } from './components/investment-portfolio/investment-portfolio.component';
import { FinancialGoalsComponent } from './components/financial-goals/financial-goals.component';

type Page = 'dashboard' | 'expenses' | 'investments' | 'goals' | 'analytics';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AnalyticsDashboardComponent,
    IncomeExpenseComponent,
    InvestmentPortfolioComponent,
    FinancialGoalsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  activePage: Page = 'dashboard';

  setPage(page: Page) {
    this.activePage = page;
  }
}
