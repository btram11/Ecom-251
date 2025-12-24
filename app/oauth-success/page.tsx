'use client';

import { useEffect, useState } from 'react';
import { environment } from '../../environment';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

export default function OAuthSuccessPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    fetch(`${environment.SERVICE_URL}/api/auth/me/token`, {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Not logged in');
        return res.json();
      })
      .then(({ accessToken }) => {
        if (!accessToken) throw new Error('No token');
        localStorage.setItem('accessToken', accessToken);
        setStatus('success');

        setTimeout(() => {
          window.location.href = '/';
        }, 1200);
      })
      .catch(() => {
        setStatus('error');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
      <div className="w-full max-w-md rounded-xl bg-white shadow-lg p-8 text-center space-y-4">
        {status === 'loading' && (
          <>
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-green-600" />
            <h2 className="text-lg font-semibold">Đang đăng nhập...</h2>
            <p className="text-sm text-muted-foreground">Vui lòng chờ trong giây lát</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle2 className="mx-auto h-10 w-10 text-green-600" />
            <h2 className="text-lg font-semibold">Đăng nhập thành công</h2>
            <p className="text-sm text-muted-foreground">Đang chuyển hướng về trang chủ</p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="mx-auto h-10 w-10 text-red-500" />
            <h2 className="text-lg font-semibold text-red-600">Đăng nhập thất bại</h2>
            <p className="text-sm text-muted-foreground">Đang chuyển về trang đăng nhập</p>
          </>
        )}
      </div>
    </div>
  );
}
