import React, { useState } from 'react';
import { useAdminAuth } from '../AdminAuthContext';
import { Sun, Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const AdminLoginPage: React.FC = () => {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    const res = await login(email, password);

    if (!res.success) {
      setErrorMsg(res.error || 'Unable to sign in with those credentials.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07241C] text-white flex items-center justify-center p-4 font-body">
      <div className="w-full max-w-md bg-white/5 rounded-card border border-white/10 shadow-2xl p-8 sm:p-10 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-gold text-brand-green flex items-center justify-center mx-auto mb-4 shadow-gold-glow">
            <Sun className="w-7 h-7 animate-spin-slow" />
          </div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full inline-block">
            INTERNAL BUSINESS PORTAL
          </span>
          <h1 className="h3 font-heading font-extrabold text-white tracking-tight">
            SAHAJA SOLAR ADMIN
          </h1>
          <p className="text-xs text-slate-300">
            Sign in to access lead management and consultation scheduling.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-950/80 text-red-300 border border-red-500/40 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-1.5">
              Email or Username
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sahajasolar@gmail.com"
                className="w-full bg-black/40 border border-white/15 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-gold"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/40 border border-white/15 rounded-xl py-2.5 pl-10 pr-10 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-gold"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="solar"
            size="lg"
            disabled={isSubmitting}
            className="w-full shadow-gold-glow mt-2"
          >
            {isSubmitting ? 'Signing In...' : 'Sign In To Admin'}
          </Button>
        </form>

        <div className="pt-4 border-t border-white/10 text-[10px] text-slate-400 text-center font-mono space-y-1">
          <p>Protected System • Authorized Staff Only</p>
          <p className="text-brand-gold">Development Auth Active: enter sahajasolar@gmail.com to test.</p>
        </div>
      </div>
    </div>
  );
};
