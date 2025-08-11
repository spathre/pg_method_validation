import React, { useState } from 'react';
import client from '../api/client';
import Card from '../components/Card';

export default function AccuracyForm() {
  const [metadata, setMetadata] = useState({
    product_name: '',
    label_claim: '',
    analyst: '',
    date_of_analysis: '',
    stp_no: '',
    tis_no: ''
  });
  const [rows, setRows] = useState([{ amount_added: '', amount_found: '' }]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const onMeta = (e) => setMetadata(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const onRow = (i, field, val) => {
    const next = [...rows];
    next[i][field] = val;
    setRows(next);
  };
  const addRow = () => setRows(prev => [...prev, { amount_added: '', amount_found: '' }]);
  const removeRow = (i) => setRows(prev => prev.filter((_, idx) => idx !== i));

  const submit = async (e) => {
    e.preventDefault();
    const amount_added = rows.map(r => parseFloat(r.amount_added));
    const amount_found = rows.map(r => parseFloat(r.amount_found));
    if (amount_added.some(isNaN) || amount_found.some(isNaN)) {
      alert('Please fill all amounts as numbers.');
      return;
    }
    setLoading(true);
    try {
      const { data } = await client.post('/accuracy/', { ...metadata, amount_added, amount_found });
      setResult(data);
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <Card title="Accuracy — Inputs">
        <form onSubmit={submit} className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-1">Product Name</label>
              <input name="product_name" value={metadata.product_name} onChange={onMeta}
                     className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500" required />
            </div>
            <div>
              <label className="block text-sm mb-1">Label Claim</label>
              <input name="label_claim" value={metadata.label_claim} onChange={onMeta}
                     className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500" />
            </div>
            <div>
              <label className="block text-sm mb-1">Analyst</label>
              <input name="analyst" value={metadata.analyst} onChange={onMeta}
                     className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500" />
            </div>
            <div>
              <label className="block text-sm mb-1">Date of Analysis</label>
              <input type="date" name="date_of_analysis" value={metadata.date_of_analysis} onChange={onMeta}
                     className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500" />
            </div>
            <div>
              <label className="block text-sm mb-1">STP No</label>
              <input name="stp_no" value={metadata.stp_no} onChange={onMeta}
                     className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500" />
            </div>
            <div>
              <label className="block text-sm mb-1">TIS No</label>
              <input name="tis_no" value={metadata.tis_no} onChange={onMeta}
                     className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Observations (Amount Added vs Found)</h4>
              <button type="button" onClick={addRow}
                      className="px-3 py-1.5 rounded-lg border bg-white hover:bg-slate-50">
                + Add Row
              </button>
            </div>

            {rows.map((r, i) => (
              <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-3">
                <input type="number" step="any" placeholder="Amount Added" value={r.amount_added}
                       onChange={(e) => onRow(i, 'amount_added', e.target.value)}
                       className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500" required />
                <input type="number" step="any" placeholder="Amount Found" value={r.amount_found}
                       onChange={(e) => onRow(i, 'amount_found', e.target.value)}
                       className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500" required />
                {rows.length > 1 && (
                  <button type="button" onClick={() => removeRow(i)}
                          className="px-3 py-2 border rounded-lg hover:bg-slate-50">–</button>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button type="submit"
                    className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-60"
                    disabled={loading}>
              {loading ? 'Calculating…' : 'Calculate'}
            </button>
            <button type="button" onClick={() => { setRows([{ amount_added: '', amount_found: '' }]); setResult(null); }}
                    className="px-4 py-2 rounded-lg border bg-white hover:bg-slate-50">
              Reset
            </button>
          </div>
        </form>
      </Card>

      {result && (
        <Card title="Results">
          <div className="space-y-1">
            <div><span className="text-slate-500">Mean % Recovery:</span> <span className="font-medium">{result.mean_recovery}%</span></div>
            <div><span className="text-slate-500">Standard Deviation:</span> <span className="font-medium">{result.standard_deviation}</span></div>
            <div><span className="text-slate-500">%RSD:</span> <span className="font-medium">{result.percent_rsd}</span></div>
            <div className="mt-2">
              <span className="px-2 py-1 rounded-md text-sm bg-emerald-50 text-emerald-700 border border-emerald-200">
                {result.validation}
              </span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
