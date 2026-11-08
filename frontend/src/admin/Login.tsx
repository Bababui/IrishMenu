import { useState, type FormEvent } from "react";
import { Clover } from "../components/Icons";
import { ApiError, logIn } from "./api";

function Login({ onLoggedIn }: { onLoggedIn: () => void }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!password) {
      setError("Please type the password.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await logIn(password);
      onLoggedIn();
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.status === 401 ? "That password isn't right. Please try again." : apiError.message);
      setBusy(false);
    }
  }

  return (
    <main className="login">
      <form className="login-board" onSubmit={submit} noValidate>
        <Clover className="login-clover" />
        <h1 className="login-sign">Irish Pub</h1>
        <p className="login-place">Heilbronn · Admin</p>

        <div className="field">
          <label htmlFor="password" className="field-label">
            Password
          </label>
          <input
            id="password"
            className="input"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            autoFocus
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "password-error" : undefined}
          />
          <label className="checkbox">
            <input type="checkbox" checked={showPassword} onChange={(event) => setShowPassword(event.target.checked)} />
            Show password
          </label>
          {error && (
            <p id="password-error" className="field-error" role="alert">
              {error}
            </p>
          )}
        </div>

        <button type="submit" className="button button-primary button-wide" disabled={busy}>
          {busy ? "Logging in…" : "Log in"}
        </button>
      </form>
    </main>
  );
}

export default Login;
