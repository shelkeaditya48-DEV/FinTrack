import { Component, OnInit } from '@angular/core';

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
export class AppComponent implements OnInit {
  // १. पेजेस मॅनेज करण्यासाठी मूळ व्हेरिएबल
  activePage: Page = 'dashboard';

  // २. थीम मॅनेज करण्यासाठी नवीन व्हेरिएबल
  isDarkMode: boolean = false;

  // ३. पेज लोड झाल्यावर आधी निवडलेली थीम चेक करण्यासाठी (OnInit लाइफसायकल)
  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      document.body.classList.add('dark-theme');
    }
  }

  // ४. पेज बदलण्यासाठी मूळ फंक्शन
  setPage(page: Page) {
    this.activePage = page;
  }

  // ५. थीम बदलण्यासाठी नवीन फंक्शन (बटनवर क्लिक केल्यावर हे चालेल)
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark'); // लोकल स्टोरेजमध्ये डार्क सेव्ह करा
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light'); // लोकल स्टोरेजमध्ये लाईट सेव्ह करा
    }
  }
}
