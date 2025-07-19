import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center text-red-600">
          <h1>Oops! Something went wrong.</h1>
          <p>Please refresh or try again later.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
