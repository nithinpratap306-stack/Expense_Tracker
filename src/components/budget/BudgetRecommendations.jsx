import React, { useMemo } from 'react';
import { Lightbulb, TrendingDown, ShieldCheck, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { formatCurrency, formatPercent } from '../../utils/formatters';

export function BudgetRecommendations({ categories = [], monthlyBudget = 8000, totalSpent = 0 }) {
  // Generate deterministic student-friendly recommendations
  const recommendations = useMemo(() => {
    const list = [];
    const food = categories.find(c => c.category === 'Food');
    const transport = categories.find(c => c.category === 'Transport');
    const entertainment = categories.find(c => c.category === 'Entertainment');
    const education = categories.find(c => c.category === 'Education');

    // Recommendation 1: Food spending pace
    if (food && food.limit > 0) {
      const pct = (food.amount / food.limit) * 100;
      if (pct >= 70) {
        list.push({
          id: 'rec-food',
          icon: '🍔',
          type: 'tip',
          title: `Food spending is at ${formatPercent(pct, 0)} of budget`,
          description: `Reducing campus canteen treats by ₹100/week could save around ${formatCurrency(400)}/month toward your savings goals.`,
        });
      }
    }

    // Recommendation 2: Transport comfort check
    if (transport && transport.limit > 0) {
      const pct = (transport.amount / transport.limit) * 100;
      if (pct < 70) {
        list.push({
          id: 'rec-transport',
          icon: '🚌',
          type: 'positive',
          title: `Transport spending is comfortably within budget`,
          description: `You've used only ${formatPercent(pct, 0)} of your ₹${transport.limit.toLocaleString('en-IN')} transport cap, keeping daily transit costs efficient.`,
        });
      }
    }

    // Recommendation 3: Entertainment moderation
    if (entertainment && entertainment.limit > 0) {
      const pct = (entertainment.amount / entertainment.limit) * 100;
      if (pct >= 70) {
        list.push({
          id: 'rec-ent',
          icon: '🎮',
          type: 'warning',
          title: `Entertainment nearing limit (${formatPercent(pct, 0)})`,
          description: `Look for free campus festival events or shared student discounts for the rest of this month.`,
        });
      }
    }

    // Recommendation 4: Education investment
    if (education && education.amount > 0) {
      list.push({
        id: 'rec-edu',
        icon: '📚',
        type: 'info',
        title: `Academic investments tracked`,
        description: `₹${education.amount.toLocaleString('en-IN')} spent on textbooks & project components this semester. Keep receipts for student club reimbursements!`,
      });
    }

    return list;
  }, [categories, monthlyBudget, totalSpent]);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div>
          <CardTitle className="flex items-center gap-2">
            <span>Budget Recommendations</span>
            <Lightbulb className="w-4 h-4 text-amber-500" />
          </CardTitle>
          <CardDescription>
            Smart rule-based savings tips tailored to your student spending patterns
          </CardDescription>
        </div>
      </CardHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-xs">
              {rec.icon}
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
                {rec.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {rec.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
