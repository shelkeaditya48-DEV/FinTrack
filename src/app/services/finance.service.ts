
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
}

export interface Investment {
  id: number;
  name: string;
  amount: number;
  type: string;
}

export interface Goal {
  id: number;
  name: string;
  target: number;
  saved: number;
}

@Injectable({ providedIn: 'root' })
export class FinanceService {
  income = 50000;
  budget = 30000;

  private expensesSubject = new BehaviorSubject<Expense[]>([
    { id: 1, title: 'Shopping', amount: 3000, category: 'Personal' },
    { id: 2, title: 'Food', amount: 2000, category: 'Food' }
  ]);

  expenses$ = this.expensesSubject.asObservable();

  private investmentsSubject = new BehaviorSubject<Investment[]>([
    { id: 1, name: 'Mutual Fund', amount: 10000, type: 'Mutual Fund' },
    { id: 2, name: 'Gold', amount: 5000, type: 'Gold' }
  ]);

  investments$ = this.investmentsSubject.asObservable();

  private goalsSubject = new BehaviorSubject<Goal[]>([
    { id: 1, name: 'New Laptop', target: 60000, saved: 20000 }
  ]);

  goals$ = this.goalsSubject.asObservable();

  addExpense(expense: Expense) {
    this.expensesSubject.next([...this.expensesSubject.value, expense]);
  }

  deleteExpense(id: number) {
    this.expensesSubject.next(
      this.expensesSubject.value.filter(item => item.id !== id)
    );
  }

  addInvestment(investment: Investment) {
    this.investmentsSubject.next([
      ...this.investmentsSubject.value,
      investment
    ]);
  }

  deleteInvestment(id: number) {
    this.investmentsSubject.next(
      this.investmentsSubject.value.filter(item => item.id !== id)
    );
  }

  addGoal(goal: Goal) {
    this.goalsSubject.next([...this.goalsSubject.value, goal]);
  }

  deleteGoal(id: number) {
    this.goalsSubject.next(
      this.goalsSubject.value.filter(item => item.id !== id)
    );
  }

  addSaving(id: number, amount: number) {
    const updated = this.goalsSubject.value.map(goal =>
      goal.id === id
        ? { ...goal, saved: goal.saved + amount }
        : goal
    );

    this.goalsSubject.next(updated);
  }
}
