
'use client';

import React, { useState } from 'react';
import { Code, Zap, Loader2, AlertTriangle, CheckCircle } from 'lucide-react';

interface AuditResult {
  vulnerabilities: { type: string; description: string; severity: 'High' | 'Medium' | 'Low'; }[];
  suggestions: string[];
  summary: string;
}

const AuditPage: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [auditResults, setAuditResults] = useState<AuditResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAudit = async () => {
    setError(null);
    setAuditResults(null);

    if (!code.trim()) {
      setError('Please paste your source code to audit.');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call to an LLM
      const response = await fetch("/api/audit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    codeToAudit: code
                })
            });

        const result = await response.json()

        console.log({result});

      setAuditResults(result.result);

    } catch (err) {
      setError('Failed to audit code. Please try again later.');
      console.error('Audit error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-primary/5 text-primary mb-6 border border-primary/10">
            AI Code Auditor
          </div>
          <h1 className="text-4xl font-black text-gray-900 sm:text-5xl mb-4 leading-tight">
            Audit Your <span className="text-primary">Smart Contracts</span>
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            Paste your Web3 source code below to get instant AI-powered vulnerability analysis and fix suggestions.
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <label htmlFor="code-input" className="block text-lg font-semibold text-gray-700 mb-3">
              Paste your source code here
            </label>
            <textarea
              id="code-input"
              rows={15}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={`Paste your Solidity, Rust, or other Web3 code here...\n pragma solidity ^0.8.0;\n\ncontract MyContract {\n    uint public value;\n\n    function setValue(uint _value) public {\n        value = _value;\n    }\n}`}
              className="font-mono text-sm block w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-primary focus:border-primary bg-gray-900 text-gray-50 resize-y"
              style={{ tabSize: 2 }}
            ></textarea>
          </div>

          {error && (
            <div className="p-4 text-red-700 bg-red-100 border border-red-200 rounded-xl text-center flex items-center justify-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={handleAudit}
            disabled={isLoading}
            className={`w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-xl shadow-sm text-xl font-bold text-white ${isLoading ? 'bg-primary-dark cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transition-all duration-300 active:scale-95`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Auditing Code...
              </>
            ) : (
              <>
                <Zap className="-ml-1 mr-3 h-5 w-5" />
                Run AI Audit
              </>
            )}
          </button>
        </div>

        {auditResults && (
          <div className="mt-16 pt-16 border-t border-gray-100 space-y-12">
            <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-primary" />
              Audit Results
            </h2>
            
            <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Summary</h3>
              <p className="text-lg text-gray-700 leading-relaxed">{auditResults.summary}</p>
            </div>

            {auditResults.vulnerabilities.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Identified Vulnerabilities</h3>
                <div className="space-y-6">
                  {auditResults.vulnerabilities.map((vuln, index) => (
                    <div key={index} className="bg-white border border-red-100 rounded-2xl p-6 shadow-md">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-bold text-red-700">{vuln.type}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          vuln.severity === 'High' ? 'bg-red-500 text-white' :
                          vuln.severity === 'Medium' ? 'bg-yellow-500 text-white' :
                          'bg-blue-500 text-white'
                        }`}>
                          {vuln.severity}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{vuln.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {auditResults.suggestions.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Suggested Fixes & Improvements</h3>
                <ul className="list-disc list-inside space-y-3 text-lg text-gray-700 pl-5">
                  {auditResults.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditPage;
