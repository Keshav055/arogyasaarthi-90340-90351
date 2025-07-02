import { render, screen } from "@testing-library/react";
import DashboardPage from "../DashboardPage";
import LoginPage from "../LoginPage";
import SignupPage from "../SignupPage";
import { AuthProvider } from "../../context/AuthContext";
import { MemoryRouter } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";

describe("Page and auth render stubs", () => {
  test("DashboardPage renders greeting", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <DashboardPage />
        </MemoryRouter>
      </AuthProvider>
    );
    expect(screen.getByText(/welcome to arogya/i)).toBeInTheDocument();
  });

  test("LoginPage renders form fields", () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test("SignupPage renders form and call to action", () => {
    render(<SignupPage />);
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });

  test("ProtectedRoute redirects unauthenticated by default", () => {
    // Should show loading or login state (demo logic)
    // Render ProtectedRoute with a child
    render(
      <AuthProvider>
        <MemoryRouter>
          <ProtectedRoute>
            <div>ProtectedContent</div>
          </ProtectedRoute>
        </MemoryRouter>
      </AuthProvider>
    );
    expect(screen.queryByText("ProtectedContent")).not.toBeInTheDocument();
  });
});
