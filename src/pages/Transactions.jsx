import React from 'react';
import { Link } from 'react-router-dom';
import { Receipt, ArrowLeft, Users } from 'lucide-react';
import { Card } from '../components/ui/Card';

export function Transactions() {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Transactions
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Complete log of student income and expenditure.
          </p>
        </div>

        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <Card className="text-center py-16 px-6 border-dashed border-2 border-indigo-200 bg-indigo-50/20">
        <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-4">
          <Receipt className="w-7 h-7" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold mb-3">
          <Users className="w-3.5 h-3.5" />
          <span>Teammate Module Space</span>
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          Transactions Workspace Reserved
        </h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
          This page is designated for your teammate's implementation of the full transaction history, search filters, and export tools.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm"
        >
          Return to Dashboard
        </Link>
      </Card>
    </div>
  );
}
