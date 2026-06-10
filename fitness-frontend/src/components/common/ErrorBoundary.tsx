"use client";

import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Replace with Sentry or equivalent when configured.
    console.error("Uncaught UI error", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
  };

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="alert alert-error my-6">
            <div>
              <h2 className="font-semibold">Something went wrong.</h2>
              <button className="btn btn-sm btn-outline mt-2" onClick={this.handleRetry}>
                Retry
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
